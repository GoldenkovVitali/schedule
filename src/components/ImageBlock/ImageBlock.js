import React, { Component } from 'react';
import { Input, Checkbox, Image } from 'antd';
import noImage from '../../assets/images/no_img.jpg';

import 'antd/dist/antd.css';
import './imageBlock.css';

export default class ImageBlock extends Component {
  state = {
    url: this.props.data[this.props.name],
    checked: !!this.props.data[this.props.name],
  }

  onChangeCheckbox = (event) => {
    const { name, changeData } = this.props;
    const { url } = this.state;

    const isChecked = event.target.checked;

    if (!isChecked) {
      changeData(name, '');
    } else {
      changeData(name, url);
    }

    this.setState({ checked: isChecked })
  }

  handleChangeInput = (event) => {
    const inputValue = event.target.value;
    this.props.handleChangeInput(event);
    this.setState({ url: inputValue });
  }
  
  render() {
    const { isEdited, name, data, handleChangeInput } = this.props;
    const { checked, url } = this.state;

    if (!isEdited && !checked) {
      return null;
    }

    return (
      <div className='image-block'>        
        { isEdited ?
        <div className='image-block__edite-block'>            
          <Checkbox 
            className='image-block__checkbox'
            onChange={this.onChangeCheckbox}
            checked={checked}
          />
          <Input 
            placeholder='Add image url...'
            value={url}
            data-name={name}
            disabled={!checked}
            onChange={handleChangeInput}
          />
        </div> :
        <Image
          className='image-block__image'
          src={url}
          fallback={noImage} 
        /> }
      </div>
    )
  }
}