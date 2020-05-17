import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  PanelHeader,
  Placeholder,
  Button,
  RichCell,
  Card,
  Div,
  FormStatus
} from '@vkontakte/vkui';
import Stories from '../../components/Stories';
import bridge from '@vkontakte/vk-bridge';
import Icon56PlaceOutline from '@vkontakte/icons/dist/56/place_outline';
import axios from 'axios';

const Location = ({ id, go, fetchedState, snackbarError }) => {
  const [geoAvailable, setGeoAvailable] = useState(false);
  const [places, setPlaces] = useState(null);

  bridge
    .send('VKWebAppGetGeodata', {})
    .then((res) => {
      if (!res.available) {
        setGeoAvailable(false);
      } else {
        setGeoAvailable(true);
        getUserGeo(res);
      }
    })
    .catch((err) => {
      console.log(err);
      setGeoAvailable(false);
    });

  const getUserGeo = (res) => {
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem(
      'token'
    );
    axios
      .get(
        `https://app.netquest.ru/eco/api/location?lat=${res.lat}&lng=${res.long}`
      )
      .then((res) => {
        if (res.status == 200) {
          setPlaces(res.data);
        }
      });
  };
  return (
    <Panel centered={!geoAvailable ? true : false} id={id}>
      <PanelHeader>Пункты приема</PanelHeader>
      <Panel>
        {!geoAvailable && (
          <Placeholder
            icon={<Icon56PlaceOutline />}
            header="Нет доступа к местоположению"
            action={
              <Button onClick={() => getUserGeo()} size="l">
                Я передумал, дать доступ
              </Button>
            }
          >
            Вы не разрешили доступ к своему местоположению, поэтому мы не можем
            определить ближайшие пункты приема :(
          </Placeholder>
        )}
        {geoAvailable && (
          <div>
            <Div>
              <FormStatus header="Предупреждение" mode="error">
                В связи с распространением новой коронавирусной инфекции
                (COVID-19) пункты приема временно не работают!
              </FormStatus>
            </Div>
            {places &&
              places.map((place) => {
                return (
                  <Div key={place.id}>
                    <Card size="l" mode="outline">
                      <RichCell
                        text={place.content_text}
                        caption={place.address}
                      >
                        {place.title}
                      </RichCell>
                    </Card>
                  </Div>
                );
              })}
          </div>
        )}
      </Panel>
    </Panel>
  );
};

Location.propTypes = {
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

export default Location;
