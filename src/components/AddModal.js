import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Group,
  Card,
  CardScroll,
  withModalRootContext,
  ANDROID,
  IOS,
  usePlatform,
  PanelHeaderButton,
  ModalPageHeader,
  Div,
  Button,
  Slider,
  FormLayout,
  Header,
  Counter
} from '@vkontakte/vkui';

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

const AddModal = ({ categories, closeModal, snackbarError }) => {
  const platform = usePlatform();
  const [amount, setAmount] = useState(2);

  const onAmountChange = throttle((newAmount) => {
    if (newAmount === amount) return;
    setAmount(newAmount);
  }, 50);

  return (
    <div className="add-modal">
      <ModalPageHeader
        left={
          <Fragment>
            {platform === ANDROID && (
              <PanelHeaderButton onClick={closeModal}>
                <Icon24Cancel />
              </PanelHeaderButton>
            )}
          </Fragment>
        }
        right={
          <Fragment>
            {/* {platform === ANDROID && (
              <PanelHeaderButton onClick={closeModal}>
                <Icon24Done />
              </PanelHeaderButton>
            )} */}
            {platform === IOS && (
              <PanelHeaderButton onClick={closeModal}>
                <Icon24Dismiss />
              </PanelHeaderButton>
            )}
          </Fragment>
        }
      >
        Добавить отход
      </ModalPageHeader>
      {categories.length && (
        <Group>
          <CardScroll>
            {categories.map((item) => (
              <Card size="s" key={item.id}>
                <div style={{ width: 144, height: 96 }}> {item.name}</div>
              </Card>
            ))}
          </CardScroll>
        </Group>
      )}
      <FormLayout>
        <Slider
          step={0.1}
          min={0}
          max={10}
          value={Number(amount)}
          top={
            <Header
              indicator={
                <Counter size="m" mode="primary">
                  {amount} кг
                </Counter>
              }
            >
              <span role="img" aria-label="Количество отходов">
                ♻️
              </span>{' '}
              Количеcтво отходов
            </Header>
          }
          onChange={(amount) => onAmountChange(amount)}
        />
      </FormLayout>

      <Div>
        <Button mode="commerce">Пройти чек-лист</Button>
      </Div>
      <Div>
        <Button mode="primary">Добавить</Button>
      </Div>
    </div>
  );
};

AddModal.propTypes = {
  updateModalHeight: PropTypes.func,
  categories: PropTypes.array
};
export default withModalRootContext(AddModal);
