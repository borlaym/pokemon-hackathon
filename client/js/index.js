import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

import io from 'socket.io-client';

let socket = io('http://localhost:3001');

socket.on('connect', (socket) => {
});

ReactDOM.render(<App />, document.getElementById('main'));
