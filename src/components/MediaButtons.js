import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
/**
 * Stateless UI for media player buttons
 * It's up to the parent to handler user's interaction 
 */

export default function MediaButtons({
	isNextEnabled,
	isPlaying,
	isPrevEnabled,
	onNextClick,
	onPlayClick,
	onPrevClick,
	...passThrough
}) {
	return (
		<div className={classNames("h-center")}>
			<Button
				disabled={!isPrevEnabled}
				className="fas fa-fast-backward"
				onClick={onPrevClick}
			/>
			<Button
				onClick={onPlayClick}
				className={classNames("fas", "zoom", {
					"fa-pause": isPlaying,
					"fa-play": !isPlaying
				})}
			/>
			<Button
				disabled={!isNextEnabled}
				className="fas fa-fast-forward"
				onClick={onNextClick}
			/>
		</div>
	);
}

MediaButtons.propTypes = {
	isNextEnabled: PropTypes.bool.isRequired,
	isPlaying: PropTypes.bool.isRequired,
	isPrevEnabled: PropTypes.bool.isRequired,
	onNextClick: PropTypes.func.isRequired,
	onPlayClick: PropTypes.func.isRequired,
	onPrevClick: PropTypes.func.isRequired
};

function Button({ disabled, className, ...passThrough }) {
	return (
		<span
			className={classNames(className, "button", {
				"button-disabled": disabled
			})}
			{...passThrough}
		/>
	);
}
