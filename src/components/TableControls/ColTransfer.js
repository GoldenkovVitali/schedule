import React, {useState} from 'react';
import { Transfer } from 'antd';

const columns = [
  {
  title: 'Data',
  dataIndex: 'description',
  key: 'Data',
  },
  {
  title: 'Time',
  dataIndex: 'description',
  key: 'Time',
  },
  {
  title: 'One',
  dataIndex: 'description',
  key: 'One',
  },
  {
  title: 'Two',
  dataIndex: 'description',
  key: 'Two',
  },
];

const loc = { itemUnit: 'Колонка', itemsUnit: 'Колонки', notFoundContent: 'Список пуст', searchPlaceholder: 'Искать...' }


export default class ColTransfer extends React.Component {
  state = {
    columns: [],
    targetKeys: [],
  };

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = ['Time', 'Two'];
    this.setState({ columns, targetKeys });
  };

  filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };

  handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };

  render() {
    return (
      <Transfer
        dataSource={this.state.columns}
        showSearch
        filterOption={this.filterOption}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        onSearch={this.handleSearch}
        render={item => item.title}
        locale={loc}
      />
    );
  }
}
