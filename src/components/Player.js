import React from "react";
import ReactPlayer from "react-player";
import { tracks } from "../playlist.js";
import MediaController from "./MediaController.js";
import "../style/Layout.css";
import "../style/Player.css";


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
          isNextEnabled={this.state.trackIndex < this.tracks.length - 1}
          isPlaying={this.state.playing}
          isPrevEnabled={this.state.trackIndex > 0}
          onNextClick={this.nextHandler}
          onPlayClick={this.playHandler}
          onPrevClick={this.prevHandler}
          onSeekClick={this.seekHandler}
          playedPercent={this.state.playedPercent}
          track={this.tracks[this.state.trackIndex]}
        />
        <ReactPlayer          
          ref={this.readyHandler}
          playing={this.state.playing}
          url={this.tracks[this.state.trackIndex].mediaUrl}
          onProgress={this.progressHandler}
          onEnded={this.endedHandler}
          volume={0.1}
          height={0}
          width={0}
          config={{ file: { forceAudio: true } }}
          progressInterval={1000}          
        />
      </React.Fragment>
    );
  }
}

export default Player;
