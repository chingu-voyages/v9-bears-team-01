import React, { Component } from 'react' 

class AddBuyForm extends Component {
  render() {
		return (
			<div>
				<h2>Add Buy Transaction</h2>
				<form>
					Ticker: <br />
					<input type="text" /><br />
					Date: <br />
					<input type="date" /><br />
					Quantity: <br />
					<input type="text" /><br />
					Price Per Share: <br />
					<input type="text" /><br />
					<input type="submit" value="submit" />>
				</form>
			</div>
		)
	}
}

export default AddBuyForm