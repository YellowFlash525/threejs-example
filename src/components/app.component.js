import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from './home/home.copmponent';
import NightSky from './nightSky/nightSky.component';
import ThanosPortal from './thanosPortal/thanosPortal.component';
import SolarSystem from './solarSystem/solarSystem.component';

const App = () => (
	<Router>
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/night-sky">Night Sky</Link>
					</li>
					<li>
						<Link to="/thanos-portal">Thanos portal</Link>
					</li>
					<li>
						<Link to="/solar-system">Solar-System</Link>
					</li>
				</ul>
			</nav>
			<Switch>
				<Route path="/night-sky">
					<NightSky />
				</Route>
				<Route path="/thanos-portal">
					<ThanosPortal />
				</Route>
				<Route path="/solar-system">
					<SolarSystem />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</div>
	</Router>
);

export default App;