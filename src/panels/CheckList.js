import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Div,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  CellButton
} from '@vkontakte/vkui';

const CheckList = ({
  id,
  go,
  goViewBack,
  fetchedState,
  snackbarError,
  openSubPage
}) => {
  return (
    <Fragment>
      <PanelHeader left={<PanelHeaderBack onClick={() => goViewBack()} />}>
        Чек-лист
      </PanelHeader>
      <Group>
        <CellButton>Хэй</CellButton>
      </Group>
    </Fragment>
  );
};

CheckList.propTypes = {
  // id: PropTypes.string.isRequired,
  // go: PropTypes.func.isRequired,
  // openSubPage: PropTypes.func.isRequired,
};

export default CheckList;
