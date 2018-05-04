import React, { Component } from 'react';
import { Parallax } from 'react-parallax';

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
  // const image2 =
  //   'https://img00.deviantart.net/2bd0/i/2009/276/c/9/magic_forrest_wallpaper_by_goergen.jpg';
  // const image3 =
  //   'https://brightcove04pmdo-a.akamaihd.net/5104226627001/5104226627001_5297440765001_5280261645001-vs.jpg?pubId=5104226627001&videoId=5280261645001';

  return (
    <div>
      <h1> This Works!! </h1>
      <Parallax strength={500}>
        <div style={{ height: 500 }}>
          <div style={insideStyles}>HTML inside the parallax</div>
        </div>
      </Parallax>
      <h1>| | |</h1>
      <Parallax blur={{ min: -1, max: 3 }}>
        <div style={{ height: 500 }}>
          <div style={insideStyles}>Dynamic Blur</div>
        </div>
      </Parallax>
      <h1>| | |</h1>
      <Parallax strength={-100}>
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
