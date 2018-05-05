import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import { Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export const Splash = props => {
  const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
  };
  const insideStyles = {
    background: 'white',
    padding: 20,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  };
  // const image1 =
  //   'https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D';
  const image1 =
    'https://images.unsplash.com/photo-1518056914555-de1d7f0b3967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fd08518a1704538915b51bfad7463f95&auto=format&fit=crop&w=1350&q=80';
  const image2 =
    'https://images.unsplash.com/photo-1490531075051-6cb1e733191f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3fef03d5066caf9f6877a063122bee66&auto=format&fit=crop&w=1032&q=80';
  const image3 =
    'https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d812e1079e635c6fb59ded315f72316f&auto=format&fit=crop&w=1268&q=80';

  return (
    <div>
      <Parallax strength={500} bgImage={image1}>
        <div style={{ height: '100vw', backgroundSize: 'cover' }}>
          <Button as={NavLink} to="/profile" style={insideStyles}>
            Get Started
          </Button>
        </div>
      </Parallax>
      {/* <h1>| | |</h1> */}
      <Parallax blur={{ min: -1, max: 3 }} bgImage={image2}>
        <div style={{ height: 500 }}>
          <div style={insideStyles}>Dynamic Blur</div>
        </div>
      </Parallax>
      {/* <h1>| | |</h1> */}
      <Parallax strength={-100} bgImage={image3}>
        <div style={{ height: 500 }}>
          <div style={insideStyles}>Reverse direction</div>
        </div>
      </Parallax>
      <div style={{ height: 500 }} />
      <h2>{'\u2728'}</h2>
    </div>
  );
};

export default Splash;
