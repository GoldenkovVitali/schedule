import React, { Component } from 'react';
import { Button } from 'antd';

import './button.css';

export default class UserSwitchButton extends Component {

  render() {
    const { 
      type, 
      size, 
      shape, 
      btnClassName, 
      btnWrapperClassName,
      onClick,
      text, 
      icon, 
      ghost, 
      danger, 
      title,
      loading,
      onMouseEnter,
      onMouseLeave,
      onFocus,
    } = this.props;
    
    return (
      <div className={btnWrapperClassName}>
        <Button 
          type={type}
          title={title} 
          size={size}
          shape={shape}
          icon={icon}
          ghost={ghost}
          danger={danger}
          className={btnClassName}
          onClick={onClick}
          loading={loading}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
        >
          {text}
        </Button>
      </div>
    )
  }
}