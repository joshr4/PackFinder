import React, { Component } from 'react';
import { Parallax, Background } from 'react-parallax';
import { Button, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

export const Splash = props => {
  const image1 =
    'https://images.unsplash.com/photo-1518056914555-de1d7f0b3967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fd08518a1704538915b51bfad7463f95&auto=format&fit=crop&w=1350&q=80';
  const image2 =
    'https://images.unsplash.com/photo-1490531075051-6cb1e733191f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3fef03d5066caf9f6877a063122bee66&auto=format&fit=crop&w=1032&q=80';
  const image3 =
    'https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d812e1079e635c6fb59ded315f72316f&auto=format&fit=crop&w=1268&q=80';

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
  return (
    <div style={{ paddingTop: '0vh' }} className="splash">
      <Parallax strength={500}>
        <div className="splash-bg-1">
          <Button as={NavLink} to="/profile" style={insideStyles}>
            Get Started
          </Button>
        </div>
      </Parallax>
      {/* <div style={{backgroundColor: 'rgb(44, 66, 80)'}}><h1>| | |</h1></div> */}
      {/* <div style={{backgroundColor: 'rgb(44, 66, 80)'}}><h1>| | |</h1></div> */}
      <Parallax strength={-100}>
        {/* bgImage={image3} */}
        <div className="splash-bg-3">
          {/* <Image verticalAlign="top" src={image3} /> */}
          <div style={insideStyles}>More Information!</div>
        </div>
      </Parallax>
      <Parallax blur={{ min: -1, max: 3 }} bgImage={image2}>
        <div style={{ minHeight: '100vh' }}>
          <div style={insideStyles}>What we offer...</div>
        </div>
      </Parallax>
    </div>
  );
};

export default Splash;
