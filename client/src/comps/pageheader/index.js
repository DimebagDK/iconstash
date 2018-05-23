import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { 	Nav, 
			Navbar, 
			NavItem, 
			Button, 
			FormGroup, 
			FormControl, 
			InputGroup,
			ButtonToolbar, 
			ButtonGroup,
			ToggleButton, 
			ToggleButtonGroup, 
			Clearfix } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { ThemeChooser } from 'react-bootstrap-theme-switcher';

import Reflux from 'reflux';
import iconStore, { iconActions } from '../../stores/iconstore';

class PageHeader extends Reflux.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchfor: ''
		};
		this.store = iconStore;
	}
	updateClick = () => {
		iconActions.pullIcons();
	};
	btnLightClick = (e) => {
        e.preventDefault();
        iconActions.setAppTheme(1);
    }
	btnDarkClick = (e) => {
        e.preventDefault();
        iconActions.setAppTheme(2);
    }
	searchClick = e => {
		e.preventDefault();
		this.props.history.push('/search/' + encodeURIComponent(this.state.searchfor));
	};
	render() {
		return (
			<Navbar collapseOnSelect bsStyle={this.state.appTheme === 1 ? 'default':'inverse'}>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/">Icon Stash</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>

				<Navbar.Collapse>
					<Nav>
						<LinkContainer to="/icons">
							<NavItem>
								<span className="fa fa-image" /> Browse
							</NavItem>
						</LinkContainer>
						<LinkContainer to="/search">
							<NavItem>
								<span className="fa fa-search" /> Search
							</NavItem>
						</LinkContainer>
					</Nav>

					
					<Nav pullRight>
						<div className=" container-fluid text-right navbar-form">
							<ButtonToolbar>
								<ButtonGroup>
									{this.state.isLoading && (
										<Button><span className="fa fa-refresh fa-spin" /></Button>
									)}
									{!this.state.isLoading && (
										<Button onClick={this.updateClick}><span className="fa fa-refresh" /></Button>
									)}
								</ButtonGroup>
							</ButtonToolbar>
						</div>
					</Nav>

					<Nav pullRight>
						<div className=" container-fluid text-right navbar-form">
							<ThemeChooser />
						</div>
					</Nav>

					<div className="container-fluid text-center navbar-form">
					
						<FormGroup >
							<InputGroup>
								<FormControl
									type="text"
									onChange={event => this.setState({ searchfor: event.target.value })}
									onKeyPress={event => {
										if (event.key === 'Enter') {
											this.searchClick(event);
										}
									}}
								/>
								<InputGroup.Button>
									<Button onClick={this.searchClick}>
										<span className="fa fa-search" />
									</Button>
								</InputGroup.Button>
							</InputGroup>
						</FormGroup>
					</div>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default withRouter(PageHeader);
