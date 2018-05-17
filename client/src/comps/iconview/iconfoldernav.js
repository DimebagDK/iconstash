import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class IconFolderNav extends Component {
	render() {
		const { folders, upfolder, basefolder } = this.props;

		var _items = [];

		for (var l = 0; l < folders.length; l++) {
			var _folderlink = basefolder + folders[l];
			var _folder = (
				<LinkContainer activeClassName="" to={_folderlink}>
					<ListGroupItem href={_folderlink} key={_folderlink}>
						<div class="trunc-text" title={folders[l]}>
							<span className="fa fa-folder-o" /> {folders[l]}
						</div>
					</ListGroupItem>
				</LinkContainer>
			);
			_items.push(_folder);
		}
		if (upfolder) {
			var _upfolder = (
				<LinkContainer activeClassName="" to={upfolder}>
					<ListGroupItem href={upfolder}>
						<span className="fa fa-level-up" />
					</ListGroupItem>
				</LinkContainer>
			);
			_items.unshift(_upfolder);
		}

		return <ListGroup>{_items}</ListGroup>;
	}
}

export default IconFolderNav;
