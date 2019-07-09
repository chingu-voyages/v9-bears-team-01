import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

import { AppContextConsumer } from '../contexts/AppContext';
import { resolve } from 'path';
class DisplayTable extends Component {
  state = { 
    modalShow: false, 
    stocks: []
  }
  
  getCurrentPrice = async(ticker) => {
    // const url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + ticker + '&apikey=1L6GZW4SFVR1BCVB';
    //Update current price
    // let res = await axios.get(url)
    // let price = res.data["Global Quote"]["05. price"];
    // console.log(price);
      // if (price) {
      // 	console.log('passed')
    // console.log(typeof(price));
    // return price;
      // 	console.log('test');
      // 	console.log(this.state.currentPrice);
      // }
      // resolve(response);
    // })
    //Returns value of current price
    //return this.state.currentPrice
  }

  getReturn(currentPrice, buyPrice) {
    if (!currentPrice || !buyPrice) {
      return 'N/A';
    }
    let returnPer = currentPrice / buyPrice;
    returnPer = (returnPer - 1) * 100;
    return returnPer;
  }

  render() {
    const headings = [
      'Ticker',
      'Price',
      'vs S&P',
      'Return',
      'S&P',
      'Buy Date',
      'Shares',
      'Buy Price'
    ];

    const theadMarkup = (
      <thead>
        <tr>
          {headings.map(function(item) {
            return <th key={item}>{item}</th>;
          })}
        </tr>
      </thead>
    );

    return (
      <AppContextConsumer>
        {({ stocks }) => (
          <Table striped bordered hover>
            {theadMarkup}
            <tbody>
              {stocks.map(stock => (
                <tr key={stock.ticker}>
                  <td>{stock.ticker}</td>
                  <td>
                    {/* {this.getCurrentPrice(stock.ticker)} */}
                  </td>
                  <td>--</td>
                  {/* <td>{this.getReturn(this.state.currentPrice, stock.price)}</td> */}
                  <td>--</td>
                  <td>{stock.date}</td>
                  <td>{stock.quantity}</td>
                  <td>${stock.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </AppContextConsumer>
    );
  }
}

export default DisplayTable;
