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

import classNames from "classnames";
import styled from "styled-components";
import "./Layout.css";
import Seeker from "./Seeker.js";
import MediaButtons from "./MediaButtons.js";
import { formatSeconds } from "./Helpers.js";

export default function MediaPlayer({
	track,
	playedPercent,
	playedSeconds,
	isPlaying,
	canPrev,
	canNext,
	onPrev,
	onNext,
	onReady,
	onPlay,
	onProgress,
	onEnded,
	onSeek,
	...passThrough
}) {

	return (
		<div
			className="v-spread"
			style={{ backgroundColor: "black", height: "100%" }}
			{...passThrough}
		>
			<div
				className="v-spread"
				style={{
					textAlign: "center",
					alignItems: "stretch",
					flex: 1
				}}
			>
				<ArtWork src={track.artworkUrl} alt="artwork" />
			</div>
			<div className="v-spread">
				<div className="control-panel" style={{ width: "80%" }}>
					{/* Buttons */}
					<div className={classNames("artist-info")}>
						<InfoText style={{ marginLeft: 0 }}>
							{track.artistName}
						</InfoText>
					</div>
					<MediaButtons
						{...{
							isPlaying,
							canPrev,
							onPrev,
							canNext,
							onNext,
							onPlay
						}}
					/>

					<div className="time-display">
						<InfoText style={{ marginRight: 0 }}>
							{formatSeconds(playedSeconds)}
						</InfoText>
					</div>
				</div>
				<Seeker onChange={onSeek} time={playedPercent * 100} />
				<ReactPlayer
					ref={onReady}
					playing={isPlaying}
					url={track.mediaUrl}
					height={0}
					width={0}
					config={{ file: { forceAudio: true } }}
					progressInterval={1000}
					onProgress={onProgress}
					onEnded={onEnded}
				/>
			</div>
		</div>
	);
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
	onPrev: PropTypes.func.isRequired,
	onProgress: PropTypes.func.isRequired,
	onEnded: PropTypes.func.isRequired,
	onSeek: PropTypes.func.isRequired,
	onReady: PropTypes.func.isRequired
};

/* Simple components used in the Media Player */
const ArtWork = styled.img`
	object-fit: contain;
	flex-grow: 1;
	max-height: 100%;
	max-width: 100%;
`;

const InfoText = styled.div`
	padding: 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: #888888;
	max-width: 122px;
	margin: auto;
`;
