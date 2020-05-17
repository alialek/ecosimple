import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import Stories from '../components/Stories';

const Home = ({ id, go, fetchedState, snackbarError }) => (
  <Panel id={id}>
    <PanelHeader>Эко Просто</PanelHeader>
    {fetchedState && (
      <Stories fetchedState={fetchedState} snackbarError={snackbarError} />
    )}
  </Panel>
);

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
