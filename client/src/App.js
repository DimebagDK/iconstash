import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Grid, Row } from 'react-bootstrap';

import Reflux from 'reflux';
import iconStore, { iconActions } from './stores/iconstore';

import './css/bootstrap.css';
import './css/bootstrap-theme.css';
import './App.css';

import PageHeader from './comps/pageheader';
import PageFooter from './comps/pagefooter';
import { IconBrowse, IconSearch } from './comps/iconview';
import HomeView from './comps/homeview';
import Page404 from './comps/404';

class App extends Reflux.Component {
	constructor(props) {
		super(props);

		this.store = iconStore;
	}
	componentDidMount() {
		iconActions.pullIcons();
	}
	render() {
		return (
			<BrowserRouter>
				<div>
					<Grid>
						<Row>
							<PageHeader />
						</Row>

						<Row>
							<Switch>
								<Route exact path="/" component={HomeView} />

								<Route path="/icons" component={IconBrowse} />

								<Route path="/search" component={IconSearch} />

								<Route path="/404" component={Page404} />
							</Switch>
						</Row>

						<Row>
							<PageFooter />
						</Row>
					</Grid>
				</div>
			</BrowserRouter>
		);
	}
}
export default App;
