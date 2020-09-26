import React from 'react';
import './table.css';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { PDFExport } from '@progress/kendo-react-pdf';

import EditableTable from './MentorTable';
import { Table } from 'ant-table-extensions';
import LocalStorageSettings from '../../../service/LocalStorageSettings';

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      editing: false, // редактирование можно или нет, это вторая часть таска для менторов
      isShowDivTask: false,
    };
  }

  localStorageSettings = new LocalStorageSettings();

  exportPDFWithComponent = () => {
    this.pdfExportComponent.save();
  };

  changeState = value => {
    this.setState({ selectedRowKeys: value });
  };

  render() {
    const {
      setDataFromMentorTable,
      dataShedule,
      columns,
      TableControls,
      openTaskPage,
      updateTable,
      rowCount,
    } = this.props;

    return (
      <>
        <div className="buttons">
          {TableControls}
          {this.props.isMentor === 'Ментор' ? (
            <Button
              onClick={this.props.addRow}
              type="primary"
              style={{ marginBottom: 16, marginLeft: 16 }}
            >
              Add row
            </Button>
          ) : null}

          {this.props.isMentor === 'Ментор' ? (
            <Button
              onClick={() =>
                this.props.hideSelectedRows([
                  ...this.state.selectedRowKeys,
                  this.state.selectedKey,
                ])
              }
              type="primary"
              style={{ marginBottom: 16, marginLeft: 16 }}
            >
              Hide selected rows
            </Button>
          ) : null}

          {this.props.isMentor === 'Ментор' ? (
            <Button
              onClick={() =>
                this.props.deleteSelectedRows([
                  ...this.state.selectedRowKeys,
                  this.state.selectedKey,
                ])
              }
              type="primary"
              style={{ marginBottom: 16, marginLeft: 16 }}
            >
              Delete selected rows
            </Button>
          ) : null}

          {this.props.isMentor === 'Ментор' ? (
            <Button
              onClick={() => this.props.showSelectedRows()}
              type="primary"
              style={{ marginBottom: 16, marginLeft: 16 }}
            >
              Show hidden rows
            </Button>
          ) : null}
          <Button type="primary" style={{ marginBottom: 16, marginLeft: 16 }}>
            <a
              href="https://www.youtube.com/channel/UC578nebW2Mn-mNgjEArGZug"
              target="_blank"
            >
              RSS YouTube channel
            </a>
          </Button>
          <Button
            type="primary"
            className="k-button"
            style={{ marginBottom: 16, marginLeft: 16 }}
            onClick={this.exportPDFWithComponent}
          >
            Save table as PDF
          </Button>
        </div>

        <PDFExport
          ref={component => (this.pdfExportComponent = component)}
          paperSize="A4"
          scale={0.5}
        >
          {this.props.isMentor === 'Студент' ? (
            <Table
              searchable
              exportable
              exportableProps={{
                showColumnPicker: true,
                btnProps: {
                  type: 'primary',
                  children: <span>Export to CSV</span>,
                  className: 'one',
                },
              }}
              rowClassName={(record, index) =>
                record.key === this.state.selectedKey ||
                this.state.selectedRowKeys.includes(record.key)
                  ? 'table-row-dark'
                  : 'table-row-light'
              }
              pagination={{ pageSize: rowCount }} // количество строк на странице минимальное
              dataSource={dataShedule}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    if (event.shiftKey) {
                      this.setState({
                        selectedRowKeys: [
                          ...this.state.selectedRowKeys,
                          record.key,
                        ],
                      });
                    } else {
                      this.setState({
                        selectedRowKeys: [],
                        selectedKey: record.key,
                      });
                    }
                    console.log(this.state);
                  },
                  onDoubleClick: () => {
                    openTaskPage(record, updateTable);
                  },
                };
              }}
              bordered
              rowClassName={(record, index) => {
                console.log(localStorage.getItem('taskTypes'));
                console.log(localStorage.getItem('taskTypeColors'));
                if (
                  record.key === this.state.selectedKey ||
                  this.state.selectedRowKeys.includes(record.key)
                ) {
                  return 'table-row-dark';
                }
                let taskTypeColors = this.localStorageSettings.getTaskTypeColors();
                const rowColor = taskTypeColors[record.type] || 'black';
                return rowColor;
                // if (
                //   record.type === 'lecture' ||
                //   record.type === 'lectureMixed' ||
                //   record.type === 'lectureSelfstudy' ||
                //   record.type === 'lectureOffline' ||
                //   record.type === 'lectureOnline'
                // ) {
                //   return 'blue';
                // } else if (
                //   record.type === 'interview' ||
                //   record.type === 'test' ||
                //   record.type === 'warmup'
                // ) {
                //   return 'custom';
                // } else if (
                //   record.type === 'codejam' ||
                //   record.type === 'codewars' ||
                //   record.type === 'htmltask' ||
                //   record.type === 'jstask'
                // ) {
                //   return 'green';
                // } else if (
                //   record.type === 'meetup' ||
                //   record.type === 'workshop'
                // ) {
                //   return 'custom2';
                // } else {
                //   return 'black';
                // }
              }}
              columns={columns}
            />
          ) : (
            <EditableTable
              dataShedule={dataShedule}
              columns={columns}
              openTaskPage={openTaskPage}
              updateTable={updateTable}
              rowCount={rowCount}
              changeState={this.changeState}
              setDataFromMentorTable={setDataFromMentorTable}
            />
          )}
        </PDFExport>
      </>
    );
  }
}

export default Tables;
