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

export default function App() {
    return (
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
    
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
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
};