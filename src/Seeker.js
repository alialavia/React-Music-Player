import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";
import React, { Component } from "react";
export default class Seeker extends Component {

    render() {
        return (
            <div
                onClick={event => {                    
                    let bounds = event.currentTarget.getBoundingClientRect();
                    let x = event.clientX - bounds.left;
                    this.props.onChange(x / bounds.width);
                }}
                style={{ width: "100%", height: 5, backgroundColor: "grey" }}
            >
                <span
                    style={{
                        position: "absolute",
                        backgroundColor: "#a4da35",
                        width: `${this.props.time}%`,
                        height: 5
                    }}
                />
            </div>
        );
    }
}

Seeker.propTypes = {
    time: PropTypes.number,
    onChange: PropTypes.func
};
