import React from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import { tracks } from "./playlist.js";
import classNames from "classnames";
import styled from "styled-components";
import Seeker from "./Seeker.js";
import { Container, Row, Col } from "react-grid-system";
import { formatSeconds } from './Helpers.js';
/*
The goal is to create an audio player, similar to what you'd find at the bottom of the Spotify app.
All our media files are accessible via URLs, as you can see below in `this.tracks`. We're using a
library called react-player (https://www.npmjs.com/package/react-player) for the actual streaming
logic. Our MediaPlayer component encapsulates a ReactPlayer component.

The Player component should implement the following functionality (in order of priority):
1. It should have a play/pause button. Clicking on the button should play/pause the song
   accordingly.
2. It should display the track name, artist name, and artwork for the given track.
3. It should have next/previous buttons for navigating to the next/previous track in `this.tracks`.
4. Style it! The player should always appear at the bottom of the page, and should take up the full
   width of the screen.
5. A seeker for the song. It should graphically show the amount of the song that has been played
   relative to the total length of the song. When you click within the seeker, it should skip
   to a point in the song based on where you click. Look into progressInterval and onProgress in the
   ReactPlayer library (among others).

Notes:
- Assume for now that we will always have a harcoded playlist in `this.tracks`.
- Feel free to add additional libraries if necessary.
- Prioritize a clean implementation.
- Launch localhost:3000 in the browser to view the result.
*/

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { trackIndex: 0 };
    this.tracks = tracks;
    this.prevHandler = this.prevHandler.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
  }

  prevHandler() {
    this.setState(prevState => {
      return { trackIndex: Math.max(prevState.trackIndex - 1, 0) };
    });
  }

  nextHandler() {
    this.setState(prevState => {
      return {
        trackIndex: Math.min(prevState.trackIndex + 1, this.tracks.length - 1)
      };
    });
  }

  render() {
    return (
      <MediaPlayer
        track={this.tracks[this.state.trackIndex]}
        onPrev={this.prevHandler}
        onNext={this.nextHandler}
        canPrev={this.state.trackIndex > 0}
        canNext={this.state.trackIndex < this.tracks.length - 1}
      />
    );
  }
}

class MediaPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { playing: false, playedSeconds: 0, played: 0 };

    this.togglePlay = this.togglePlay.bind(this);
    this.btnClass = { true: "fa-play", false: "fa-pause" };
    this.progressHandler = this.progressHandler.bind(this);
    this.ref = this.ref.bind(this);
    this.seekHandler = this.seekHandler.bind(this);
  }

  togglePlay() {
    this.setState(prevState => {
      return { playing: !prevState.playing };
    });
  }

  progressHandler(e) {
    this.setState(prevState => {
      return { playedSeconds: Math.round(e.playedSeconds), played: e.played };
    }); 
  }

  ref(player) {
    this.player = player;
  }

  seekHandler(value) {
    this.player.seekTo(value);
    console.log(value);
  }

  render() {
    return (
      <Container>
        {/* Main row */}
        <Row style={{ backgroundColor: "#444444" }}>
          {/* Artist Info */}
          <Col sm={12} md={3} style={{ backgroundColor: "#444444", padding: 10 }}>
            <Row>
              <Col
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center"
                }}
                sm={12}
                md={6}
              >
                <ArtWork src={this.props.track.artworkUrl} alt="artwork" />
              </Col>
              <Col
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: 'center'
                }}
                sm={12}
                md={6}
              >              
                <ArtistName>
                {this.props.track.artistName}
                </ArtistName>
              </Col>
            </Row>
          </Col>
          {/* Controls */}
          <Col>
            {/* Buttons */}
            <Row
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <Button
                disabled={!this.props.canPrev}
                className="fas fa-fast-backward"
                onClick={this.props.onPrev}
              />
              <Button
                onClick={this.togglePlay}
                className={classNames("fas", "zoom", {
                  "fa-pause": this.state.playing,
                  "fa-play": !this.state.playing
                })}
              />
              <Button
                disabled={!this.props.canNext}
                className="fas fa-fast-forward"
                onClick={this.props.onNext}
              />
            </Row>
            {/* Seeker */}
            <Row
              style={{
                flexGrow: 1,
                display: "flex",
                padding: 20,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "space-between"
              }}
            >
              <Col
                style={{
                  display: "flex",
                  padding: 5,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Seeker onChange={this.seekHandler} time={this.state.played*100}/>
              </Col>
            </Row>
          </Col>

          <Col sm={12} md={3} style={{
                  display: "flex",
                  padding: 5,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  color: '#dddddd'
                }}>
                {formatSeconds(this.state.playedSeconds)}
          </Col>
        </Row>
        {/* Invisible player component */}
        <ReactPlayer
          ref={this.ref}
          playing={this.state.playing}
          url={this.props.track.mediaUrl}
          height={0}
          width={0}
          config={{ file: { forceAudio: true } }}
          progressInterval={1000}
          onProgress={this.progressHandler}          
        />
      </Container>
    );
  }
}

MediaPlayer.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    mediaUrl: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    durationMilliseconds: PropTypes.number.isRequired,
    artworkUrl: PropTypes.string
  }),
  canNext: PropTypes.bool.isRequired,
  canPrev: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired
};

function Button(props) {
  const Span = styled.span`
    padding: 20px;
    font-size: x-large;
  `;
  let color = props.disabled ? "#222222" : "#888888";
  return <Span style={{ color, height: "50%" }} {...props} />;
}

const ArtWork = styled.img`
  width: 100%;
  height: 100%;
`;

const ArtistName = styled.span`
  margin: 10px;  
  color: #dddddd;
`;

export default Player;
