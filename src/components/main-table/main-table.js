import React, { Component } from 'react';
import Service from '../../service/Service';
import './main-table.css';
import { Tag } from 'antd';
import Tables from './table-shedule/table';
import TableControls from '../TableControls';
import Select from 'react-select';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import MentorToggleButton from "../MentorToggle";

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
    columns: null,
    lastColumnIndex: null,
    lastRowIndex: null,
    hiddenKeys:[],
    initColumns: [],
    fontSize: 14,
    rowCount: 10,
    colorBgPicker: { r: '250', g: '250', b: '250', a: '1',},
    colorFontPicker: { r: '241', g: '112', b: '19', a: '1',},
    styles: {
      color: 'green',
      backgroundColor: 'yellow',
      fontSize: '14px',
    },
    selectedRowKeys: [],
    isAccessible: 'Выкл',
    isMentor: 'Ментор',
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

  onHandleAccessible = (value) => {
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

  onHandleMentor = (value) => {
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

  onFontSizeChange = (value) => {
    console.log('size', value, this.state.fontSize)
    const size = value === 'less' ? this.state.fontSize -1 : this.state.fontSize + 1

    this.setState({
      styles: {
        color: this.getColor('font'),
        backgroundColor: this.getColor(),
        fontSize: `${size}px`,
      },
      fontSize: size,
      isAccessible: 'Выкл',
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
      isAccessible: 'Выкл',
    });
  };

  setColorFontPicker = (color) => {
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
        }
      });
    } else {
      this.onHandleAccessible('Вкл')
    }

  }

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
            if (
              text === 'lecture' ||
              text === 'lectureMixed' ||
              text === 'lectureSelfstudy' ||
              text === 'lectureOffline' ||
              text === 'lectureOnline'
            ) {
              color = 'blue';
            } else if (
              text === 'interview' ||
              text === 'test' ||
              text === 'warmup'
            ) {
              color = '#63ab91';
            } else if (
              text === 'codejam' ||
              text === 'codewars' ||
              text === 'htmltask' ||
              text === 'jstask'
            ) {
              color = 'green';
            } else if (
              text === 'test' ||
              text === 'codewars' ||
              text === 'htmltask'
            ) {
              color = 'green';
            } else if (text === 'meetup' || text === 'workshop') {
              color = '#bde04a';
            } else {
              color = 'black';
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
      initColumns: [...arrayOfColumns],
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

  // exportPDFWithComponent = () => {
  //   this.pdfExportComponent.save();
  // };

  render() {
    const { data, columns } = this.state;
    const { toggleTaskPage } = this.props;
    console.log(this.state);
    return (
      <>
        <div className="todo-app">WOWWWW</div>
        <MyComponent />
        <Tables
          columns={columns}
          dataShedule={data}
          addRow={this.addRow}
          hideSelectedRows={this.hideSelectedRows}
          showSelectedRows={this.showSelectedRows}
          pdfExportComponent={this.pdfExportComponent}
<<<<<<< HEAD
          toggleTaskPage={toggleTaskPage}
=======

          TableControls={<TableControls
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
            prevFontSize={this.state.fontSize}
            setColoBgFontSize={this.setColoBgFontSize}
            onHandleAccessible={this.onHandleAccessible}
            isAccessible={this.state.isAccessible}
          />}
          MentorToggleButton={<MentorToggleButton
            onHandleMentor={this.onHandleMentor} isMentor={this.state.isMentor}/>}
>>>>>>> develop
        />
      </>
    );
  }
}

export default MainTable;
