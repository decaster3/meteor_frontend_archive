import React, { Component } from 'react'
import { connect } from 'react-redux'

class MainHistoryContainer extends Component {

  constructor(props){
    super(props);
  }
  render(){
    let s = this.state
    let p = this.props
    let user = p.user
    return(
      <div>
        history
      </div>
    )

  }
}

function mapStateToProps(state){
  return{
    user: state.user
  }
}


export default connect(mapStateToProps)(MainHistoryContainer)
