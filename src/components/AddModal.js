import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  withModalRootContext,
  Div,
  Button,
  Slider,
  FormLayout,
  Header,
  Counter
} from '@vkontakte/vkui';

import Tab from './Tab';

import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';

function throttle(callback, delay) {
  let isThrottled = false,
    args,
    context;

  function wrapper() {
    if (isThrottled) {
      args = arguments;
      context = this;
      return;
    }

    isThrottled = true;
    callback.apply(this, arguments);

    setTimeout(() => {
      isThrottled = false;
      if (args) {
        wrapper.apply(context, args);
        args = context = null;
      }
    }, delay);
  }
  return wrapper;
}

const AddModal = ({
  categories,
  openModal,
  goView,
  routes,
  go,
  snackbarError,
  activeCategory,
  onAmountChange,
  changeCategory
}) => {
  const goCheckList = (category) => {
    openModal('modal-checklist');
  };

  return (
    <Fragment>
      <Div className="category-buttons">
        {categories.map((category) => {
          return (
            <Tab
              activeTab={activeCategory}
              key={category.id}
              category={category.id}
              label={category.name}
              onClick={changeCategory}
            />
          );
        })}
      </Div>
      <Div className="tab-content">
        {categories.map((category) => {
          if (category.id !== activeCategory.id) return undefined;
          if (activeCategory.id) {
            return (
              <Fragment key={category.id}>
                <FormLayout>
                  <Slider
                    key={category.id}
                    step={0.1}
                    min={0}
                    max={10}
                    value={activeCategory.amount}
                    top={
                      <Header
                        indicator={
                          <Counter
                            size="m"
                            mode="primary"
                            style={{ minWidth: '48px' }}
                          >
                            {activeCategory.amount} кг
                          </Counter>
                        }
                      >
                        <span role="img" aria-label="Количество отходов"></span>
                        Количеcтво отходов
                      </Header>
                    }
                    onChange={(amount) => onAmountChange(amount)}
                  />
                  <Div style={{ display: 'flex' }}>
                    <Button
                      size="l"
                      stretched
                      mode="secondary"
                      style={{ marginRight: 8 }}
                      onClick={() => goView('extra')}
                    >
                      Пройти чек-лист
                    </Button>
                    <Button size="l" stretched onClick={() => {}}>
                      Добавить
                    </Button>
                  </Div>
                </FormLayout>
              </Fragment>
            );
          }
        })}
      </Div>
    </Fragment>
  );
};

AddModal.propTypes = {
  updateModalHeight: PropTypes.func,
  categories: PropTypes.array
};
export default withModalRootContext(AddModal);
