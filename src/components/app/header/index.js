import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Link } from 'react-router-dom';

class Header extends Component {
    state = {};

    componentDidMount = async () => {
        let variant = localStorage.getItem('Heading');

        if (variant === null) {
            const roll = Math.random();

            if (roll >= 0.5) {
                variant = 'exp1';
            } else {
                variant = '';
            }

            localStorage.setItem('Heading', variant);
        }

        const { default: Heading } = await import(/* webpackChunkName: 'heading' */`./heading/${variant}`);

        this.setState({ Heading });
    };

    render = () => {
        const { Heading } = this.state;

        return <header>
            {Heading && <Heading />}
            <nav>
                <ul>
                    <li><Link to="/">home</Link></li>
                    <li>
                        <Link to="/about">about</Link>
                        <ul>
                            <li><Link to="/about/me">me</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>;
    };
}

export default hot(module)(Header);
