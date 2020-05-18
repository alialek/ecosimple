import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import data from '../services/data';

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
  FixedLayout,
  Div
} from '@vkontakte/vkui';
import Icon28CubeBoxOutline from '@vkontakte/icons/dist/28/cube_box_outline';
import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline';
import Icon28PlaceOutline from '@vkontakte/icons/dist/28/place_outline';

import Icon28Profile from '@vkontakte/icons/dist/28/profile';
import Icon36Add from '@vkontakte/icons/dist/36/add';

import useWindowDimensions from '../components/useWindowDimensions';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import Location from './pages/Location';
import Substudy from './pages/sub-study/Substudy';
import Study from './pages/Study';

import './Home.css';

const PAGES = {
  STUDY: 'study',
  MAIN: 'main',
  ADD: 'add',
  GEO: 'geo',
  PROFILE: 'profile',
  SUBSTUDY: 'substudy'
};

const Home = ({
  id,
  go,
  fetchedUser,
  snackbarError,
  openModal,
  categories
}) => {
  const [activePage, setActivePage] = useState(PAGES.MAIN);
  const [activeFraction, setActiveFraction] = useState(null);
  const { height, width } = useWindowDimensions();
  const onPageChange = (e) => {
    setActivePage(e.currentTarget.dataset.story);
  };

  return (
    <Fragment>
      <Div
        style={{
          zIndex: 10,
          position: 'fixed',
          bottom: 0,
          left: width / 2 - 25
        }}
      >
        <Button onClick={openModal} className="add-button">
          <Icon36Add />
        </Button>
      </Div>
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
            <TabbarItem></TabbarItem>
            <TabbarItem
              onClick={onPageChange}
              selected={activePage === PAGES.GEO}
              data-story={PAGES.GEO}
              text="Гео"
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
          <Study id={PAGES.STUDY} categories={categories}></Study>
        </View>

        <View id={PAGES.SUBSTUDY} activePanel={PAGES.SUBSTUDY}>
          <Substudy id={PAGES.SUBSTUDY} fraction={activeFraction}></Substudy>
        </View>

        <View id={PAGES.MAIN} activePanel={PAGES.MAIN}>
          <Panel id={PAGES.MAIN}>
            <PanelHeader>Статьи</PanelHeader>
          </Panel>
        </View>
        <View id={PAGES.GEO} activePanel={PAGES.GEO}>
          <Location id={PAGES.GEO}></Location>
        </View>
        <View id={PAGES.PROFILE} activePanel={PAGES.PROFILE}>
          <Profile id={PAGES.PROFILE}></Profile>
        </View>
      </Epic>
    </Fragment>
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
