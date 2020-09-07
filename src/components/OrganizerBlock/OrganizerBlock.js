import React, { Component } from 'react';
import { Input, Checkbox } from 'antd';
import 'antd/dist/antd.css';
// import DescriptionBlock from '../DescriptionBlock/DescriptionBlock';
import './organizerBlock.css';


export default class OrganizerBlock extends Component { 
  state = {
    checked: false,
    inputValue: '',
    textareaValue: '',
  }

  onChangeCheckbox = (event) => {
    const isChecked = event.target.checked;
    this.setState({ checked: isChecked })
  }

  onChangeInput = (event) => {
    const inputValue =  event.target.value;
    console.log(inputValue)
    this.setState({ inputValue: inputValue })
  }

  onChangeTextarea = (event) => {
    const textareaValue =  event.target.value;
    this.setState({ textareaValue: textareaValue })
  }

  render() {
    const { TextArea } = Input;
    const { isEdited } = this.props;
    const { inputValue, textareaValue, checked } = this.state;

    if (!isEdited && !checked) {
      return null;
    }

    return (
      <div className='organizer-block'>               
          <Checkbox 
            className='organizer-block__checkbox'            
            onChange={this.onChangeCheckbox}
            checked={checked}
          />
          <div className='organizer-block__data'>  
            <Input 
              className='organizer-block__organizer' 
              placeholder='Write organizer...'
              defaultValue={inputValue}
              disabled={!checked}
              onChange={this.onChangeInput}
            />
            <TextArea
              className='organizer-block__description'
              placeholder='Write description...'
              defaultValue={textareaValue} 
              autoSize={{ minRows: 3, }}              
              disabled={!checked}
              onChange={this.onChangeTextarea}
            />
          </div>
      </div>
    )
  }
}