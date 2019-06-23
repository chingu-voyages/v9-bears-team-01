import React from 'react';

const token = localStorage.token;
console.log('here is my token', token);
export default React.createContext(`this is the user token ${token}`);
