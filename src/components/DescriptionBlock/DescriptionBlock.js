import React, { Component } from 'react';
import { Input, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import './descriptionBlock.css';


export default class DescriptionBlock extends Component {

  render() {
    const { TextArea } = Input;

    return (
      <div className='description-block'>
        <Checkbox className='description-block__checkbox' />
        <TextArea
          className='description-block__textarea'
          defaultValue='Write description...' 
          autoSize={{ minRows: 3, }}
        />
      </div>
    )
  }
}      
