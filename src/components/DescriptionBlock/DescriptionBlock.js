import React, { Component } from 'react';
import { Input, Checkbox } from 'antd';

import 'antd/dist/antd.css';
import './descriptionBlock.css';


export default class DescriptionBlock extends Component {
  state ={
    checked: !!this.props.data[this.props.name],
    textareaValue: this.props.data[this.props.name],
  }

  onChangeCheckbox = (event) => {
    const { name, changeData } = this.props;
    const { textareaValue } = this.state;

    const isChecked = event.target.checked;

    if (!isChecked) {
      changeData(name, '');
    } else {
      changeData(name, textareaValue);
    }

    this.setState({ checked: isChecked });    
  }

  handleChangeTextarea = (event) => {
    const textareaValue = event.target.value;
    this.props.handleChangeInput(event);
    this.setState({ textareaValue: textareaValue });
  }

  render() {
    const { TextArea } = Input;
    const { isEdited, name, data } = this.props;
    const { checked, textareaValue } = this.state;

    if (!isEdited && !checked) {
      return null;
    }

    return (
      <div className='description-block'>
        {isEdited ? 
          <Checkbox 
            className='description-block__checkbox' 
            onChange={this.onChangeCheckbox}
            checked={checked}
          /> : null 
        }
        <TextArea
          className={isEdited ? 'description-block__textarea-edited' : 'description-block__textarea'}
          placeholder='Write description...' 
          defaultValue={textareaValue}
          value={checked ? data[name] : textareaValue}
          autoSize={{ minRows: 3, }}
          disabled={!checked}
          readOnly={isEdited ? false : true}
          data-name={name}
          onChange={this.handleChangeTextarea}
          bordered={isEdited ? true : false}
        />
      </div>
    )
  }
}      
