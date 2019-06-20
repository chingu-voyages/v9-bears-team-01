import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';

class DisplayTable extends Component {
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
		]

		const theadMarkup = (
			<thead>
				<tr>
					{ headings.map(function(item) {
						return <th>{ item }</th>;
					})}
				</tr>
			</thead>
		);

		return (
			<Table
				striped
				bordered
				hover
				>
				{ theadMarkup }
				<tr>
					<td>
						AAPL
					</td>
					<td>
						$193.22
					</td>
					<td>
						34.50%
					</td>
					<td>
						18.25%
					</td>
					<td>
						16.14%
					</td>
					<td>
						01/02/2019
					</td>
					<td>
						19
					</td>
					<td>
						$143.77
					</td>
				</tr>
			</Table>
		)
	}
}

export default DisplayTable