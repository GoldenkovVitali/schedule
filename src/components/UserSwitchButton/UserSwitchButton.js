import React, { Component } from 'react';
import { Button } from 'antd';
import './userSwitchButton.css';

export default class UserSwitchButton extends Component {
  state = {
    user: '',
  }

  componentDidMount() {
    if (!localStorage.user) {
      localStorage.user = this.state.user;
    }

    this.setState({ user: localStorage.user });
  }

  changeUser = () => {
    const currentUser = localStorage.user;

    if (currentUser === 'mentor') {
      localStorage.user = 'student';
    } else {
      localStorage.user = 'mentor';
    }
    
    this.setState({ user: localStorage.user })
  }

  render() {
    const { user } = this.state;
    return (
      <Button 
        type='dashed' 
        size='large'
        className='user-switch-btn'
        onClick={this.changeUser}
      >
        {user}
      </Button>
    )
  }
}