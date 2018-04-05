import React from 'react';
import { hot } from 'react-hot-loader';

const Home = ({ match }) => {
    const { param1 } = match.params;

    return <div>
        <h1>home</h1>
        {param1 && <h2>{param1}</h2>}
    </div>;
}

export default hot(module)(Home);
