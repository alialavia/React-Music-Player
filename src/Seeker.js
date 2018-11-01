import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";

import React, { Component } from "react";

export default class Seeker extends Component {
	render() {
		// TODO: Make sure it's really click and not only mouse down
		return (			
			<div onMouseDown={(e)=>{ console.log(e.clientX);}} style={{ display: 'flex', backgroundColor: 'grey', height: 5, width: '80%' }}>
				<span style={{ backgroundColor: '#a4da35', width: '50%'}}/>
			</div>
		);
	}
}

Seeker.propTypes = {
	time: PropTypes.number,
	onChange: PropTypes.func
};
