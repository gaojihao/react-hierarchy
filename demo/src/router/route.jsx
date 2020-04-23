import React from 'react';
import { Route } from 'react-router-dom';
import routes from './router';

const ZLRoute = () => (routes.map((route, index) => {
    return <Route component={route.component} exact key={index} path={route.path} ></Route>
}));

export default ZLRoute;