import React, { Component } from 'react';
import Service from '../../service/Service';
import './app.css';

import { Table, Tag, Space, Button } from 'antd';
import Tables from '../table-shedule/table';
import { element } from 'prop-types';

export default class App extends Component {
  state = {
    data: null,
    columns: null,
    lastColumnIndex: null,
    lastRowIndex: null,
    styles: {
      color: 'red',
      backgroundColor: 'yellow',
      fontSize: '14px',
    },
  };

  service = new Service();

  updateTabel = async () => {
    const res = await this.service.getAllEvents();
    const res2 = await this.service.getAllOrganizers();
    res2.sort((a, b) => a.key - b.key);
    res.sort((a, b) => a.key - b.key);
    let arrayOfColumns = [];

    res2.forEach(element => {
      if (element.value === 'type') {
        arrayOfColumns.push({
          title: element.title,
          dataIndex: element.value,
          render: text => {
            let color;
            if (text === 'string') {
              color = 'volcano';
            } else {
              color = 'blue';
            }
            return <Tag color={color}>{text}</Tag>;
          },
        });
      } else {
        arrayOfColumns.push({
          title: element.title,
          dataIndex: element.value,
          render: text => <div style={this.state.styles}>{text}</div>,
        });
      }
    });

    this.setState({
      data: res,
      columns: [...arrayOfColumns],
      lastColumnIndex: +res2[res2.length - 1].key + 1,
      lastRowIndex: +res[res.length - 1].key + 1,
    });
  };

  async componentDidMount() {
    this.updateTabel();
  }

  addRow = async () => {
    const { columns, lastRowIndex } = this.state;

    console.log(columns);
    let result = columns.reduce(
      (acc, item) => {
        var key =
          Object.keys(item)[1] === 'dataIndex'
            ? Object.keys(item)[1]
            : Object.keys(item)[0];
        var value = item[key];
        acc[value] = 'no data';
        return acc;
      },
      { key: lastRowIndex }
    );

    await this.service.postEvent(result);

    this.updateTabel();
  };

  addColumn = async () => {
    const { data, lastColumnIndex } = this.state;
    const newColumn = {
      title: `Column ${lastColumnIndex}`,
      value: `Column ${lastColumnIndex}`,
      key: lastColumnIndex,
    };

    this.service.postOrganizer(newColumn);
    const newArray = data.map(element =>
      this.service.updateEvent({
        ...element,
        [`Column ${lastColumnIndex}`]: 'no data',
      })
    );
    await Promise.all(newArray);

    this.updateTabel();
  };

  hideSelectedRows = rows => {
    // const filteredArray = this.state.data.map(element => {
    //   for (let i = 0; i < rows.length; i++) {
    //     if (+element.key !== +rows[i]) {
    //       return element
    //     }
    //   }
    // })
    console.log(rows);
    rows.forEach(element => {
      const dataSource = [...this.state.data];
      this.setState({
        data: dataSource.filter(item => item.key !== element),
      });
    });
    // console.log(filteredArray);
    // this.setState({
    //   data: filteredArray,
    // });
    // console.log(filteredArray);
  };

  render() {
    const { data, columns } = this.state;
    console.log(this.state);
    return (
      <>
        <div className="todo-app">WOWWWW</div>
        <Tables
          columns={columns}
          dataShedule={data}
          addRow={this.addRow}
          addColumn={this.addColumn}
          hideSelectedRows={this.hideSelectedRows}
        />
      </>
    );
  }
}
