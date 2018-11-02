import React, { Component } from 'react';
import PlayerTemplate from './PlayerTemplate.js';
import './App.css';
import styled from "styled-components";

class App extends Component {
  render() {
    return (
      <FullHeight>
        <PlayerTemplate style={{flex: 1}}/>
      </FullHeight>
    );
  }
}

const FullHeight = styled.div`
  height: 100%;
  width: 100%;
  bottom: 0;
  background-color: green;
  `;
export default App;