import React from "react";
import { tracks } from "./playlist.js";
import MediaPlayer from "./MediaPlayer.js";
import "./Layout.css";
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
    this.state = { trackIndex: 0, playing: true, playedSeconds: 0, played: 0 };
    this.tracks = tracks;
  }

  prevHandler = () => {
    this.setState(prevState => {
      return { trackIndex: Math.max(prevState.trackIndex - 1, 0) };
    });
  };

  nextHandler = () => {
    this.setState(prevState => {
      return {
        trackIndex: Math.min(prevState.trackIndex + 1, this.tracks.length - 1)
      };
    });
  };

  playHandler = () => {
    this.setState(prevState => {
      return { playing: !prevState.playing };
    });
  };

  progressHandler = e => {
    this.setState(prevState => {
      return {
        playedSeconds: Math.round(e.playedSeconds),
        playedPercent: e.played
      };
    });
  };

  readyHandler = player => {
    this.player = player;
  };

  seekHandler = value => {
    this.player.seekTo(value);
  };

  endedHandler = () => {
    this.setState({ playing: false });
  };

  render() {
    return (
      <MediaPlayer
        isPlaying={this.state.playing}
        playedSeconds={this.state.playedSeconds}
        playedPercent={this.state.playedPercent}
        track={this.tracks[this.state.trackIndex]}
        onPrev={this.prevHandler}
        onNext={this.nextHandler}
        onReady={this.readyHandler}
        onPlay={this.playHandler}
        onProgress={this.progressHandler}
        onEnded={this.endedHandler}
        onSeek={this.seekHandler}
        canPrev={this.state.trackIndex > 0}
        canNext={this.state.trackIndex < this.tracks.length - 1}
      />
    );
  }
}

export default Player;
