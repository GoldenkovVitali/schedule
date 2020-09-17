import React, { Component } from 'react';
import { Input, Checkbox, Image } from 'antd';
import noImage from '../../assets/images/no_img.jpg';

import 'antd/dist/antd.css';
import './imageBlock.css';

export default class ImageBlock extends Component {
  state = {
    url: '',
  }

  componentWillMount() {
    const { data, name } = this.props;
    this.setState({ checked: !!data[name] })
  }

  onChangeCheckbox = (event) => {
    const isChecked = event.target.checked;
    this.setState({ checked: isChecked })
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
            defaultValue={data[name] || url}
            data-name={name}
            disabled={!checked}
            onChange={handleChangeInput}
          />
        </div> :
        <Image
          className='image-block__image'
          src={data[name] || url}
          fallback={noImage} 
        /> }
      </div>
    )
  }
}