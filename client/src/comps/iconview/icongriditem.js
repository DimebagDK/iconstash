import React, { Component } from 'react';
import { Col, Image, Panel } from 'react-bootstrap';

import filesize from 'filesize.js';

class IconGridItem extends Component {
	render() {
		const { src, alt, name, size, path, width, height } = this.props;
		var fs = filesize(size);

		const headerStyle = {
			'padding-top': '4px',
			'padding-bottom': '4px'
		};

		return (
			<Col xs={6} md={4} lg={3}>
				<Panel>
					<Panel.Heading style={headerStyle}>
						<strong>
							<div className="trunc-text" title={name}>
								{name}
							</div>
						</strong>
						<div className="small trunc-text" title={path}>
							{path}
						</div>
					</Panel.Heading>

					<Panel.Body>
						<Image src={src} alt={alt} className="center-block" responsive />
					</Panel.Body>

					<Panel.Footer style={headerStyle}>
						<span className="text-center2">
							<div className="small">
								<strong>Size :</strong> {fs}
								<br />
							</div>

							<div className="small">
								<strong>Dimensions :</strong> {width} * {height}
								<br />
							</div>
						</span>
					</Panel.Footer>
				</Panel>
			</Col>
		);
	}
}

export default IconGridItem;
