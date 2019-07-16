import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

import { AppContextConsumer } from '../contexts/AppContext';
import { resolve } from 'path';
class DisplayTable extends Component {
  state = {
    modalShow: false,
    stocks: []
  };

  updateStock = async stock => {
    const res = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=
      ${stock.ticker}&apikey=1L6GZW4SFVR1BCVB`);

    const currentPrice = res.data['Global Quote']['05. price'];
    let stockReturn = null;

    if (currentPrice) {
      stockReturn = (currentPrice - stock.price) / stock.price;
    }
    return { ...stock, currentPrice, return: stockReturn };
  };

  getReturn(currentPrice, buyPrice) {
    if (!currentPrice || !buyPrice) {
      return 'N/A';
    }
    let returnPer = currentPrice / buyPrice;
    returnPer = (returnPer - 1) * 100;
    return returnPer;
  }

  componentDidMount = async function() {
    // await this.setState({ stocks: this.props.stocks });
    // const newStocks = await this.state.stocks(stock => ({
    //   ...stock,
    //   currentPrice: 'currentPrice'
    // }));
    // console.log({ newStocks });
    // await this.setState({ stocks: this.props.stocks });

    console.log('props: ', this.props);
    await this.setState({ stocks: this.props.stocks });
    const newStocks = await Promise.all(
      this.state.stocks.map(stock => this.updateStock(stock))
    );
    console.log('new stocks', newStocks);
    // const newStocks = this.state.stocks.map( stock => async ({
    //   ...stock,
    //   currentPrice: await this.getCurrentPrice(stock.ticker)
    // }));
    await this.setState({ stocks: newStocks });
    console.log('state after cdm:', this.state);
  };

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
    // const stocks = this.props.stocks;
    // console.log({ stocks });
    return (
      <Table striped bordered hover>
        {theadMarkup}
        <tbody>
          {this.state.stocks.map(stock => (
            <tr key={stock.ticker}>
              <td>{stock.ticker}</td>
              <td>{stock.currentPrice}</td>
              <td>--</td>
              <td>{stock.return}</td>
              <td>--</td>
              <td>{stock.date}</td>
              <td>{stock.quantity}</td>
              <td>${stock.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

// export default DisplayTable;
export default React.forwardRef((props, ref) => (
  <AppContextConsumer>
    {function({ stocks }) {
      // console.log({ stuff });
      return <DisplayTable {...props} stocks={stocks} ref={ref} />;
    }}
  </AppContextConsumer>
));
