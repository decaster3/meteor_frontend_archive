import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class DeliveryInfoContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userName: null,
      phoneNumber: null,
      building: "",
      flat: ""
    }
  }

  componentDidMount(){

  }

  handleChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  render(){
    let p = this.props
    let s = this.state
    return (
      <div>
        Имя
        <input name = "userName" type = "text" value = {s.userName || p.user.username || ""} onChange = {this.handleChange}/>
        Телефон
        <input name = "phoneNumber" type = "text" value = {s.phoneNumber || p.user.phone || ""} onChange = {this.handleChange}/>
        Aдреса
        Дом
        <input name = "building" type = "text" value = {s.building} onChange = {this.handleChange}/>
        Квартира
        <input name = "flat" type = "text" value = {s.flat} onChange = {this.handleChange}/>
  </div>
    )
  }
}

function mapStateToProps(state){
    return {
      user: state.user,
      cart: state.cart
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {

    },
    dispatch
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryInfoContainer)
