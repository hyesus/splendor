import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container, { hydrate: true });
root.render(<App />);
