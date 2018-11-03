import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";
import Seeker from "./Seeker.js";
import MediaButtons from "./MediaButtons.js";
import { formatSeconds, trackPropType } from "../Helpers.js";

/**
 * Stateless UI for interacting with a track.
 * This component dispatches events for every user interaction.
 * Such events should be handled by a stateful parent.
 * playedPercent (a number between 0 and 1) can be used for
 */

export default function MediaController({
	isNextEnabled,
	isPlaying,
	isPrevEnabled,
	onNextClick,
	onPlayClick,
	onPrevClick,
	onSeekClick,
	playedPercent,
	track,
	...passThrough
}) {
	return (
		<div className="v-spread" style={{ height: "100%" }} {...passThrough}>
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
			<div className="v-spread" style={{ width: "80%" }}>
				<div className="control-panel">
					{/* Buttons */}
					<div className="artist-info">
						<InfoText
							className="info-text-artist-name"
							style={{ marginLeft: 0 }}
						>
							{track.artistName}
						</InfoText>
					</div>
					<MediaButtons
						{...{
							isPlaying,
							isPrevEnabled,
							onPrevClick,
							isNextEnabled,
							onNextClick,
							onPlayClick
						}}
					/>

					<div className="time-display">
						<InfoText
							className="info-text-time"
							style={{ marginRight: 0 }}
						>
							{formatSeconds(
								Math.round(playedPercent * track.durationMilliseconds / 1000)
							)}
						</InfoText>
					</div>
				</div>
				<Seeker
					className={classNames("control-panel", "seeker")}
					onSeekClick={onSeekClick}
					percent={playedPercent * 100}
				/>
			</div>
		</div>
	);
}

MediaController.propTypes = {
	track: trackPropType,
	isNextEnabled: PropTypes.bool.isRequired,
	isPrevEnabled: PropTypes.bool.isRequired,
	onNextClick: PropTypes.func.isRequired,
	onPrevClick: PropTypes.func.isRequired,
	onSeekClick: PropTypes.func.isRequired
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
	max-width: 100%;
	margin: auto;
`;
