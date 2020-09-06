import React, { Component } from 'react';
import { Input, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import './videoBlock.css';

export default class VideoBlock extends Component {
  render() {
    return (
      <div className='video-block'>
          <div className='video-block__edite-block'>         
            <Checkbox className='video-block__checkbox' />
            <Input value='Video url'/>
          </div>
          <iframe 
            className='video-block__video'
            src="https://www.youtube.com/embed/nsuV3R7pAmI" 
            frameBorder="0" 
            // allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
      </div>
    )
  }
}