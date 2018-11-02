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

import { Container, Row, Col } from "react-grid-system";
import classNames from "classnames";
import styled from "styled-components";
import "./MediaPlayer.css";
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

	render() {
		return (
			<Container fluid>
				{/* Main row */}
				<Row style={{ backgroundColor: "#444444" }}>
					{/* Artist Info */}
					<Col sm={12} md={3} style={{ padding: 10 }}>
						<Row>
							<Col className="h-center" sm={12} md={6}>
								<ArtWork
									src={this.props.track.artworkUrl}
									alt="artwork"
								/>
							</Col>
							<Col
								className="h-center"
								style={{ alignItems: "center" }}
								sm={12}
								md={6}
							>
								<InfoText>
									{this.props.track.artistName}
								</InfoText>
							</Col>
						</Row>
					</Col>
					{/* Controls */}
					<Col>
						{/* Buttons */}
						<div className="h-center">
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
						{/* Seeker */}
						<div
							className="h-center"
							style={{
								flexGrow: 1,
								padding: 20
							}}
						>
							<Col
								className="h-center"
								style={{
									padding: 5
								}}
							>
								<Seeker
									onChange={this.seekHandler}
									time={this.state.played * 100}
								/>
							</Col>
						</div>
					</Col>

					<Col
						className="hv-center"
						sm={12}
						md={3}
					>
						<InfoText>
							{formatSeconds(this.state.playedSeconds)}
						</InfoText>
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
	width: 100%;
	height: 100%;
`;

const InfoText = styled.span`
	padding: 20px;
	color: #dddddd;
`;
