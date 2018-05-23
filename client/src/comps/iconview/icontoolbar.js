import React from 'react';
import { ButtonToolbar, ToggleButton, ToggleButtonGroup, Clearfix } from 'react-bootstrap';

import Reflux from 'reflux';
import iconStore, {iconActions} from '../../stores/iconstore';

class IconToolbar extends Reflux.Component {
    constructor(props) {
		super(props);
		this.store = iconStore;
    }
    btnListClick = (e) => {
        e.preventDefault();
        iconActions.setViewStyle(1);
    }
    btnGridClick = (e) => {
        e.preventDefault();
        iconActions.setViewStyle(2);
    }
	render() {

		const toolbarStyle = {
			'float':'right',
			'margin-top':'0px',
			'margin-bottom':'0px',
			'margin-right':'0px',
			'margin-left':'auto'
		}
		const dividerStyle = {
			'margin-top':'8px',
			'margin-bottom':'8px',
			'margin-right':'0px',
			'margin-left':'0px'
		}

		
		return (
            <div>
				<div >
                    <ButtonToolbar style={toolbarStyle}>
                        <ToggleButtonGroup 
                            type="radio" 
                            name="viewstyle" 
                            bsSize="small" 
                            value={this.state.iconViewStyle}
                        >
                        
                        <ToggleButton 
                            value={1} 
                            onClick={this.btnListClick} 
                        >
                            <span className="fa fa-list" />
                        </ToggleButton>

                        <ToggleButton 
                            value={2} 
                            onClick={this.btnGridClick} 
                        >
                            <span className="fa fa-th" />
                        </ToggleButton>
						
                        </ToggleButtonGroup>
					</ButtonToolbar>
				</div>
				<Clearfix />
				<hr style={dividerStyle} />
            </div>
		);
	}
}

export default IconToolbar;
