import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, Div, Text } from '@vkontakte/vkui';

import { ReactComponent as PaperIcon } from '../img/icons/paper.svg';
import { ReactComponent as GlassIcon } from '../img/icons/glass.svg';
import { ReactComponent as MetalIcon } from '../img/icons/metal.svg';
import { ReactComponent as PlasticIcon } from '../img/icons/plastic.svg';

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  onClick = () => {
    const { category, onClick } = this.props;
    onClick(category);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label }
    } = this;

    let className = 'icon-card ';

    if (activeTab.name === label) {
      className += ' icon-card--active';
    }

    let icon;
    switch (label) {
      case 'Пластик':
        className += ' icon-card--orange';
        icon = <PlasticIcon />;
        break;
      case 'Стекло':
        className += ' icon-card--green';
        icon = <GlassIcon />;
        break;
      case 'Бумага':
        className += ' icon-card--blue';
        icon = <PaperIcon />;
        break;

      case 'Металл':
        className += ' icon-card--red';
        icon = <MetalIcon />;
        break;
      default:
        break;
    }

    return (
      <Div>
        <Card mode="shadow" className={className} onClick={onClick}>
          <div className="icon--centered">{icon}</div>
        </Card>
        <Text className="icon-text" weight="regular">
          {label}
        </Text>
      </Div>
    );
  }
}

export default Tab;
