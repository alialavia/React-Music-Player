/*
This component handles all operations related to a single song: 
Play and Pause, Seeker and time opereations, and displaying artwork and song 
title.
Tasks not related to a song: e.g. Next and Prev should be handled elsewhere 
(e.g. the Player component). In this case, the component simply dispatches an 
event handler.
*/
import React from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";

import { Container, Row, Col, Hidden } from "react-grid-system";
import classNames from "classnames";
import styled from "styled-components";
import "./Layout.css";
import Seeker from "./Seeker.js";

import { formatSeconds } from "./Helpers.js";

export default class MediaPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { playing: false, playedSeconds: 0, played: 0 };

		this.togglePlay = this.togglePlay.bind(this);
		this.btnClass = { true: "fa-play", false: "fa-pause" };
		this.progressHandler = this.progressHandler.bind(this);
		this.ref = this.ref.bind(this);
		this.seekHandler = this.seekHandler.bind(this);
		this.endedHandler = this.endedHandler.bind(this);
	}

	togglePlay() {
		this.setState(prevState => {
			return { playing: !prevState.playing };
		});
	}

	progressHandler(e) {
		this.setState(prevState => {
			return {
				playedSeconds: Math.round(e.playedSeconds),
				played: e.played
			};
		});
	}

	ref(player) {
		this.player = player;
	}

	seekHandler(value) {
		this.player.seekTo(value);
	}

	endedHandler() {
		this.setState({playing: false });
	}


	render() {
		return (
			<div
				className="v-spread"
				style={{ backgroundColor: "black", height: "100%" }}
			>
				<div
					className="v-spread"
					style={{
						textAlign: "center",
						alignItems: "stretch",
						flex: 1
					}}
				>
					<ArtWork src={this.props.track.artworkUrl} alt="artwork" />
				</div>
				<div className="v-spread" style={{padding: 10}}>
					{/* Buttons */}
					<div style={{width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
						<InfoText className="col-3">
							{formatSeconds(this.state.playedSeconds)}
						</InfoText>
						<div className={classNames("h-center", "col-6")}>
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
						<InfoText className="col-3">
							{this.props.track.artistName}
						</InfoText>
					</div>
					<div
						className="hv-center"
						style={{
							height: "50px"
						}}
					>
						<Seeker
							onChange={this.seekHandler}
							time={this.state.played * 100}
						/>
					</div>
					<ReactPlayer
						ref={this.ref}
						playing={this.state.playing}
						url={this.props.track.mediaUrl}
						height={0}
						width={0}
						config={{ file: { forceAudio: true } }}
						progressInterval={1000}
						onProgress={this.progressHandler}
						onEnded={this.endedHandler}
					/>
				</div>
			</div>
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

/* Simple components used in the Media Player */
function Button(props) {
	const Span = styled.span`
		padding: 20px;
		font-size: x-large;
	`;
	let color = props.disabled ? "#222222" : "#888888";
	return <Span style={{ color, height: "50%" }} {...props} />;
}

const ArtWork = styled.img`
	object-fit: contain;
	margin: "10px";
	flex-grow: 1;
`;

const InfoText = styled.span`
	padding: 10px;
	color: #dddddd;
	text-align: center;
`;
