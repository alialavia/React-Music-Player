import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import styled from "styled-components";

export default function MediaButtons({
	isPlaying,
	canPrev,
	onPrev,
	canNext,
	onNext,
	onPlay,
	...passThrough
}) {
	return (
		<div className={classNames("h-center")}>
			<Button
				disabled={!canPrev}
				className="fas fa-fast-backward"
				onClick={onPrev}
			/>
			<Button
				onClick={onPlay}
				className={classNames("fas", "zoom", {
					"fa-pause": isPlaying,
					"fa-play": !isPlaying
				})}
			/>
			<Button
				disabled={!canNext}
				className="fas fa-fast-forward"
				onClick={onNext}
			/>
		</div>
	);
}

MediaButtons.propTypes = {
	isPlaying: PropTypes.bool.isRequired,
	onPlay: PropTypes.func.isRequired,
	canNext: PropTypes.bool.isRequired,
	canPrev: PropTypes.bool.isRequired,
	onNext: PropTypes.func.isRequired,
	onPrev: PropTypes.func.isRequired
};

function Button({disabled, ...passThrough}) {
	const Span = styled.span`
		padding: 20px;
		font-size: x-large;
	`;
	let color = disabled ? "#222222" : "#888888";
	return <Span style={{ color }} {...passThrough} />;
}
