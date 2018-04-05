import React from 'react';
import { hot } from 'react-hot-loader';

const About = ({ match }) => {
    const { param1 } = match.params;

    return <div>
        <h1>about</h1>
        {param1 && <h2>{param1}</h2>}
    </div>;
};

export default hot(module)(About);
