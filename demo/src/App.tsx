import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
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
import Animation from './animation';
import Header from './Header';

export default function App() {

  return (
    <Router>
      <div className='container'>
        <Header />
        <div className='page-container'>
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
            <Route path="/animation">
              <Animation />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}
