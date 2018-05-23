import React, { Component } from 'react';
import Image from 'pimg';
import filesize from 'filesize.js';

class IconListItem extends Component {
	render() {
		const { src, alt, name, size, path, width, height, colstyles } = this.props;
		var fs = filesize(size);

		const imgStyle = {
			'margin-top': '4px',
			'margin-bottom': '4px',
            'max-height': '38px'
		}; 

		return (
			<tr>
				<td style={colstyles[0]}>
					<Image fetchOnDemand src={src} alt={alt} style={imgStyle} />
				</td>

				<td style={colstyles[1]}>
					<span className="trunc-text" title={name}>
						{name}
					</span>
				</td>

				<td style={colstyles[2]}>
					<span className="trunc-text" title={path}>
						{path}
					</span>
				</td>

                <td style={colstyles[3]}>
                    {fs}
                </td>

				<td style={colstyles[4]}>
					{width} * {height}
				</td>
			</tr>
		);
	}
}

export default IconListItem;
