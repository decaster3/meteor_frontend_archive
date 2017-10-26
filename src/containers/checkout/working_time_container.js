import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class WorkingTimeContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showTime: false
    }
    this.changeShowTime = this.changeShowTime.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }

  componentDidMount(){

  }

  changeShowTime(){
    var a = this.state.showTime
    this.setState({
      showTime: !a
    })
  }

  handleChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
  }
  handleCheckbox(){
    this.changeShowTime()
  }

  render(){
    let p = this.props
    let s = this.state
    switch (p.cart.timeValidation) {
      case "WORKING_TIME":
        return(
          <div>
            Ресторан сейчас работает, вы можете запланировать доставку.
            <br/>
              <input
                type="checkbox"
                defaultChecked={false}
                onChange={this.handleCheckbox}/>
              <p>Запланировать время доставки</p>
          {
            s.showTime?
              <div>Таймпикер</div>
            :
             <div></div>
          }
          </div>
        )
      default:
        return(
          <div>
            not working time
          </div>
        )
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(WorkingTimeContainer)
