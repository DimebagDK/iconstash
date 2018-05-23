import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import Image from 'pimg';
import filesize from 'filesize.js';

class IconGridItem extends Component {
	render() {
		const { src, alt, name, size, path, width, height } = this.props;
		var fs = filesize(size);

		const pnlHeaderStyle = {
			'padding-top': '4px',
			'padding-bottom': '4px'
		};
		const pnlFooterStyle = {
			'padding-top': '4px',
			'padding-bottom': '4px'
		};
		const pnlBodyStyle = {
			//'background-color':'#F9F9F9'
		}

		const imgStyle = {
			'max-width': '100%',
		}


		//<Col xs={6} md={4} lg={3}>

		return (
			
				<Panel>
					<Panel.Heading style={pnlHeaderStyle}>
						<strong>
							<div className="trunc-text" title={name}>
								{name}
							</div>
						</strong>
						<div className="small trunc-text" title={path}>
							{path}
						</div>
					</Panel.Heading>

					<Panel.Body style={pnlBodyStyle}>
						<Image 
							fetchOnDemand 
							src={src} 
							alt={alt} 
							className="center-block" 
							style={imgStyle}
						/>
					</Panel.Body>

					<Panel.Footer style={pnlFooterStyle}>
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
			
		);
	}
}

export default IconGridItem;
