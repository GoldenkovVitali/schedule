import React, { Component } from 'react';
import Service from '../../service/Service';
import './main-table.css';
import {Col, Row, Tag} from 'antd';
import Tables from './table-shedule/table';
import TableControls from '../TableControls';
import Select from 'react-select';
import MentorToggleButton from '../MentorToggle';
import TableView from "../TableView";
import helpers from "../../helpers/helpers";

const options = [
  { value: 'Europe/London', label: 'Europe/London' },
  { value: 'Europe/Warsaw', label: 'Europe/Warsaw' },
  { value: 'Europe/Kiev', label: 'Europe/Kiev' },
  { value: 'Europe/Minsk', label: 'Europe/Minsk' },
  { value: 'Europe/Moscow', label: 'Europe/Moscow' },
  { value: 'Europe/Volgograd', label: 'Europe/Volgograd' },
  { value: 'Europe/Yekaterinburg', label: 'Europe/Yekaterinburg' },
  { value: 'Asia/Tashkent', label: 'Asia/Tashkent' },
  { value: 'Asia/Tbilisi', label: 'Asia/Tbilisi' },
];

const MyComponent = () => <Select options={options} />;

class MainTable extends Component {
  state = {
    data: null,
    columns: [
      {
        title: 'Date',
        dataIndex: 'dateTime',
        key: 'date',
        editable: true,
      },
      {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        editable: true,
      },
      {
        title: 'Place',
        dataIndex: 'place',
        key: 'place',
        editable: true,
      },
      {
        title: 'Tags',
        dataIndex: 'type',
        key: 'type',
        editable: true,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        editable: true,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        editable: true,
      },
      {
        title: 'BroadcastUrl',
        dataIndex: 'descriptionUrl',
        key: 'descriptionUrl',
        editable: true,
      },
      {
        title: 'Comment',
        dataIndex: 'comment',
        key: 'comment',
        editable: true,
      },
    ],
    lastRowIndex: null,
    fontSize: 14,
    rowCount: 10,
    colorBgPicker: { r: '250', g: '250', b: '250', a: '1' },
    colorFontPicker: { r: '241', g: '112', b: '19', a: '1' },
    styles: {
      color: 'green',
      backgroundColor: 'yellow',
      fontSize: '14px',
    },
    hiddenKeys: [],
    initColumns: [
      {
        title: 'Date',
        dataIndex: 'dateTime',
        key: 'date',
        editable: true,
      },
      {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        editable: true,
      },
      {
        title: 'Place',
        dataIndex: 'place',
        key: 'place',
        editable: true,
      },
      {
        title: 'Tags',
        dataIndex: 'type',
        key: 'type',
        editable: true,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        editable: true,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        editable: true,
      },
      {
        title: 'BroadcastUrl',
        dataIndex: 'descriptionUrl',
        key: 'descriptionUrl',
        editable: true,
      },
      {
        title: 'Comment',
        dataIndex: 'comment',
        key: 'comment',
        editable: true,
      },
    ],
    selectedRowKeys: [],
    isAccessible: 'Выкл',
    isMentor: 'Ментор',
  };

  service = new Service();

  getColor = type => {
    if (type === 'font') {
      return `rgba(
        ${this.state.colorFontPicker.r}, 
        ${this.state.colorFontPicker.g}, 
        ${this.state.colorFontPicker.b},
        ${this.state.colorFontPicker.a})`;
    }
    return `rgba(
    ${this.state.colorBgPicker.r}, 
    ${this.state.colorBgPicker.g}, 
    ${this.state.colorBgPicker.b}, 
    ${this.state.colorBgPicker.a})`;
  };

  onHandleAccessible = value => {
    if (value === 'Вкл') {
      this.setState({
        styles: {
          color: `rgba(250, 250, 250, 1)`,
          backgroundColor: `rgb(0, 0, 0)`,
          fontSize: `24px`,
        },
        isAccessible: value,
      });
    } else {
      this.setState({
        styles: {
          color: this.getColor('font'),
          backgroundColor: this.getColor(),
          fontSize: `${this.state.fontSize}px`,
        },
        isAccessible: value,
      });
    }
  };

  onHandleMentor = value => {
    if (value === 'Ментор') {
      this.setState({
        isMentor: 'Ментор',
      });
    } else {
      this.setState({
        isMentor: 'Студент',
      });
    }
  };

  onFontSizeChange = value => {
    const size =
      value === 'less' ? this.state.fontSize - 1 : this.state.fontSize + 1;

    this.setState({
      styles: {
        color: this.getColor('font'),
        backgroundColor: this.getColor(),
        fontSize: `${size}px`,
      },
      fontSize: size,
      isAccessible: 'Выкл',
    });
  };

  setRowCount = value => {
    this.setState({
      rowCount: value,
    });
  };

  setColorBgPicker = color => {
    this.setState({
      colorBgPicker: color,
      isAccessible: 'Выкл',
    });
  };

  setColorFontPicker = color => {
    this.setState({
      colorFontPicker: color,
      isAccessible: 'Выкл',
    });
  };

  setColoBgFontSize = () => {
    if (this.state.isAccessible === 'Выкл') {
      this.setState({
        styles: {
          color: this.getColor('font'),
          backgroundColor: this.getColor(),
          fontSize: `${this.state.fontSize}px`,
        },
      });
    } else {
      this.onHandleAccessible
    }
  };

  onHideColumns = hiddenColumns => {
    let unique = [...this.state.initColumns];
    hiddenColumns.forEach(key => {
      unique.forEach((item, i) => {
        if (item.key == key) {
          unique.splice(i, 1);
        }
      });
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
    res.sort((a, b) => a.key - b.key);
    const newColumns = this.state.columns.map(column => {
      return {...column, render: text => <div style={this.state.styles}>{text}</div>}
    });
    this.setState({
      data: res,
      lastRowIndex: +res[res.length - 1].key + 1,
      columns: [...newColumns],
    });

  };

  async componentDidMount() {
    this.updateTabel();
  }


  addRow = async () => {
    const { columns, lastRowIndex } = this.state;

    let result = columns.reduce(
      (acc, item) => {
        var key =
          Object.keys(item)[1] === 'dataIndex'
            ? Object.keys(item)[1]
            : Object.keys(item)[0];
        var value = item[key];
        acc[value] = '';
        return acc;
      },
      { key: lastRowIndex }
    );

    await this.service.postEvent(result);

    this.updateTabel();
  };

  hideSelectedRows = rows => {
    rows.forEach(() => {
      let dataSource = [...this.state.data];
      dataSource = dataSource.filter(item => !rows.includes(item.key));

      this.setState({
        data: dataSource,
      });
    });
  };

  showSelectedRows = () => {
    this.updateTabel();
  };

  render() {
    const { data, columns } = this.state;
    const { openTaskPage, onHandleView, tableView } = this.props;
    const newColumns = this.state.columns.map(column => {
      return {...column, render: text => <div style={this.state.styles}>{text}</div>}
    });
    return (
      <>
        <Row justify="end">
          <Col span={4} offset={1}>
            <MentorToggleButton onHandleMentor={this.onHandleMentor} isMentor={this.state.isMentor}/>
          </Col>
          <Col span={4} offset={1}>
            <TableView onHandleView={onHandleView} tableView={tableView}/>
          </Col>
        </Row>
        <MyComponent />
        <Tables
          columns={newColumns}
          dataShedule={data}
          addRow={this.addRow}
          hideSelectedRows={this.hideSelectedRows}
          showSelectedRows={this.showSelectedRows}
          pdfExportComponent={this.pdfExportComponent}
          isMentor={this.state.isMentor}
          openTaskPage={openTaskPage}
          updateTable={this.updateTabel}
          rowCount={this.state.rowCount}
          TableControls={
            <TableControls
              columns={newColumns}
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
              prevFontSize={this.state.fontSize}
              setColoBgFontSize={this.setColoBgFontSize}
              onHandleAccessible={this.onHandleAccessible}
              isAccessible={this.state.isAccessible}
            />
          }
        />
      </>
    );
  }
}

export default MainTable;
