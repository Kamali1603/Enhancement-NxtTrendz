import React, {Component} from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

const paymentOptionsList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

class Payment extends Component {
  state = {
    paymentMethod: '',
    isOrderPlaced: false,
  }

  updatePaymentMethod = event => {
    const {id} = event.target
    this.setState({paymentMethod: id})
  }

  onPlaceOrder = () => {
    this.setState({isOrderPlaced: true})
  }

  getTotalPrice = cartList =>
    cartList.reduce((total, {quantity, price}) => total + quantity * price, 0)

  renderPaymentMethodsInput = () => (
    <ul className="payment-method-inputs">
      {paymentOptionsList.map(eachMethod => (
        <li key={eachMethod.id} className="payment-method-input-container">
          <input
            className="payment-method-input"
            id={eachMethod.id}
            type="radio"
            name="paymentMethod"
            disabled={eachMethod.isDisabled}
            onChange={this.updatePaymentMethod}
          />
          <label
            className={`payment-method-label ${
              eachMethod.isDisabled ? 'disabled-label' : ''
            }`}
            htmlFor={eachMethod.id}
          >
            {eachMethod.displayText}
          </label>
        </li>
      ))}
    </ul>
  )

  render() {
    const {paymentMethod, isOrderPlaced} = this.state

    return (
      <CartContext.Consumer>
        {({cartList}) => (
          <div className="payments-container">
            {isOrderPlaced ? (
              <p className="success-message">
                Your order has been placed successfully
              </p>
            ) : (
              <>
                <h1 className="payments-heading">Payments Details</h1>
                <p className="payments-sub-heading">Payment Method</p>
                {this.renderPaymentMethodsInput()}
                <div className="order-details">
                  <p className="payments-sub-heading">Order details:</p>
                  <p>Quantity: {cartList.length}</p>
                  <p>Total Price: RS {this.getTotalPrice(cartList)}/-</p>
                </div>
                <button
                  disabled={paymentMethod === ''}
                  type="button"
                  className="confirm-order-button"
                  onClick={this.onPlaceOrder}
                >
                  Confirm Order
                </button>
              </>
            )}
          </div>
        )}
      </CartContext.Consumer>
    )
  }
}

export default Payment
