import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  PanelHeader,
  Group,
  Header,
  CardScroll,
  Div,
  Card,
  Text
} from '@vkontakte/vkui';

const Substudy = ({ id, go, fetchedState, snackbarError }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Обучение</PanelHeader>
    </Panel>
  );
};


export default Substudy
