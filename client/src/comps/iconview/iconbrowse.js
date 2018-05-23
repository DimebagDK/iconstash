import React from 'react';
import { Redirect } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';

import Reflux from 'reflux';
import iconStore from '../../stores/iconstore';

import IconToolbar from './icontoolbar';
import IconPath from './iconpath';
import IconFolderNav from './iconfoldernav';
import IconGrid from './icongrid';
import IconList from './iconlist';

class IconBrowse extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = iconStore;
	}
	render() {
		if (this.state.isLoading) {
			return <p>Loading...</p>;
		}

		//Splitting the path to here, for the breadcrumb
		var path = this.props.location.pathname;
		if (path && path.length > 0 && path.charAt(0) === '/') {
			path = path.substr(1);
		}
		if (path && path.length > 0 && path.substr(path.length - 1) === '/') {
			path = path.slice(0, -1);
		}
		var pathparts = path.split('/');

		//simply constructing a fullpath to here, for pre-pending to subfolders
		var fullpath = '/' + pathparts.join('/') + '/';
		var uppath = null;
		if (pathparts.length > 1) {
			uppath = '/' + pathparts.slice(0, -1).join('/') + '/';
		}

		//Using the split path to crawl the icons-array
		var _objlist = [];
		if (pathparts.length > 0 && pathparts[0] === 'icons') {
			_objlist = this.state.icons;
		}
		for (var i = 1; i < pathparts.length; i++) {
			var _obj = _objlist.find(function(element) {
				return element[pathparts[i]] && Array.isArray(element[pathparts[i]]);
			});

			if (_obj) {
				_objlist = _obj[pathparts[i]];
			} else {
				return <Redirect to="/404" />;
			}
		}

		//Making lists of folders and files to display
		var _foldernames = [];
		var _files = [];

		for (var j = 0; j < _objlist.length; j++) {
			var _item = _objlist[j];
			if (_item.name && _item.path && _item.size && _item.date) {
				_files.push(_item);
			} else {
				var _keys = Object.keys(_item);
				for (var k = 0; k < _keys.length; k++) {
					if (_item[_keys[k]] && Array.isArray(_item[_keys[k]])) {
						_foldernames.push(_keys[k]);
					}
				}
			}
		}

		//Sorting the folders "naturally" so 16x16 is listed before 128x128, for example
		_foldernames.sort((a, b) => {
			return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
		});

		return (
			<div>
				<Row>
					<Col lg={12}>
						<IconToolbar />
					</Col>
				</Row>

				<Row>
					<Col lg={12}>
						<IconPath items={pathparts} />
					</Col>
				</Row>

				<Row>
					<Col lg={2}>
						<IconFolderNav folders={_foldernames} upfolder={uppath} basefolder={fullpath} />
					</Col>

					<Col lg={10}>
						{this.state.iconViewStyle === 1
						? <IconList items={_files} />
						: <IconGrid items={_files} />
						}
					</Col>
				</Row>
			</div>
		);
	}
}

export default IconBrowse;
