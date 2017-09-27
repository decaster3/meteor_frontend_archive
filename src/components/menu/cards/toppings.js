import React, { Component } from 'react'

class Toppings extends Component {

  constructor(props){
    super(props);
  }

  render () {
      var t = this.props.toppings;
      var toppings = Object.keys(t).map((key, index) => {
          var topping = {};
          Object.assign(topping, t[key]);

          var count = 0;
          if (this.props.parent.state.toppings[key])
            count = this.props.parent.state.toppings[key].count;

          return (
            <div key={index}>
              <p>{topping.name}</p>
              <p>Count: {count}</p>
              <button type="button" onClick={() => this.props.addTopping(key, topping, this.props.parent)} className="btn btn-success btn-number" >
                  <span className="glyphicon glyphicon-plus">+</span>
              </button>
              <button type="button" onClick={() => this.props.removeTopping(key, topping,  this.props.parent)} className="btn btn-success btn-number">
                  <span className="glyphicon glyphicon-minus">-</span>
              </button>
            </div>)
      });

      return (<div>{toppings}</div>);

  }
}

export default Toppings
