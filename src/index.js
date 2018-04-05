import React from 'react';
import ReactDOM from 'react-dom';
import './styles';

const render = async () => {
    const { default: App } = await import(/* webpackChunkName: 'app' */'./components/app');

    ReactDOM.render(<App />, document.getElementById('app'));
};

requestAnimationFrame(render);
