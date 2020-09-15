import React from 'react';
import { Radio } from 'antd';


const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
];

class AccesebilityButton extends React.Component {
  state = {
    value4: 'Apple',
  };


  onChange4 = e => {
    console.log('radio4 checked', e.target.value);
    this.setState({
      value4: e.target.value,
    });
  };

  render() {
    const { value4 } = this.state;
    return (
      <>
        <Radio.Group
          onChange={this.onChange4}
          value={value4}
          optionType="button"
          buttonStyle="solid"
        />
      </>
    );
  }
}

export default AccesebilityButton;
