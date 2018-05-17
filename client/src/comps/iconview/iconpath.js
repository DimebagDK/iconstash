import React, { Component } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class IconPath extends Component {
	render() {
		const { items } = this.props;

		var _list = [];
		var _listitempath = '/';
		if (items && Array.isArray(items)) {
			for (var i = 0; i < items.length; i++) {
				_listitempath = _listitempath + items[i] + '/';
				var _listitem = (
					<LinkContainer to={_listitempath}>
						<Breadcrumb.Item href={_listitempath}>{items[i]}</Breadcrumb.Item>
					</LinkContainer>
				);
				_list.push(_listitem);
			}
		}

		return <Breadcrumb>{_list}</Breadcrumb>;
	}
}

export default IconPath;
