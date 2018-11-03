import React from "react";
import { tracks } from "../playlist.js";
import MediaController from "./MediaController.js";
import "../style/Layout.css";
import "../style/Player.css";
import ReactPlayer from "react-player";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackIndex: 0,
      playing: false,
      playedSeconds: 0,
      playedPercent: 0
    };
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
      <React.Fragment>
        <MediaController
          isPlaying={this.state.playing}
          playedPercent={this.state.playedPercent}
          track={this.tracks[this.state.trackIndex]}
          onPrevClick={this.prevHandler}
          onNextClick={this.nextHandler}
          onPlayClick={this.playHandler}
          onSeek={this.seekHandler}
          isPrevEnabled={this.state.trackIndex > 0}
          isNextEnabled={this.state.trackIndex < this.tracks.length - 1}
        />
        <ReactPlayer
          volume={0.1}
          ref={this.readyHandler}
          playing={this.state.playing}
          url={this.tracks[this.state.trackIndex].mediaUrl}
          height={0}
          width={0}
          config={{ file: { forceAudio: true } }}
          progressInterval={1000}
          onProgress={this.progressHandler}
          onEnded={this.endedHandler}
        />
      </React.Fragment>
    );
  }
}

export default Player;
