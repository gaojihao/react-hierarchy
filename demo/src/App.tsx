import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import './App.css';
import HookPage from './hooks';
import DecoratorPage from './decorator';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/hooks">hooks</Link>
          </li>
          <li>
            <Link to="/decorator">Decorator</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/hooks">
            <HookPage />
          </Route>
          <Route path="/decorator">
            <DecoratorPage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}
