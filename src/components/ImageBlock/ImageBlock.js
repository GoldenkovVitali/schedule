import React, { Component } from 'react';
import { Input, Checkbox, Image } from 'antd';
import 'antd/dist/antd.css';
import './imageBlock.css';

export default class ImageBlock extends Component {
  render() {
    return (
      <div className='image-block'>
        <div className='image-block__edite-block'>            
          <Checkbox className='image-block__checkbox' />
          <Input value='Image url'/>
        </div>
        <Image
          className='image-block__image'
          src="error"
          fallback=""
        />
      </div>
    )
  }
}