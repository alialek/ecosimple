import React, { useState, useEffect, Fragment } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  View,
  ConfigProvider,
  ScreenSpinner,
  Snackbar,
  Avatar,
  Button,
  FixedLayout,
  Panel,
  PanelHeader,
  Div,
  Title
} from '@vkontakte/vkui';
import Icon24Error from '@vkontakte/icons/dist/24/error';
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';

import imgIntro1 from './img/intro1.svg';
import imgIntro2 from './img/intro2.svg';
import imgIntro3 from './img/intro3.svg';
import imgIntro4 from './img/intro4.svg';
import imgIntro5 from './img/intro5.svg';

// import RestClient from './js/services/restApi';
import axios from 'axios';

import Home from './panels/Home';

const ROUTES = {
  HOME: 'home',
  INTRO: ['intro1', 'intro2', 'intro3', 'intro4', 'intro5']
};

const STORAGE_KEYS = {
  STATUS: 'status'
};

let currentSlide = 0;

const App = () => {
  const [activePanel, setActivePanel] = useState(ROUTES.HOME);
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
  const [userHasSeenIntro, setUserHasSeenIntro] = useState(false);
  const [fetchedState, setFetchedState] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [history, setHistory] = useState([]);

  const parseQueryString = (string) => {
    return string
      .slice(1)
      .split('&')
      .map((queryParam) => {
        let kvp = queryParam.split('=');
        return { key: kvp[0], value: kvp[1] };
      })
      .reduce((query, kvp) => {
        query[kvp.key] = kvp.value;
        return query;
      }, {});
  };

  const queryParams = parseQueryString(window.location.search);
  const hashParams = parseQueryString(window.location.hash);
  // const [rest, setRest] = useState(new RestClient());

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme');
        schemeAttribute.value = data.scheme ? 'client_light' : 'client_light';
        document.body.attributes.setNamedItem(schemeAttribute);
      }
    });
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      // await axios
      //   .post('https://c21282b6.ngrok.io/eco/api/vk/auth', queryParams)
      //   .then((resp) => {
      //     console.log(resp);
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
      const storageData = await bridge.send('VKWebAppStorageGet', {
        keys: Object.values(STORAGE_KEYS)
      });
      if (Array.isArray(storageData.keys)) {
        const data = {};
        storageData.keys.forEach(({ key, value }) => {
          try {
            data[key] = value ? JSON.parse(value) : {};
            switch (key) {
              case STORAGE_KEYS.STATUS:
                if (data[key] && data[key].hasSeenIntro) {
                  console.log(currentSlide);
                  setActivePanel(ROUTES.HOME);
                  setUserHasSeenIntro(true);
                }
                break;
              default:
                break;
            }
          } catch (error) {
            setSnackbar(
              <Snackbar
                layout="vertical"
                onClose={() => setSnackbar(null)}
                before={
                  <Avatar
                    size={24}
                    style={{ backgroundColor: 'var(--dynamic-red)' }}
                  >
                    <Icon24Error fill="#fff" width="14" height="14" />
                  </Avatar>
                }
                duration={900}
              >
                Проблема с получением данных из Storage
              </Snackbar>
            );
            console.error(error);
          }
        });
      }
      setUserHasSeenIntro(true);
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  const nextSlide = () => {
    currentSlide += 1;
    go(ROUTES.INTRO[currentSlide]);
  };

  const goBack = () => {
    const hist = [...history];
    hist.pop();
    const currentPanel = hist[hist.length - 1];
    if (currentPanel === ROUTES.HOME) {
      bridge.send('VKWebAppDisableSwipeBack');
    }
    setActivePanel(currentPanel);
    setHistory(() => [...history, currentPanel]);
  };

  const go = (newPanel) => {
    const hist = [...history];
    hist.push(newPanel);
    if (activePanel === ROUTES.HOME) {
      bridge.send('VKWebAppEnableSwipeBack');
    }
    setActivePanel(newPanel);
    setHistory(() => [...history, newPanel]);
  };

  const viewIntro = async function () {
    try {
      await bridge.send('VKWebAppStorageSet', {
        key: STORAGE_KEYS.STATUS,
        value: JSON.stringify({
          hasSeenIntro: true
        })
      });
      go(ROUTES.HOME);
    } catch (error) {
      setSnackbar(
        <Snackbar
          layout="vertical"
          onClose={() => setSnackbar(null)}
          before={
            <Avatar size={24} style={{ backgroundColor: 'var(--dynamic-red)' }}>
              <Icon24Error fill="#fff" width="14" height="14" />
            </Avatar>
          }
          duration={900}
        >
          Проблема с отправкой данных в Storage
        </Snackbar>
      );
    }
  };

  return (
    <ConfigProvider isWebView={true}>
      <View
        activePanel={activePanel}
        history={history}
        popout={popout}
        onSwipeBack={goBack}
      >
        <Home
          id={ROUTES.HOME}
          fetchedUser={fetchedUser}
          fetchedState={fetchedState}
          go={go}
          snackbarError={snackbar}
        />

        {/* ВСТУПИТЕЛЬНЫЕ СЛАЙДЫ  */}

        <Panel id="intro1" centered={true} className="panel">
          {fetchedUser && !userHasSeenIntro && (
            <Fragment>
              <Div className="intro">
                <Title className="intro-text" level="2" weight="heavy">
                  Привет, я Эко Просто
                </Title>
                <Div className="intro-image">
                  <img src={imgIntro1} alt="Вступительный слайд 1" />
                </Div>
              </Div>

              <FixedLayout vertical="bottom">
                <Button
                  className="intro-button"
                  mode="primary"
                  stretched
                  size="l"
                  onClick={() => nextSlide()}
                >
                  Привет, расскажи о себе
                </Button>
              </FixedLayout>
            </Fragment>
          )}
        </Panel>
        <Panel id="intro2" centered={true}>
          {fetchedUser && !userHasSeenIntro && (
            <Fragment>
              <Div className="intro-image">
                <img src={imgIntro2} alt="Вступительный слайд 2" />
              </Div>
              <Title className="intro-text" level="2" weight="bold">
                Эко просто - ваш проводник в экологичную жизнь.
              </Title>
              <FixedLayout vertical="bottom">
                <Button
                  className="intro-button"
                  mode="primary"
                  stretched
                  size="l"
                  onClick={() => nextSlide()}
                >
                  Что ты умеешь?
                </Button>
              </FixedLayout>
            </Fragment>
          )}
        </Panel>
        <Panel id="intro3" centered={true}>
          {fetchedUser && !userHasSeenIntro && (
            <Fragment>
              <Div className="intro-image">
                <img src={imgIntro3} alt="Вступительный слайд 3" />
              </Div>
              <Title className="intro-text" level="2" weight="bold">
                Научу с чего начать раздельный сбор отходов и как сделать это
                просто.
              </Title>
              <FixedLayout vertical="bottom">
                <Button
                  mode="primary"
                  size="l"
                  stretched
                  onClick={() => nextSlide()}
                >
                  Что еще?
                </Button>
              </FixedLayout>
            </Fragment>
          )}
        </Panel>
        <Panel id="intro4" centered={true}>
          {fetchedUser && !userHasSeenIntro && (
            <Fragment>
              <Div className="intro-image">
                <img src={imgIntro4} alt="Вступительный слайд 4" />
              </Div>
              <Title className="intro-text" level="2" weight="bold">
                Посчитаю сданный Вами мусор и наглядно покажу Ваш вклад в
                спасение природы.
              </Title>
              <FixedLayout vertical="bottom">
                <Button
                  mode="primary"
                  size="l"
                  stretched
                  onClick={() => nextSlide()}
                >
                  Звучит интересно
                </Button>
              </FixedLayout>
            </Fragment>
          )}
        </Panel>
        <Panel id="intro5" centered={true}>
          {fetchedUser && !userHasSeenIntro && (
            <Fragment>
              <Div className="intro-image">
                <img src={imgIntro5} alt="Вступительный слайд 5" />
              </Div>
              <Title className="intro-text" level="2" weight="bold">
                Жить экологично - просто. Вы готовы начать?
              </Title>
              <FixedLayout vertical="bottom">
                <Button
                  mode="primary"
                  size="l"
                  stretched
                  onClick={() => viewIntro()}
                >
                  Я готов начать!
                </Button>
              </FixedLayout>
            </Fragment>
          )}
        </Panel>
      </View>
    </ConfigProvider>
  );
};

export default App;
