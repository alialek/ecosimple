import React, { useState, useEffect, Fragment } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  Root,
  View,
  ConfigProvider,
  ScreenSpinner,
  Snackbar,
  Avatar,
  Button,
  FixedLayout,
  Panel,
  Div,
  Title,
  ModalRoot,
  ModalPage,
  PanelHeaderButton,
  ModalPageHeader,
  ANDROID,
  IOS,
  usePlatform
} from '@vkontakte/vkui';
import Icon24Error from '@vkontakte/icons/dist/24/error';
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';

import imgIntro1 from './img/intro1.svg';
import imgIntro2 from './img/intro2.svg';
import imgIntro3 from './img/intro3.svg';
import imgIntro4 from './img/intro4.svg';
import imgIntro5 from './img/intro5.svg';

import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';

// import RestClient from './js/services/restApi';
import axios from 'axios';

import Home from './panels/Home';
import CheckList from './panels/CheckList';
import AddModal from './components/AddModal';

const ROUTES = {
  HOME: 'home',
  INTRO: ['intro1', 'intro2', 'intro3', 'intro4', 'intro5'],
  CHECKLIST: 'checklist'
};

const STORAGE_KEYS = {
  STATUS: 'status'
};
const MODALS = {
  ADD: 'modal-add',
  CHECKLIST: 'modal-checklist'
};
const CATEGORIES = [
  {
    type: 'plastic',
    id: 1,
    name: 'Пластик',
    amount: 0,
    case: 'пластика'
  },
  {
    type: 'glass',
    id: 2,
    name: 'Стекло',
    amount: 0,
    сase: 'стекла'
  },
  {
    type: 'paper',
    id: 3,
    name: 'Бумага',
    amount: 0,
    case: 'бумаги'
  },
  {
    type: 'metal',
    id: 4,
    name: 'Металл',
    amount: 0,
    case: 'металла'
  }
];

let currentSlide = 0;

const App = () => {
  const platform = usePlatform();
  const [activePanel, setActivePanel] = useState(ROUTES.HOME);
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);
  const [userHasSeenIntro, setUserHasSeenIntro] = useState(false);
  const [fetchedState, setFetchedState] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [activeView, setActiveView] = useState('main');
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  const openModal = () => {
    setActiveModal(MODALS.ADD);
  };
  const closeModal = () => {
    setActiveModal(null);
  };

  const onAmountChange = (newAmount) => {
    if (newAmount === activeCategory.amount) return;
    console.log(activeCategory);
    setActiveCategory({ ...activeCategory, amount: newAmount });
  };

  const changeCategory = (categoryID) => {
    console.log(categoryID);
    let newCategory = CATEGORIES.find((x) => x.id === categoryID);
    setActiveCategory(newCategory);
  };

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
    let cleanupFunction = false;

    async function fetchData() {
      try {
        bridge.subscribe(({ detail: { type, data } }) => {
          if (type === 'VKWebAppUpdateConfig') {
            const schemeAttribute = document.createAttribute('scheme');
            schemeAttribute.value = data.scheme
              ? 'client_light'
              : 'client_light';
            document.body.attributes.setNamedItem(schemeAttribute);
          }
        });
        const user = await bridge.send('VKWebAppGetUserInfo');
        await axios
          .post('https://app.netquest.ru/eco/api/vk/auth', queryParams)
          .then((resp) => {
            localStorage.setItem('token', resp.data.token);
          })
          .catch((error) => {
            console.error(error);
          });
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
        if (!cleanupFunction) {
          setUserHasSeenIntro(true);
          setUser(user);
          setPopout(null);
        }
      } catch (error) {}
    }
    fetchData();
    return () => (cleanupFunction = true);
  }, []);

  const nextSlide = () => {
    currentSlide += 1;
    go(ROUTES.INTRO[currentSlide]);
  };

  // НАВИГАЦИЯ ПАНЕЛЕЙ
  const go = (newPanel) => {
    const hist = [...history];
    hist.push(newPanel);
    if (activePanel === ROUTES.HOME) {
      bridge.send('VKWebAppEnableSwipeBack');
    }
    setActivePanel(newPanel);
    setHistory(() => [...history, newPanel]);
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

  // НАВИГАЦИЯ VIEW
  const goView = (newView) => {
    const hist = [...history];
    hist.push(newView);
    setActiveView(newView);
    setHistory(() => [...history, newView]);
  };

  const goViewBack = () => {
    // const hist = [...history];
    // hist.pop();
    // const currentPanel = hist[hist.length - 1];
    // if (currentPanel === ROUTES.HOME) {
    //   bridge.send('VKWebAppDisableSwipeBack');
    // }
    setActiveView('main');
    // setHistory(() => [...history, currentPanel]);
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
  const modal = (
    <ModalRoot activeModal={activeModal}>
      <ModalPage
        id={MODALS.ADD}
        onClose={closeModal}
        header={
          <ModalPageHeader
            left={
              <Fragment>
                {platform === ANDROID && (
                  <PanelHeaderButton onClick={closeModal}>
                    <Icon24Cancel />
                  </PanelHeaderButton>
                )}
              </Fragment>
            }
            right={
              <Fragment>
                {/* {platform === ANDROID && (
              <PanelHeaderButton onClick={closeModal}>
                <Icon24Done />
              </PanelHeaderButton>
            )} */}
                {platform === IOS && (
                  <PanelHeaderButton onClick={closeModal}>
                    <Icon24Dismiss />
                  </PanelHeaderButton>
                )}
              </Fragment>
            }
          >
            Добавить {activeCategory.name}
          </ModalPageHeader>
        }
      >
        <AddModal
          categories={CATEGORIES}
          closeModal={closeModal}
          snackbarError={snackbar}
          openModal={openModal}
          go={setActivePanel}
          routes={ROUTES}
          goView={goView}
          activeCategory={activeCategory}
          onAmountChange={onAmountChange}
          changeCategory={changeCategory}
        />
      </ModalPage>
      <ModalPage
        id={MODALS.CHECKLIST}
        onClose={closeModal}
        header={
          <ModalPageHeader
            left={
              <Fragment>
                {platform === ANDROID && (
                  <PanelHeaderButton onClick={closeModal}>
                    <Icon24Cancel />
                  </PanelHeaderButton>
                )}
              </Fragment>
            }
            right={
              <Fragment>
                {/* {platform === ANDROID && (
              <PanelHeaderButton onClick={closeModal}>
                <Icon24Done />
              </PanelHeaderButton>
            )} */}
                {platform === IOS && (
                  <PanelHeaderButton onClick={closeModal}>
                    <Icon24Dismiss />
                  </PanelHeaderButton>
                )}
              </Fragment>
            }
          >
            Чек-лист
          </ModalPageHeader>
        }
      >
        Модальное окно
      </ModalPage>
    </ModalRoot>
  );

  return (
    <ConfigProvider isWebView={true}>
      <Root activeView={activeView}>
        <View
          activePanel={activePanel}
          history={history}
          popout={popout}
          onSwipeBack={goBack}
          modal={modal}
          id="main"
        >
          <Home
            id={ROUTES.HOME}
            fetchedUser={fetchedUser}
            fetchedState={fetchedState}
            go={go}
            snackbarError={snackbar}
            openModal={openModal}
            categories={CATEGORIES}
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

        <View id="extra" activePanel="checklist">
          <Panel id="checklist">
            <CheckList goViewBack={goViewBack} />
          </Panel>
        </View>
      </Root>
    </ConfigProvider>
  );
};

export default App;
