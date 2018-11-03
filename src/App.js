import React, { Component } from 'react';
import './App.css';
import styled from "styled-components";
import Player from './components/Player.js';
import tracks from "./playlist.js";
class App extends Component {
  render() {
    return (
      <FullHeight>
        <Player tracks={tracks} style={{ flex: 1 }}/>
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