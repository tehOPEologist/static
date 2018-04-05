import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles';

const render = async () => {
    const { default: App } = await import(/* webpackChunkName: 'app' */'./components/app');

    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById('app')
    );
};

requestAnimationFrame(render);
