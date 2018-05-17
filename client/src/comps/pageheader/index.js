import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav, Navbar, NavItem, Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
	searchClick = e => {
		e.preventDefault();
		this.props.history.push('/search/' + encodeURIComponent(this.state.searchfor));
	};
	render() {
		return (
			<Navbar fixedTop collapseOnSelect>
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
								<span className="fa fa-image" /> Icons
							</NavItem>
						</LinkContainer>
					</Nav>

					<Nav pullRight>
						{this.state.isLoading && (
							<NavItem>
								<span className="fa fa-pull-right fa-lg fa-refresh fa-spin" />
							</NavItem>
						)}
						{!this.state.isLoading && (
							<NavItem>
								<span onClick={this.updateClick} className="fa fa-pull-right fa-lg fa-refresh" />
							</NavItem>
						)}
					</Nav>

					<div className="container-fluid text-center navbar-form">
						<FormGroup>
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
