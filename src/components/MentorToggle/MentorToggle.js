import React from 'react';
import { Radio } from 'antd';

const MentorToggleButton = ({ onHandleMentor, isMentor }) => {

  const onChange = (e) => {
    onHandleMentor(e.target.value)
  };

  const options = [
    { label: 'Mentor', value: 'Ментор' },
    { label: 'Student', value: 'Студент' },
  ];

  return (
    <Radio.Group
      options={options}
      onChange={onChange}
      value={isMentor}
      optionType="button"
      buttonStyle="solid"
      style={{ marginBottom: 16, marginLeft: 16 }}
    />
  );
}

export default MentorToggleButton;
