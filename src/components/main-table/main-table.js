import React, { Component } from 'react';
import Service from '../../service/Service';
import './main-table.css';

import { Tag } from 'antd';
import Tables from './table-shedule/table';
import TableControls from "../TableControls";

class MainTable extends Component {
  state = {
    data: null,
    columns: null,
    lastColumnIndex: null,
    lastRowIndex: null,
    styles: {
      color: 'green',
      backgroundColor: 'yellow',
      fontSize: '14px',
    },
    hiddenKeys:[],
    initColumns: [],
  };

  service = new Service();

  onHideColumns = (hiddenColumns) => {
    let unique = [...this.state.initColumns];
    hiddenColumns.forEach((key) => {
      unique.forEach((item, i) => {
        if (item.key == key) {
          unique.splice(i,1)
        }
      })
    });
    this.setState({
      data: this.state.data,
      columns: [...unique],
      lastColumnIndex: this.state.lastColumnIndex,
      lastRowIndex: this.state.lastRowIndex,
      hiddenKeys: hiddenColumns,
    });
  };

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
          key: element.title,
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
          key: element.title,
          render: text => <div style={this.state.styles}>{text}</div>,
        });
      }
    });

    this.setState({
      data: res,
      columns: [...arrayOfColumns],
      lastColumnIndex: +res2[res2.length - 1].key + 1,
      lastRowIndex: +res[res.length - 1].key + 1,
      initColumns: [...arrayOfColumns]
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
    rows.forEach(element => {
      let dataSource = [...this.state.data];
      dataSource = dataSource.filter(item => !rows.includes(item.key));

      this.setState({
        data: dataSource,
      });
    });
  };

  showSelectedRows = rows => {
    this.updateTabel();
  };

  render() {
    const { data, columns } = this.state;
    console.log(this.state);
    return (
      <>
        <div className="todo-app">WOWWWW</div>
        <TableControls columns={columns} initColumns={this.state.initColumns} hiddenKeys={this.state.hiddenKeys} onHideColumns={this.onHideColumns}/>
        <Tables
          columns={columns}
          dataShedule={data}
          addRow={this.addRow}
          addColumn={this.addColumn}
          hideSelectedRows={this.hideSelectedRows}
          showSelectedRows={this.showSelectedRows}
        />
      </>
    );
  }
}

export default MainTable;
