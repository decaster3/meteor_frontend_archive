import React, { Component } from 'react';

export default class MeteorSelectionComponent extends Component {
  constructor(props){
    super(props)
  }
  render(){
    let p = this.props
    return (
      <div>
        <p>Метеоры: </p>
        <p>
          {p.choosenMeteors}
          <span>
            <input
              type="range"
              min="0" max="200"
              value={p.meteors}
              onInput={p.handleChangeMeteors}
              onChange={p.handleChangeMeteors}
              step="50"/>
          </span>
          {p.totalCart}
        </p>
      </div>
    )
	}
}
