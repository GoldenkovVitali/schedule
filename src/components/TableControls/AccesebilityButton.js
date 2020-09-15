import React from 'react';
import { Radio } from 'antd';

const optionsWithDisabled = [
  { label: 'Вкл', value: 'Вкл' },
  { label: 'Выкл', value: 'Выкл' },
];

class AccesebilityButton extends React.Component {
  state = {
    value4: 'Вкл',
  };

  onChange = e => {
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
          options={optionsWithDisabled}
          onChange={this.onChange}
          value={value4}
          optionType="button"
          buttonStyle="solid"
        />
      </>
    );
  }
}

export default AccesebilityButton;
