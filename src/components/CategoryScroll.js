import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardScroll, Div, Group, Text } from '@vkontakte/vkui';

import { ReactComponent as PaperIcon } from '../img/icons/paper.svg';
import { ReactComponent as GlassIcon } from '../img/icons/glass.svg';
import { ReactComponent as MetalIcon } from '../img/icons/metal.svg';
import { ReactComponent as PlasticIcon } from '../img/icons/plastic.svg';

const CategoryScroll = ({ categories }) => {
  return (
    <Group>
      {categories.length && (
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
      )}
    </Group>
  );
};

CategoryScroll.propTypes = {
  updateModalHeight: PropTypes.func,
  categories: PropTypes.array
};
export default CategoryScroll;
