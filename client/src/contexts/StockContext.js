import React from 'react';
// import axios from 'axios';

// let stocks = [];
// const getStockByUser = async () => {
//   const token = localStorage.token;
//   console.log('in stock context');
//   try {
//     if (token) {
//       stocks = await axios.get('/api/stocks', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//     }
//   } catch (e) {
//     stocks = e;
//   }
// };

// getStockByUser();
// export default React.createContext(`here are the user's stocks: ${stocks}`);
export default React.createContext('some default text');
