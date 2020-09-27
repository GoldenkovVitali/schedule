import React, { Component } from 'react';
import Service from '../../service/Service';
import './main-table.css';
import { Col, Row, Tag } from 'antd';
import Tables from './table-shedule/table';
import TableControls from '../TableControls';
import Select from 'react-select';
import MentorToggleButton from '../MentorToggle';
import TableView from '../TableView';
import helpers from '../../helpers/helpers';
import TaskFilter from '../TaskFilter';
import columnsData from './columnsData';
import LocalStorageSettings from '../../service/LocalStorageSettings';

class MainTable extends Component {
  state = {
    data: null,
    columns: columnsData,
    lastRowIndex: null,
    fontSize: 14,
    rowCount: 10,
    colorBgPicker: { r: '250', g: '250', b: '250', a: '0' },
    colorFontPicker: { r: '26', g: '26', b: '26', a: '1' },
    styles: {
      color: 'green',
      backgroundColor: 'yellow',
      fontSize: '14px',
    },
    hiddenKeys: [],
    initColumns: columnsData,
    selectedRowKeys: [],
    isAccessible: 'Выкл',
    isMentor: 'Ментор',

    deletedRows: [],

    sowTaskTypes: null,
    initialData: [],
  };

  service = new Service();
  localStorageSettings = new LocalStorageSettings();

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

  setDataFromMentorTable = dataValue => {
    this.setState({ data: dataValue });
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
      this.onHandleAccessible;
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
      return {
        ...column,
        render: text => <div style={this.state.styles}>{text}</div>,
      };
    });
    this.setState({
      data: res,
      lastRowIndex: +res[res.length - 1].key + 1,
      columns: [...newColumns],

      initialData: res,
    });
  };

  async componentDidMount() {
    this.updateTabel();
  }

  static getDerivedStateFromProps(props, state) {
    localStorage.setItem('currentState', JSON.stringify(state));
    return null;
  }

  setStateFromLocalStorage = () => {
    if (localStorage.getItem('currentState')) {
      const newState = JSON.parse(localStorage.getItem('currentState'));

      this.setState({
        ...this.state,
        fontSize: newState.fontSize,
        rowCount: newState.rowCount,
        colorBgPicker: newState.colorBgPicker,
        colorFontPicker: newState.colorFontPicker,
        styles: {
          color: newState.styles.color,
          backgroundColor: newState.styles.backgroundColor,
          fontSize: newState.styles.fontSize,
        },
        hiddenKeys: newState.hiddenKeys,
        selectedRowKeys: newState.selectedRowKeys,
        isAccessible: newState.isAccessible,
        isMentor: newState.isMentor,
      });
    }
  };

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

  deleteSelectedRows = rows => {
    let dataSource = [...this.state.data];

    rows.forEach(it => {
      let deletedRows = dataSource.filter(item => rows.includes(item.key));

      dataSource = dataSource.filter(item => !rows.includes(item.key));

      this.setState({
        data: dataSource,
        deletedRows: deletedRows,
      });
      deletedRows.forEach(async i => {
        await this.service.deleteEvent(i.id);
      });
    });
  };

  showSelectedRows = () => {
    this.updateTabel();
  };

  updateRow = row => {
    const { data } = this.state;
    const localData = JSON.parse(JSON.stringify(data));

    const rowIndex = localData.findIndex(event => event.id === row.id);
    localData.splice(rowIndex, 1, row);

    this.setState({ data: localData });
    this.service.updateEvent(row);
  };

  onHandleSowTaskTypes = values => {
    const newData = [];
    values.forEach(item => {
      this.state.initialData.forEach(row => {
        if (row.type.toLowerCase() == item.toLowerCase()) {
          newData.push(row);
        }
      });
    });

    this.setState({
      data: newData,
      sowTaskTypes: values,
    });
  };

  render() {
    const { data, columns } = this.state;
    const { openTaskPage, onHandleView, tableView } = this.props;
    const newColumns = this.state.columns.map(column => {
      return {
        ...column,
        render: text => <div style={this.state.styles}>{text}</div>,
      };
    });

    const taskTypes = Object.keys(this.localStorageSettings.getTaskTypes());
    const taskColors = this.localStorageSettings.getTaskTypeColors();

    const styles = taskTypes.map(type => {      
      let color = taskColors[type] || '#ffffff';

      if (color.length === 7) {
        color += '70';
      }

      return (
        <style key={type}>
          {`.${type} {
              background-color: ${color};
            }; \n`}
        </style>
      );
    });

    return (
      <>
        {styles}
        <Row justify="end">
          <Col span={4} offset={0}>
            <TableView onHandleView={onHandleView} tableView={tableView} />
          </Col>
          <Col span={16} offset={0}>
            {this.props.tableView === 'Table' ? (
              <TaskFilter
                onHandleSowTaskTypes={this.onHandleSowTaskTypes}
                initialData={this.state.initialData}
              />
            ) : null}
          </Col>
          <Col span={4} offset={0}>
            <MentorToggleButton
              onHandleMentor={this.onHandleMentor}
              isMentor={this.state.isMentor}
            />
          </Col>
        </Row>

        <Tables
          columns={newColumns}
          dataShedule={data}
          addRow={this.addRow}
          hideSelectedRows={this.hideSelectedRows}
          deleteSelectedRows={this.deleteSelectedRows}
          showSelectedRows={this.showSelectedRows}
          pdfExportComponent={this.pdfExportComponent}
          isMentor={this.state.isMentor}
          openTaskPage={openTaskPage}
          updateRow={this.updateRow}
          rowCount={this.state.rowCount}
          setDataFromMentorTable={this.setDataFromMentorTable}
          tableView={this.props.tableView}
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
