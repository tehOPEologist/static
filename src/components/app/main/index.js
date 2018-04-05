import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { hot } from 'react-hot-loader';

class Main extends Component {
    state = {};

    getPage = async (pathname, params = []) => {
        try {
            const { default: Page } = await import(/* webpackChunkName: '[request]' */ `./pages${pathname}`);
            let paramsStr = '';

            for (let i = 1; i <= params.length; i++) {
                paramsStr = paramsStr.concat(`/:param${i}`);
            }

            this.setState({ Page: <Route path={`${pathname}${paramsStr}`} component={Page} /> });
        } catch (err) {
            let newPathname = pathname.split('/');

            params.unshift(newPathname.pop());

            newPathname = newPathname.join('/');

            this.getPage(newPathname, params);
        }
    };

    componentWillMount = () => {
        const { pathname } = this.props.location;

        this.getPage(pathname);
    };

    componentWillReceiveProps = nextProps => {
        const { pathname } = nextProps.location;

        this.getPage(pathname);
    };

    render = () => {
        const { Page } = this.state;

        return <main>
            {Page}
        </main>;
    }
}

export default hot(module)(withRouter(Main));
