import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';

import Masonry from 'react-masonry-css';

import IconGridItem from './icongriditem';

class IconGrid extends Component {
	render() {

		const breakpointColumnsObj = {
			default: 4,
			1100: 3,
			700: 2,
			500: 1
		  };

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
					key={_itemsrc}
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
			<div>
				<Masonry
					breakpointCols={breakpointColumnsObj}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
				>
					{_items}
				</Masonry>
			</div>
			
		);
	}
}

export default IconGrid;
