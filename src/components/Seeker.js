import PropTypes from "prop-types";
import React from "react";
/**
 * A stateless seeker component
 * Set percent to see seekers position
 * On user click, onSeek is called with the corresponding percentage
 * */
function Seeker({ percent, onSeek, ...passThrough }) {
    return (
        <div
            className="hv-center"
            style={{
                position: "relative"
            }}
            {...passThrough}
        >
            <div
                onClick={event => {
                    let bounds = event.currentTarget.getBoundingClientRect();
                    let x = event.clientX - bounds.left;
                    onSeek(x / bounds.width);
                }}
                className="seeker-background"
                style={{
                    width: "100%",
                    position: "relative"
                }}
            >
                <span
                    className="seeker-progressbar"
                    style={{
                        position: "absolute",
                        width: `${percent}%`,
                        maxWidth: "100%"
                    }}
                />
            </div>
        </div>
    );
}

Seeker.propTypes = {
    percent: PropTypes.number,
    onSeek: PropTypes.func
};

export default Seeker;
