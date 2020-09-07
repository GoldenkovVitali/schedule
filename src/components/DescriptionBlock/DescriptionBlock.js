import React, { Component } from 'react';
import { Input, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import './descriptionBlock.css';


export default class DescriptionBlock extends Component {
  state = {
    checked: false,
  }

  onChange = (event) => {
    const isChecked = event.target.checked;

    this.setState({
      checked: isChecked,
    })
  }

  render() {
    const { TextArea } = Input;
    const { isEdited } = this.props;
    const { checked } = this.state;

    if (!isEdited && !checked) {
      return null;
    }

    return (
      <div className='description-block'>
        { isEdited ? 
        <Checkbox 
          className='description-block__checkbox' 
          onChange={this.onChange}
          checked={checked}
        /> : null }
        <TextArea
          className='description-block__textarea'
          defaultValue='Write description...' 
          autoSize={{ minRows: 3, }}
          disabled={!checked}
          readOnly={isEdited ? false : true}
        />
      </div>
    )
  }
}      
