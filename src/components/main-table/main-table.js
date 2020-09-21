import React, { Component } from 'react';
import Service from '../../service/Service';
import './main-table.css';

import Tables from './table-shedule/table';
import TableControls from '../TableControls';
import Select from 'react-select';

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
    ifMentor: true,
  };

  service = new Service();

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

    this.setState({
      data: res,
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
        acc[value] = '';
        return acc;
      },
      { key: lastRowIndex }
    );

    await this.service.postEvent(result);

    this.updateTabel();
    this.forceUpdate();
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

  showSelectedRows = rows => {
    this.updateTabel();
  };

  render() {
    const { data, columns } = this.state;
    console.log(this.state);
    return (
      <>
        <div className="todo-app">WOWWWW</div>

        <MyComponent />
        <TableControls
          columns={columns}
          initColumns={this.state.initColumns}
          hiddenKeys={this.state.hiddenKeys}
          onHideColumns={this.onHideColumns}
        />
        <Tables
          columns={columns}
          dataShedule={data}
          addRow={this.addRow}
          hideSelectedRows={this.hideSelectedRows}
          showSelectedRows={this.showSelectedRows}
          pdfExportComponent={this.pdfExportComponent}
          ifMentor={this.state.ifMentor}
        />
      </>
    );
  }
}

export default MainTable;
