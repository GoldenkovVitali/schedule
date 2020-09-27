import React, { Component } from 'react';
import { Input, Checkbox, Typography } from 'antd';

import 'antd/dist/antd.css';
import './link.css';

export default class Link extends Component {
  state = {
    checked: false,
    descriptionUrlTitle: '',
    descriptionUrl: '',
  }
  
  componentDidMount() {
    const { data, name: { link, linkTitle } } = this.props;
    this.setState({ 
      checked: !!data[link],
      descriptionUrlTitle: data[linkTitle] ,
      descriptionUrl: data[link],
    })
  }

  onChangeCheckbox = (event) => {
    const { name, changeData } = this.props;
    const { descriptionUrl, descriptionUrlTitle } = this.state;

    const isChecked = event.target.checked;

    if (!isChecked) {
      changeData(name.link, '');
      changeData(name.linkTitle, '');
    } else {
      changeData(name.link, descriptionUrl);
      changeData(name.linkTitle, descriptionUrlTitle);
    }

    this.setState({ checked: isChecked });    
  }

  handleChangeInput = (event) => {
    const inputValue = event.target.value;
    const dataAttr = event.target.dataset.name;

    this.props.handleChangeInput(event);

    this.setState((state) => state[dataAttr] = inputValue);
  }

  render() {
    const { Link } = Typography;
    const { isEdited, name: { link, linkTitle }, data } = this.props;
    const { checked, descriptionUrl, descriptionUrlTitle } = this.state;

    if (!isEdited && !checked) {
      return null;
    }

    return (
      <div className='link-block'>      
        { isEdited ? 
        <Checkbox 
          className='link-block__checkbox' 
          onChange={this.onChangeCheckbox}
          checked={checked}
        /> : null }

        <div className='link-block__content'>
          <Input 
            className={isEdited ? 'link-block__label_edited' : 'link-block__label' }
            placeholder='Add link title...'          
            value={descriptionUrlTitle}
            data-name={linkTitle}
            readOnly={isEdited ? false : true}
            disabled={!checked}
            bordered={isEdited ? true : false}
            onChange={this.handleChangeInput}
          />
          { isEdited ?
          <Input 
            className='link-block__link-input' 
            placeholder='Add URL...'
            value={descriptionUrl}
            data-name={link}
            disabled={!checked}
            onChange={this.handleChangeInput}
          /> : 
          <p className='link-block__link-wrap'>
            <Link 
              className='link-block__link'
              href={data[link]}
              target="_blank"
            >{data[link]}</Link>   
          </p>
          }            
        </div>               
      </div>
    )
  }
}
