import React, { Component } from 'react'

class Card extends Component {

  constructor(props){
    super(props);
  }

  render () {

      return (
        <div >
          <img src={this.props.card.img}/>
          <div >

            <h4 >{this.props.card.name}</h4>
            <h6 >{this.props.card.description}</h6>

            {this.props.toppings}
            {this.props.add_info}


            <p>Количество: {this.props.parent.state.productCount}</p>

            <button type="button" onClick={() => this.props.addProduct(this.props.parent)}>
                +
            </button>
            <button type="button" onClick={() => this.props.removeProduct(this.props.parent)} >
                -
            </button>
            <p>Цена: {this.props.price}</p>
            <button  onClick={() => this.props.addProductToCart(this.props.parent)}>Заказать</button>

          </div>
        </div>
      );

  }
}

export default Card
