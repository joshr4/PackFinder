import React, { Component } from 'react';
import { Parallax, Background } from 'react-parallax';
import { Button, Imag, Transition } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fadeInLeftBig } from 'react-animations';

const transitions = [
  'browse',
  'browse right',
  'drop',
  'fade',
  'fade up',
  'fade down',
  'fade left',
  'fade right',
  'fly up',
  'fly down',
  'fly left',
  'fly right',
  'horizontal flip',
  'vertical flip',
  'scale',
  'slide up',
  'slide down',
  'slide left',
  'slide right',
  'swing up',
  'swing down',
  'swing left',
  'swing right',
];

export class Splash extends Component {
  state = { animation: transitions[0], duration: 1000, visible: false };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleVisibility = () => this.setState({ visible: !this.state.visible });

  componentDidMount = () => {
    this.handleVisibility();
  };

  render() {
    const image1 =
      'https://images.unsplash.com/photo-1518056914555-de1d7f0b3967?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fd08518a1704538915b51bfad7463f95&auto=format&fit=crop&w=1350&q=80';
    const image2 =
      'https://images.unsplash.com/photo-1490531075051-6cb1e733191f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3fef03d5066caf9f6877a063122bee66&auto=format&fit=crop&w=1032&q=80';
    const image3 =
      'https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d812e1079e635c6fb59ded315f72316f&auto=format&fit=crop&w=1268&q=80';

    const styles = {
      fontFamily: 'sans-serif',
      textAlign: 'center',
      fontSize: '40px',
      textShadow:
        '1px 1px 1px rgba(0,0,0,0.5), -1px 1px 1px rgba(0,0,0,0.5), -1px -1px 1px rgba(0,0,0,0.5), 1px -1px 1px rgba(0,0,0,0.5), rgba(0, 0, 0, 0.2) 2px 5px 6px'
    };
    const insideStyles = {
      padding: 20,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      fontSize: '20px',
    };
    const { animation, duration, visible } = this.state;
    return (
      <div style={{ paddingTop: '0vh' }} className="splash">
        <Parallax strength={500}>
          <div className="splash-bg-1">
            <div className="splash-block-1">
              <Transition.Group animation="drop" duration={duration}>
                {visible && <h1 style={styles}>Build your pack!</h1>}
              </Transition.Group>
            </div>
            <NavLink to="/parkList">
              <Button inverted color="teal" style={insideStyles}>
                Get Started
              </Button>
            </NavLink>
          </div>
        </Parallax>
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
  }
}

export default Splash;
