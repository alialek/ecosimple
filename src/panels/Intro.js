import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, PanelHeader, FixedLayout, Div } from '@vkontakte/vkui';

import './Intro.css';

// FOR FUTURE REASONS
// import { platform, IOS } from '@vkontakte/vkui';
// const osName = platform();

const Intro = ({
  id,
  go,
  fetchedUser,
  userHasSeenIntro,
  nextSlide,
  setIntroSlide
}) => {
  console.log(id);
  return (
    <Fragment>
      <Fragment>
        <Panel id="intro1" centered={true}>
          <PanelHeader>Panel 1</PanelHeader>
          {true && (
            <Fragment>
              <Div className="intro-image">
                {/* <img src={imgIntro1} alt="Logo" /> */}
              </Div>
              <FixedLayout vertical="bottom">
                <Button
                  mode="primary"
                  stretched
                  size="l"
                  level="2"
                  onClick={() => nextSlide()}
                >
                  Next
                </Button>
              </FixedLayout>
            </Fragment>
          )}
        </Panel>
      </Fragment>
      <Fragment>
        <Panel id="intro2" centered={true}>
          <PanelHeader>Panel 2</PanelHeader>
          {true && (
            <Fragment>
              <FixedLayout vertical="bottom">
                <Button
                  mode="commerce"
                  size="xl"
                  level="2"
                  onClick={() => nextSlide()}
                >
                  Next
                </Button>
              </FixedLayout>
            </Fragment>
          )}
        </Panel>
      </Fragment>
      <Fragment>
        <Panel id="intro3" centered={true}>
          <PanelHeader>Panel 3</PanelHeader>
          {true && (
            <Fragment>
              <FixedLayout vertical="bottom">
                <Button
                  mode="commerce"
                  size="xl"
                  level="2"
                  onClick={() => nextSlide()}
                >
                  Next
                </Button>
              </FixedLayout>
            </Fragment>
          )}
        </Panel>
      </Fragment>
    </Fragment>
  );
};

Intro.propTypes = {
  go: PropTypes.func.isRequired,
  goHome: PropTypes.func.isRequired
};

export default Intro;
