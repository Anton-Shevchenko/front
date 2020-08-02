import React from 'react';
import { render } from 'react-dom';
import Form from './Form';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import List from './List';

const renderApp = () => {
    render(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={List} />
                <Route exact path='/form' component={Form} />
            </Switch>
        </BrowserRouter>,
        document.getElementById('root')
    );
};

renderApp();