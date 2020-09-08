import React, { Component } from 'react';
import { Input, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import './descriptionBlock.css';


export default class DescriptionBlock extends Component {
  state = {
    checked: false,
    textareaValue: '',
  }

  onChangeCheckbox = (event) => {
    const isChecked = event.target.checked;

    this.setState({
      checked: isChecked,
    })
  }

  onChangeTextarea = (event) => {
    const textareaValue =  event.target.value;
    this.setState({ textareaValue: textareaValue })
  }

  render() {
    const { TextArea } = Input;
    const { isEdited } = this.props;
    const { checked, descriptionValue } = this.state;

    if (!isEdited && !checked) {
      return null;
    }

    return (
      <div className='description-block'>
        { isEdited ? 
        <Checkbox 
          className='description-block__checkbox' 
          onChange={this.onChangeCheckbox}
          checked={checked}
        /> : null }
        <TextArea
          className='description-block__textarea'
          placeholder='Write description...' 
          defaultValue={descriptionValue}
          autoSize={{ minRows: 3, }}
          disabled={!checked}
          readOnly={isEdited ? false : true}
          onChange={this.onChangeTextarea}
        />
      </div>
    )
  }
}      
