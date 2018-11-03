import React, { Component } from 'react';
import Player from './components/Player.js';
import './App.css';
import styled from "styled-components";

class App extends Component {
  render() {
    return (
      <FullHeight>
        <Player style={{flex: 1}}/>
      </FullHeight>
    );
  }
}

const FullHeight = styled.div`
  height: 100%;
  width: 100%;
  bottom: 0;
  background-color: black;
  `;
export default App;