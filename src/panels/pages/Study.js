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
  Text,
  Caption,
  List,
  Cell,
  RichCell,
  SimpleCell
} from '@vkontakte/vkui';
import { ReactComponent as PaperIcon } from '../../img/icons/paper.svg';
import { ReactComponent as GlassIcon } from '../../img/icons/glass.svg';
import { ReactComponent as MetalIcon } from '../../img/icons/metal.svg';
import { ReactComponent as BatteryIcon } from '../../img/icons/battery.svg';
import { ReactComponent as ClothesIcon } from '../../img/icons/clothes.svg';
import { ReactComponent as DangerousIcon } from '../../img/icons/dangerous.svg';
import { ReactComponent as LampIcon } from '../../img/icons/lamp.svg';
import { ReactComponent as TetrapakIcon } from '../../img/icons/tetrapak.svg';
import { ReactComponent as PlasticIcon } from '../../img/icons/plastic.svg';
import Icon28DoneOutline from '@vkontakte/icons/dist/28/done_outline';

import data from '../../services/data';

const Study = ({ id, go, fetchedState, snackbarError, openSubPage }) => {
  const item = data[0];

  return (
    <Panel id={id}>
      <PanelHeader>Обучение</PanelHeader>
      {true && (
        <Group
          header={<Header mode="secondary">Основные фракции</Header>}
          separator="hide"
        >
          <CardScroll>
            <Div>
              <Card
                onClick={openSubPage('paper')}
                className="icon-card icon-card--blue "
                mode="shadow"
                size="s"
              >
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
              <Card
                className="icon-card icon-card--red "
                mode="shadow"
                size="s"
              >
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
      {true && (
        <Group
          header={<Header mode="secondary">Дополнительные фракции</Header>}
          separator="hide"
        >
          <Div className="grid--custom">
            <Div>
              <Card
                className="icon-card icon-card--emerald"
                mode="shadow"
                size="s"
              >
                <div className="icon--centered">
                  <TetrapakIcon />
                </div>
              </Card>
              <Text className="icon-text" weight="regular">
                Тетрапак
              </Text>
            </Div>
            <Div>
              <Card
                className="icon-card icon-card--pink "
                mode="shadow"
                size="s"
              >
                <div className="icon--centered">
                  <ClothesIcon />
                </div>
              </Card>
              <Text className="icon-text" weight="regular">
                Одежда
              </Text>
            </Div>
            <Div>
              <Card
                className="icon-card icon-card--gold"
                mode="shadow"
                size="s"
              >
                <div className="icon--centered">
                  <BatteryIcon />
                </div>
              </Card>
              <Text className="icon-text" weight="regular">
                Батарейки
              </Text>
            </Div>
            <Div>
              <Card
                className="icon-card icon-card--violet"
                mode="shadow"
                size="s"
              >
                <div className="icon--centered">
                  <LampIcon />
                </div>
              </Card>
              <Text className="icon-text" weight="regular">
                Лампочки
              </Text>
            </Div>
            <Div>
              <Card
                className="icon-card icon-card--brown"
                mode="shadow"
                size="s"
              >
                <div className="icon--centered">
                  <DangerousIcon />
                </div>
              </Card>
              <Text className="icon-text" weight="regular">
                Опасные отходы
              </Text>
            </Div>
          </Div>
        </Group>
      )}
      {true &&
        item.sections.map((el, i) => {
          if (el.type == 'scroll') {
            return (
              <Group
                header={<Header mode="secondary">{el.title}</Header>}
                description={el.description}
                separator="hide"
                key={i}
              >
                <CardScroll>
                  {el.content.map((Waste) => {
                    return (
                      <div key={Waste.name}>
                        <Div>
                          <Card className="icon-card--small " mode="shadow">
                            <div className="icon--centered">{Waste.icon}</div>
                          </Card>
                          <Caption
                            level="1"
                            weight="regular"
                            className="icon-text"
                          >
                            {Waste.name}
                          </Caption>
                        </Div>
                      </div>
                    );
                  })}
                </CardScroll>
              </Group>
            );
          } else if (el.type === 'checklist') {
            return (
              <Group
                header={<Header mode="secondary">{el.title}</Header>}
                description={el.description}
                key={i}
                separator="hide"
              >
                <List>
                  {el.content.map((check, i) => {
                    return (
                      <SimpleCell
                        multiline
                        key={i}
                        before={
                          <Icon28DoneOutline style={{ color: '#4bb34b' }} />
                        }
                      >
                        {check.name}
                      </SimpleCell>
                    );
                  })}
                </List>
              </Group>
            );
          } else if (el.type === 'list') {
            return (
              <Group
                header={<Header mode="secondary">{el.title}</Header>}
                description={el.description}
                key={i}
                separator="hide"
              >
                <List>
                  {el.content.map((check, i) => {
                    return (
                      <Cell description={check.description} multiline key={i} before={check.icon}>
                        {check.name}
                      </Cell>
                    );
                  })}
                </List>
              </Group>
            );
          }
        })}
    </Panel>
  );
};

Study.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  openSubPage: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string
    })
  })
};

export default Study;
