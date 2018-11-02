import PropTypes from "prop-types";
import styled from "styled-components";
import React, { Component } from "react";

function Seeker(props) {
    const { time, ...passThrough } = props;
    return (
        <div
            onClick={event => {
                let bounds = event.currentTarget.getBoundingClientRect();
                let x = event.clientX - bounds.left;
                props.onChange(x / bounds.width);
            }}
            style={{
                width: "100%",
                height: 5,
                backgroundColor: "grey",
                position: 'relative'
            }}
            {...passThrough}
        >
            <span
                style={{
                    position: "absolute",
                    backgroundColor: "#a4da35",
                    width: `${props.time}%`,
                    height: 5,
                    maxWidth: "100%"
                }}
            />
        </div>
    );
}

Seeker.propTypes = {
    time: PropTypes.number,
    onChange: PropTypes.func
};

export default Seeker;
