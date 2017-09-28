import React, { Component } from 'react'

class Sizes extends Component {

  constructor(props){
    super(props);
    this.state = {sizeIndex: 0};
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    var size = this.props.sizes[0];
    var event =  {
        "target" : {
          "value" :
            0
        }
      }

    this.handleChange(event);
  }

  handleChange(event) {
    var sizeIndex = event.target.value;
    var size = this.props.sizes[sizeIndex];

    this.setState({sizeIndex});
    this.props.foo(size, this.props.parent);
  }

  render () {
    const sizes = this.props.sizes.map((size, index) => {
      return (
        <div key = {index}>
          <input type="radio" value={index} checked={this.state.sizeIndex == index} onChange={this.handleChange} />
          {"Радиус: " + size.radius}
        </div>)
    });
    return (
      <div>
        {sizes}
      </div>
    );

  }
}

export default (Sizes)
