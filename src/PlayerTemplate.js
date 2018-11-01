import React from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import { tracks } from "./playlist.js";
import classNames from "classnames";
import styled from "styled-components";
import Seeker from "./Seeker.js";

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
    this.togglePlay = this.togglePlay.bind(this);
    this.state = { playing: false };
    this.btnClass = { true: "fa-play", false: "fa-pause" };
  }

  togglePlay() {
    this.setState(prevState => {
      return { playing: !prevState.playing };
    });
  }

  render() {
    return (
      <BottomContainer>
        <TrackInfo style={{order:1}}>
          <ArtWork src={this.props.track.artworkUrl} alt="artwork" />
          <ArtistName>{this.props.track.artistName}</ArtistName>
        </TrackInfo>
        <TrackInfo style={{order:3}}></TrackInfo>

          <ControlContainer>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
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
            </div>
            <div style={{height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Seeker/>
            </div>
          </ControlContainer>

        <ReactPlayer
          playing={this.state.playing}
          url={this.props.track.mediaUrl}
          height={"0px"}
          width={"0px"}
          config={{ file: { forceAudio: true } }}
        />
      </BottomContainer>
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

const BottomContainer = styled.div`
  width: 100%;
  background-color: #444444;
  position: fixed;
  bottom: 0;
  padding: 10px;
  display: flex;
  flex-direction: row;
  height: 148px;
`;

const TrackInfo = styled.div`
  width: 256px;
  height: 100%;
  display: flex
`;

const ArtWork = styled.img`
  width: 128px;
  height: 128px;
`;
const ArtistName = styled.span`
  margin: 10px;
  color: #dddddd;
`;

const ControlContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  order: 2;
`;

export default Player;
