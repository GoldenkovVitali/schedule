import React from 'react';
import { Radio } from 'antd';

const AccesebilityButton = ({isAccessible, onHandleAccessible }) => {

  const onChange = (e) => {
    onHandleAccessible(e.target.value)
  };

  const options = [
    { label: 'Вкл', value: 'Вкл' },
    { label: 'Выкл', value: 'Выкл' },
  ];

    return (
        <Radio.Group
          options={options}
          onChange={onChange}
          value={isAccessible}
          optionType="button"
          buttonStyle="solid"
        />
    );
}

export default AccesebilityButton;
