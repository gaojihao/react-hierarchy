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
import GeneratorPage from './generator';
import IteratorPage from './iterator';
import ProxyPage from './proxy';
import ReflectPage from './reflect';
import SymbolPage from './symbol';
import AntMobile from './antMobile';

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
          <li>
            <Link to="/generator">Generator</Link>
          </li>
          <li>
            <Link to="/iterator">Iterator</Link>
          </li>
          <li>
            <Link to="/proxy">Proxy</Link>
          </li>
          <li>
            <Link to="/reflect">Reflect</Link>
          </li>
          <li>
            <Link to="/symbol">Symbol</Link>
          </li>
          <li>
            <Link to="/ant">ant</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/hooks">
            <HookPage />
          </Route>
          <Route path="/decorator">
            <DecoratorPage />
          </Route>
          <Route path="/generator">
            <GeneratorPage />
          </Route>
          <Route path="/iterator">
            <IteratorPage />
          </Route>
          <Route path="/proxy">
            <ProxyPage />
          </Route>
          <Route path="/reflect">
            <ReflectPage />
          </Route>
          <Route path="/symbol">
            <SymbolPage />
          </Route>
          <Route path="/ant">
            <AntMobile />
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
