import React, { Component } from 'react';
import { connect } from 'react-redux';
class BookDetail extends Component {
  render(){
    if(!this.props.book){
      return (
        <div>
          Click to book
        </div>
      )
    }

    return (
      <div>
        hey
        <br/>
        {this.props.book.title}
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log(state);
  return {
    book: state.activeBook
  }
}
export default connect(mapStateToProps)(BookDetail)
