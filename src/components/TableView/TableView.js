import React from 'react';
import { Radio } from 'antd';

const TableView = ({ onHandleView, tableView }) => {

  const onChange = (e) => {
    onHandleView(e.target.value)
  };

  const options = [
    { label: 'List', value: 'List' },
    { label: 'Table', value: 'Table' },
  ];

  return (
    <Radio.Group
      options={options}
      onChange={onChange}
      value={tableView}
      optionType="button"
      buttonStyle="solid"
      style={{ marginBottom: 16, marginLeft: 16 }}
    />
  );
}

export default TableView;
