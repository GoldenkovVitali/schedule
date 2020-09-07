import React, { Component } from 'react';
import { Input, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import './videoBlock.css';

export default class VideoBlock extends Component {
  state = {
    checked: false,
    url: '',
  }

  onChangeCheckbox = (event) => {
    const isChecked = event.target.checked;
    this.setState({ checked: isChecked })
  }

  onChangeInput = (event) => {
    const inputValue =  event.target.value;
    this.setState({ url: inputValue })
  }

  render() {
    const { isEdited } = this.props;    
    const { checked, url } = this.state;

    if (!isEdited && !checked) {
      return null;
    }

    return (
      <div className='video-block'>
          { isEdited ?
          <div className='video-block__edite-block'>         
            <Checkbox 
              className='video-block__checkbox'  
              onChange={this.onChangeCheckbox}            
              checked={checked}
            />
            <Input 
              placeholder='Add video url...'
              defaultValue={url}
              disabled={!checked}
              onChange={this.onChangeInput}
            />
          </div> :
          <iframe 
            className='video-block__video'
            src={url}
            frameBorder="0" 
            // allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          /> }
      </div>
    )
  }
}