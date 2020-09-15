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
    hiddenKeys:[],
    initColumns: [],
    fontSize: 14,
    rowCount: 10,
    colorBgPicker: { r: '241', g: '112', b: '19', a: '1',},
    colorFontPicker: { r: '241', g: '112', b: '19', a: '1',},
  };

  service = new Service();

  getColor = (type) => {
    if(type === 'font') {
      return `rgba(
        ${this.state.colorFontPicker.r }, 
        ${ this.state.colorFontPicker.g }, 
        ${ this.state.colorFontPicker.b },
        ${ this.state.colorFontPicker.a })`
    }
    return `rgba(
    ${ this.state.colorBgPicker.r }, 
    ${ this.state.colorBgPicker.g }, 
    ${ this.state.colorBgPicker.b }, 
    ${ this.state.colorBgPicker.a })`
  };

  onFontSizeChange = (size) => {
    this.setState({
      fontSize: size,
    });
   // this.updateTabel();
  };

  setRowCount = (value) => {
    this.setState({
      rowCount: value,
    });
  };

  setColorBgPicker = (color) => {
    this.setState({
      colorBgPicker: color,
    });
   // this.updateTabel();
  };

  setColorFontPicker = (color) => {
    this.setState({
      colorFontPicker: color,
    });
   // this.updateTabel();
  };


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
        const styles = {
          color: this.getColor('font'),
          backgroundColor: this.getColor(),
          fontSize: `${this.state.fontSize}px`,
        };
        arrayOfColumns.push({
          title: element.title,
          dataIndex: element.value,
          key: element.title,
          render: text => <div style={styles}>{text}</div>,
        });
      }
    });

    this.setState({
      data: res.map((item, i) => {
       const newData = {...item, key: i}
       return newData
      }),
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
    return (
      <>
        <div className="todo-app">WOWWWW</div>
        <TableControls
          columns={columns}
          initColumns={this.state.initColumns}
          hiddenKeys={this.state.hiddenKeys}
          onHideColumns={this.onHideColumns}
          onFontSizeChange={this.onFontSizeChange}
          setRowCount={this.setRowCount}
          rowCount={this.state.rowCount}
          setColorBgPicker={this.setColorBgPicker}
          colorBgPicker={this.state.colorBgPicker}
          setColorFontPicker={this.setColorFontPicker}
          colorFontPicker={this.state.colorFontPicker}
          prefFontSize={this.state.fontSize}
        />
        <Tables
          columns={columns}
          dataShedule={data}
          addRow={this.addRow}
          addColumn={this.addColumn}
          hideSelectedRows={this.hideSelectedRows}
          showSelectedRows={this.showSelectedRows}
          colorFontPicker={this.state.colorFontPicker}
          colorBgPicker={this.state.colorBgPicker}
        />
      </>
    );
  }
}

export default MainTable;
