import axios from 'axios'

// https://app.netquest.ru/api
const instance = axios.create({
  baseURL: 'https://app.netquest.ru/eco/api/',
  timeout: 3000,

})

instance.defaults.timeout = 3000

instance.interceptors.request.use(config => {
  store.commit('LOADING_START')
  let token = store.getters.jwtDecoded || null
  let authorized = (token && token.exp > Date.now() / 1000)

  if (authorized) {
    config.headers.common['x-auth-token'] = store.state.token
  }

  return config
}, error => {
  store.commit('SET_ERROR')
  store.commit('LOADING_STOP')
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  store.commit('LOADING_STOP')
  
  return response
}, error => {
  store.commit('SET_ERROR', error)
  store.commit('LOADING_STOP')
  if (error.response && error.response.status && error.response.status === 401) {
    
    store.dispatch("logout")
      .then(() => router.push('/auth'))
  }
  return Promise.reject(error.response.data)
})

export default instance
