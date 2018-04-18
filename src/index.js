import '../node_modules/loaders.css/loaders.css';

import initState from './events.js';
const globalState = initState();

//Piece of code to use env variables inside the HTML
//https://github.com/parcel-bundler/parcel/issues/1209
document.querySelector('.button-ok').href = process.env.AUTH_URL;
