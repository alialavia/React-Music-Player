import PropTypes from "prop-types";

const trackPropType = PropTypes.shape({
	id: PropTypes.number.isRequired,
	trackName: PropTypes.string.isRequired,
	mediaUrl: PropTypes.string.isRequired,
	artistName: PropTypes.string.isRequired,
	durationMilliseconds: PropTypes.number.isRequired,
	artworkUrl: PropTypes.string
});

function padInt(n, i) {
	if (n < 0)
		return '-' + padInt(-n, i);
	
	let ns = n.toString();
	let padded = "0".repeat(i) + ns;

	if (ns.length >= i)
		return ns;
		
	return padded.substring(padded.length-i);
}

function formatSeconds(s) {
	let minutes = Math.trunc(s / 60);
	let seconds = s % 60;
	return `${padInt(minutes, 2)}:${padInt(seconds, 2)}`;
}

export { padInt, formatSeconds, trackPropType};
