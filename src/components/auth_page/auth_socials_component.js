import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class AuthSocialsComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <div onClick={this.props.p.facebookSignin}>
          <div>
            <FontAwesome name="facebook" />
          </div>
          <div>
            Sign In with Facebook
          </div>
        </div>
        <div onClick={this.props.p.googleSignin}>
          <div>
            <FontAwesome name="google" />
          </div>
          <div>
            Sign In with Google
          </div>
        </div>
      </div>
    );
  }

}
