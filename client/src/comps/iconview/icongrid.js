import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';

import IconGridItem from './icongriditem';

class IconGrid extends Component {
	render() {
		const { items } = this.props;

		if (items.length === 0) {
			return (
				<Grid fluid>
					<Row>No items...</Row>
				</Grid>
			);
		}

		var _items = [];
		for (var l = 0; l < items.length; l++) {
			var _itemsrc = '/api/files' + items[l].path + '/' + items[l].name;
			var _item = (
				<IconGridItem
					src={_itemsrc}
					alt={items[l].name}
					name={items[l].name}
					size={items[l].size}
					path={items[l].path}
					width={items[l].width}
					height={items[l].height}
				/>
			);
			_items.push(_item);
		}

		return (
			<Grid fluid>
				<Row>{_items}</Row>
			</Grid>
		);
	}
}

export default IconGrid;
