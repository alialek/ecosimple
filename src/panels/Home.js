import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  PanelHeader,
  Epic,
  Tabbar,
  TabbarItem,
  View,
  Button,
  ModalRoot,
  ModalPage,
  Div
} from '@vkontakte/vkui';
import Icon28CubeBoxOutline from '@vkontakte/icons/dist/28/cube_box_outline';
import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline';
import Icon28PlaceOutline from '@vkontakte/icons/dist/28/place_outline';
import Icon28Profile from '@vkontakte/icons/dist/28/profile';
import Icon36Add from '@vkontakte/icons/dist/36/add';
import Stories from '../components/Stories';
import AddModal from '../components/AddModal';

import './Home.css';

const PAGES = {
  STUDY: 'study',
  MAIN: 'main',
  ADD: 'add',
  GEO: 'geo',
  PROFILE: 'profile'
};

const MODALS = {
  ADD: 'modal-add'
};

const CATEGORIES = [
  {
    type: 'plastic',
    id: 1,
    name: 'Пластик'
  },
  {
    type: 'glass',
    id: 2,
    name: 'Стекло'
  },
  {
    type: 'paper',
    id: 3,
    name: 'Бумага'
  },
  {
    type: 'metal',
    id: 4,
    name: 'Металл'
  },
  {
    type: 'foodWaste',
    id: 5,
    name: 'Пищевые отходы'
  }
];

const Home = ({ id, go, fetchedUser, snackbarError }) => {
  const [activePage, setActivePage] = useState(PAGES.MAIN);
  const [activeModal, setActiveModal] = useState(null);

  const onPageChange = (e) => {
    setActivePage(e.currentTarget.dataset.story);
  };

  const openModal = () => {
    setActiveModal(MODALS.ADD);
  };
  const closeModal = () => {
    setActiveModal(null);
  };

  const modal = (
    <ModalRoot activeModal={activeModal}>
      <ModalPage id={MODALS.ADD} onClose={closeModal} dynamicContentHeight>
        <AddModal
          categories={CATEGORIES}
          closeModal={closeModal}
          snackbarError={snackbarError}
        />
      </ModalPage>
    </ModalRoot>
  );

  return (
    <Epic
      activeStory={activePage}
      tabbar={
        <Tabbar>
          <TabbarItem
            onClick={onPageChange}
            selected={activePage === PAGES.STUDY}
            data-story={PAGES.STUDY}
            text="Обучение"
          >
            <Icon28CubeBoxOutline />
          </TabbarItem>
          <TabbarItem
            onClick={onPageChange}
            selected={activePage === PAGES.MAIN}
            data-story={PAGES.MAIN}
            label="12"
            text="Статьи"
          >
            <Icon28ArticleOutline />
          </TabbarItem>
          <TabbarItem
            onClick={onPageChange}
            selected={activePage === PAGES.ADD}
            data-story={PAGES.ADD}
            text="Добавить"
          >
            <Button onClick={openModal} className="add-button">
              <Icon36Add />
            </Button>
          </TabbarItem>
          <TabbarItem
            onClick={onPageChange}
            selected={activePage === PAGES.GEO}
            data-story={PAGES.GEO}
            text="Ближайшие пункты"
          >
            <Icon28PlaceOutline />
          </TabbarItem>
          <TabbarItem
            onClick={onPageChange}
            selected={activePage === PAGES.PROFILE}
            data-story={PAGES.PROFILE}
            text="Ещё"
          >
            <Icon28Profile />
          </TabbarItem>
        </Tabbar>
      }
    >
      <View id={PAGES.STUDY} activePanel={PAGES.STUDY}>
        <Panel id={PAGES.STUDY}>
          <PanelHeader>Обучение</PanelHeader>
        </Panel>
      </View>
      <View id={PAGES.MAIN} activePanel={PAGES.MAIN}>
        <Panel id={PAGES.MAIN}>
          <PanelHeader>Статьи</PanelHeader>
        </Panel>
      </View>
      <View id={PAGES.ADD} activePanel={PAGES.ADD} modal={modal}>
        <Panel id={PAGES.ADD}>
          <PanelHeader>Добавить</PanelHeader>
        </Panel>
      </View>
      <View id={PAGES.GEO} activePanel={PAGES.GEO}>
        <Panel id={PAGES.GEO}>
          <PanelHeader>Ближайшие пункты</PanelHeader>
        </Panel>
      </View>
      <View id={PAGES.PROFILE} activePanel={PAGES.PROFILE}>
        <Panel id={PAGES.PROFILE}>
          <PanelHeader>Профиль</PanelHeader>
        </Panel>
      </View>
    </Epic>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string
    })
  })
};

export default Home;
