import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon56InfoOutline from '@vkontakte/icons/dist/56/info_outline';
import { ReactComponent as PaperIcon } from '../../img/icons/paper.svg';
import {
  Panel,
  PanelHeader,
  Group,
  Link,
  Headline,
  Placeholder,
  RichCell,
  Header,
  Card,
  CardGrid,
  Text,
  Div,
  Title
} from '@vkontakte/vkui';
import './Profile.css';
import axios from 'axios';

const Posts = ({ id, go, fetchedState, snackbarError }) => {
  const [posts, setPosts] = useState(null);
  const [globalStat, setGlobalStat] = useState(null);

  useEffect(() => {
    getMainScreen();
  }, []);

  const getMainScreen = (res) => {
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
      'token'
    );
    axios
      .get(`https://app.netquest.ru/eco/api/waste/main-screen`)
      .then((res) => {
        if (res.status == 200) {
          let { plastics, paper, glass, metal } = res.data.stats;
          let amount = plastics + paper + glass + metal;
          setGlobalStat(amount);
          setPosts(res.data.posts);
        }
      });
  };

  return (
    <Panel id={id}>
      <PanelHeader>Новости</PanelHeader>
      {posts && (
        <div>
          <Div>
            {posts && (
              <CardGrid>
                <Card mode="shadow" size="l" className="icon-card--green">
                  <Div className="global-stats">
                    <div className="global-stats__left">
                      <Text>Сегодня пользователи Эко Просто разделили </Text>
                    </div>
                    <div className="global-stats__right">
                      <Title level="1" weight="semibold">
                        {globalStat}
                        <span className="Headline Headline--ios Headline--w-black">
                          кг
                        </span>
                      </Title>
                    </div>
                  </Div>
                </Card>
              </CardGrid>
            )}
          </Div>
          <Group
            header={<Header mode="secondary">Статьи</Header>}
            separator="hide"
          >
            {posts.length === 0 && (
              <Placeholder icon={<Icon56InfoOutline />} header="Нет данных">
                Статей пока что нет
              </Placeholder>
            )}
            {posts.length > 0 &&
              posts.map((post, i) => {
                return (
                  <Link href={post.link} key={i} target="_blank">
                    <RichCell
                      multiline={true}
                      before={
                        <img
                          src={post.photo}
                          className="icon-rich-cell photo-card"
                        ></img>
                      }
                      caption={post.description}
                    >
                      {post.title}
                    </RichCell>
                  </Link>
                );
              })}
          </Group>
        </div>
      )}
    </Panel>
  );
};

Posts.propTypes = {
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

export default Posts;
