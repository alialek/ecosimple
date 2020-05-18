import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon56InfoOutline from '@vkontakte/icons/dist/56/info_outline';
import { ReactComponent as PaperIcon } from '../../img/icons/paper.svg';
import {
  Panel,
  PanelHeader,
  Group,
  Headline,
  Placeholder,
  RichCell,
  Header,
  Card,
  Text,
  Div,
  Title
} from '@vkontakte/vkui';
import './Profile.css';
import axios from 'axios';

const Profile = ({ id, go, fetchedState, snackbarError }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getUserStats();
  }, []);

  const getUserStats = (res) => {
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
      'token'
    );
    axios.get(`https://app.netquest.ru/eco/api/waste`).then((res) => {
      if (res.status == 200) {
        setStats(res.data);
      }
    });
  };
  console.log(stats);

  return (
    <Panel id={id}>
      <PanelHeader>Эко Просто</PanelHeader>
      {stats && (
        <div>
          {' '}
          <div className="profile-grid">
            <Div>
              <Card
                className="icon-card icon-card--big icon-card--blue "
                mode="shadow"
                size="s"
              >
                <div className="icon--centered-column">
                  <div>
                    <Title level="1" weight="semibold">
                      {stats.waste.paper}
                      <span className="Headline Headline--ios Headline--w-black">
                        кг
                      </span>
                    </Title>
                  </div>
                  <div>
                    <Text className="icon-text" weight="regular">
                      Бумага
                    </Text>
                  </div>
                </div>
              </Card>
            </Div>
            <Div>
              <Card
                className="icon-card icon-card--big icon-card--orange "
                mode="shadow"
                size="s"
              >
                <div className="icon--centered-column">
                  <div>
                    <Title level="1" weight="semibold">
                      {stats.waste.plactics}
                      <span className="Headline Headline--ios Headline--w-black">
                        кг
                      </span>
                    </Title>
                  </div>
                  <div>
                    <Text className="icon-text" weight="regular">
                      Пластик
                    </Text>
                  </div>
                </div>
              </Card>
            </Div>
          </div>
          <div className="profile-grid">
            <Div>
              <Card
                className="icon-card icon-card--big icon-card--red "
                mode="shadow"
                size="s"
              >
                <div className="icon--centered-column">
                  <div>
                    <Title level="1" weight="semibold">
                      {stats.waste.metal}
                      <span className="Headline Headline--ios Headline--w-black">
                        кг
                      </span>
                    </Title>
                  </div>
                  <div>
                    <Text className="icon-text" weight="regular">
                      Металл
                    </Text>
                  </div>
                </div>
              </Card>
            </Div>
            <Div>
              <Card
                className="icon-card icon-card--big icon-card--green "
                mode="shadow"
                size="s"
              >
                <div className="icon--centered-column">
                  <div>
                    <Title level="1" weight="semibold">
                      {stats.waste.glass}
                      <span className="Headline Headline--ios Headline--w-black">
                        кг
                      </span>
                    </Title>
                  </div>
                  <div>
                    <Text className="icon-text" weight="regular">
                      Стекло
                    </Text>
                  </div>
                </div>
              </Card>
            </Div>
          </div>
          <Group
            header={<Header mode="secondary">История</Header>}
            separator="hide"
          >
            {stats.history.length === 0 && (
              <Placeholder icon={<Icon56InfoOutline />} header="Нет данных">
                Пока что в истории пусто. Начните заниматься раздельным сбором и
                сохраняйте собранные килограммы в приложении.
              </Placeholder>
            )}
            {stats.history.length > 0 && (
              stats.hisory.map(history => {
                return(
                  <RichCell
                disabled={true}
                before={
                  <Card className="icon-rich-cell icon-card--x-small icon-card--blue icon-card--clickable">
                    <div className="icon--centered">
                      <PaperIcon />
                    </div>
                  </Card>
                }
                caption="17 мая"
                after={`+${history.amount}кг`}
              >
                Макулатура
              </RichCell>
                )
              })
              
            )}
          </Group>
        </div>
      )}
    </Panel>
  );
};

Profile.propTypes = {
  id: PropTypes.string.isRequired,
  // go: PropTypes.func.isRequired,
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
