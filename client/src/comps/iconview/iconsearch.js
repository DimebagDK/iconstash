import React from 'react';
import { Redirect } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';

import Reflux from 'reflux';
import iconStore from '../../stores/iconstore';

import IconToolbar from './icontoolbar';
import IconGrid from './icongrid';
import IconList from './iconlist';

import Fuse from 'fuse.js';

function flattenFiles(arSource, arDest) {
	for (var j = 0; j < arSource.length; j++) {
		var _item = arSource[j];
		if (_item.name && _item.path && _item.size && _item.date) {
			arDest.push(_item);
		} else {
			var _keys = Object.keys(_item);
			for (var k = 0; k < _keys.length; k++) {
				if (_item[_keys[k]] && Array.isArray(_item[_keys[k]])) {
					flattenFiles(_item[_keys[k]], arDest);
				}
			}
		}
	}
}

class IconSearch extends Reflux.Component {
	constructor(props) {
		super(props);
		this.store = iconStore;
	}
	render() {
		if (this.state.isLoading) {
			return <p>Loading...</p>;
		}

		//Splitting the path to here, for the search-criteria
		var path = this.props.location.pathname;
		if (path && path.length > 0 && path.charAt(0) === '/') {
			path = path.substr(1);
		}
		if (path && path.length > 0 && path.substr(path.length - 1) === '/') {
			path = path.slice(0, -1);
		}
		var pathparts = path.split('/');

		if (pathparts[0] !== 'search') {
			return <Redirect to="/404" />;
		}

		var _searchterm = decodeURIComponent(pathparts.slice(1).join('/'));

		//Making list of files to display
		var _files = [];
		var _allfiles = [];
		if (_searchterm.length > 0) {
			flattenFiles(this.state.icons, _allfiles);

			var options = {
				shouldSort: true,
				findAllMatches: true,
				tokenize: true,
				threshold: 0.25,
				location: 0,
				distance: 50,
				maxPatternLength: 32,
				minMatchCharLength: 1,
				keys: ['name']
			};
			var fuse = new Fuse(_allfiles, options);
			_files = fuse.search(_searchterm);
		}

		return (
			<div>

				<Row>
					<Col lg={12}>
						<IconToolbar />
					</Col>
				</Row>

				<Row>
					<Col lg={12}>
						<h3>Search [ {_searchterm} ]</h3>
						<hr />
					</Col>
				</Row>

				<Row>
					<Col lg={12}>
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

export default IconSearch;
