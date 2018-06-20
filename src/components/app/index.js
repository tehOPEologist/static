import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { app } from './styles';

class App extends Component {
    state = {};

    componentDidMount = async () => {
        const { default: Header } = await import(/* webpackChunkName: 'header' */'./header');
        const { default: Main } = await import(/* webpackChunkName: 'main' */'./main');

        this.setState({ Header, Main });
    };

    render = () => {
        const { Header, Main } = this.state;

        return <div className={app}>
            {Header && <Header />}
            {Main && <Main />}
        </div>;
    };
}

export default hot(module)(App);
