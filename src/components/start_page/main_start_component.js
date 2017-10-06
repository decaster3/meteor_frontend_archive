import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { pizza_fade_slider_init } from '../../assets/js/slider.js'
import * as firebase from 'firebase'
import Products from './start_page_products'

class MainStartPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      feacherView: null
    }
  }

  componentDidMount(){
    var feachers = []
    var feachersContainer = {}
    let feacherRef = firebase.database().ref().child('feachers')
    feacherRef.once('value', function(snapshot){
      feachers = snapshot.val()
    }).then(() => {
          feachersContainer = feachers.map((feacha, index) => {
          return (
              <div key = {index} className="col-12 row justify-content-center pizza-slider-item">
                <div className="col-lg-6 col-12 order-2 order-lg-1 align-self-center">
                  <div className="pizza-name">{feacha}</div>
                  <button className="button">ЗАКАЗАТЬ</button>
                </div>
                <div className="col-lg-5 col-10 order-1 order-lg-2 align-self-center">
                  <img src="assets/img/pizza.png" className="pizza-image" alt=""/>
                </div>
              </div>)
        })
        this.setState({
          feacherView: feachersContainer
        })
        pizza_fade_slider_init()
      })
  }

  render () {
    console.log(this.state.feacherView)

    if(this.state.feacherView != null){
      return (
        <div>
          <header id="header">
            <div className="header-wrapper container d-flex justify-content-center">
              <div className="col-12 align-self-center text-center pizza-fade-slider">
                {this.state.feacherView}
              </div>
            </div>
          </header>
          <Products/>
        </div>
      )
    }
    else {
      return( <div>Loading</div>)
    }
  }
}
export default MainStartPage
