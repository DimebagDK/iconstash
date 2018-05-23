import React, { Component } from 'react';
import { Grid, Row, Table } from 'react-bootstrap';


import IconListItem from './iconlistitem';

class IconList extends Component {
	render() {

        const colStyles = [
            { 'vertical-align': 'middle', 'text-align': 'center', 'min-width': '48px', 'max-width':'48px' },
            { 'vertical-align': 'middle', 'text-align': 'left', 'min-width': '200px', 'max-width': '200px' },
            { 'vertical-align': 'middle', 'text-align': 'left' },
            { 'vertical-align': 'middle', 'text-align': 'right', 'min-width': '100px', 'max-width': '100px' },
            { 'vertical-align': 'middle', 'text-align': 'right', 'minwidth': '100px', 'max-width': '100px' }
        ];

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
                    <IconListItem
                        key={_itemsrc}
                        src={_itemsrc}
                        alt={items[l].name}
                        name={items[l].name}
                        size={items[l].size}
                        path={items[l].path}
                        width={items[l].width}
                        height={items[l].height}
                        colstyles={colStyles}
                    />
                
			);
			_items.push(_item);
		}

        

		return (
			<Table responsive>

                <thead>
                    <tr>
                        <th style={colStyles[0]}>&nbsp;</th>
                        <th style={colStyles[1]}>Filename</th>
                        <th style={colStyles[2]}>Path</th>
                        <th style={colStyles[3]}>Size</th>
                        <th style={colStyles[4]}>Dimensions</th>
                    </tr>
                </thead>

                <tbody>

                    {_items}
                    
                </tbody>

			</Table>
			
		);
	}
}

export default IconList;
