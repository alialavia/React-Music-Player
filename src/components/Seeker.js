import PropTypes from "prop-types";
import React from "react";
/**
 * A stateless seeker component
 * Set percent to set seeker's position
 * On user click, onSeekClick is called with the corresponding percentage as 
 * argument
 * */
function Seeker({ percent, onSeekClick, ...passThrough }) {
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
                    onSeekClick(x / bounds.width);
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
    onSeekClick: PropTypes.func
};

export default Seeker;
