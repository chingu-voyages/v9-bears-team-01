import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

import { AppContextConsumer } from '../contexts/AppContext';
class DisplayTable extends Component {
  constructor(...args) {
    super(...args);

    this.state = { modalShow: false, stocks: [] };
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
                  <td>--</td>
                  <td>--</td>
                  <td>--</td>
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
