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
import { ReactComponent as PaperIcon } from '../../img/icons/paper.svg';
import { ReactComponent as GlassIcon } from '../../img/icons/glass.svg';
import { ReactComponent as MetalIcon } from '../../img/icons/metal.svg';
import { ReactComponent as PlasticIcon } from '../../img/icons/plastic.svg';

const Profile = ({ id, go, fetchedState, snackbarError }) => (
  <Panel id={id}>
    <PanelHeader>Обучение</PanelHeader>
    {true && (
      <Group
        header={<Header mode="secondary">Основные фракции</Header>}
        separator="hide"
      >
        <CardScroll>
          <Div>
            <Card className="icon-card icon-card--blue " mode="shadow" size="s">
              <div className="icon--centered">
                <PaperIcon />
              </div>
            </Card>
            <Text className="icon-text" weight="regular">
              Бумага
            </Text>
          </Div>
          <Div>
            <Card
              className="icon-card icon-card--orange "
              mode="shadow"
              size="s"
            >
              <div className="icon--centered">
                <PlasticIcon />
              </div>
            </Card>
            <Text className="icon-text" weight="regular">
              Пластик
            </Text>
          </Div>
          <Div>
            <Card className="icon-card icon-card--red " mode="shadow" size="s">
              <div className="icon--centered">
                <MetalIcon />
              </div>
            </Card>
            <Text className="icon-text" weight="regular">
              Металл
            </Text>
          </Div>
          <Div>
            <Card
              className="icon-card icon-card--green "
              mode="shadow"
              size="s"
            >
              <div className="icon--centered">
                <GlassIcon />
              </div>
            </Card>
            <Text className="icon-text" weight="regular">
              Стекло
            </Text>
          </Div>
        </CardScroll>
      </Group>
    )}
  </Panel>
);

Profile.propTypes = {
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

export default Profile;
