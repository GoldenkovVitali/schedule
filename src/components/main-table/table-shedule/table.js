import React from 'react';
import './table.css';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';

// import { FixedSizeList } from 'react-window';
import { Table } from 'ant-table-extensions';

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      editing: false, // редактирование можно или нет, это вторая часть таска для менторов
      isShowDivTask: false,
    };
  }

  exportPDFWithComponent = () => {
    this.pdfExportComponent.save();
  };

  render() {
    // константы. которые будут входить!
    //const { dataShedule, columns, colorFontPicker, colorBgPicker  } = this.props;
    const { dataShedule, columns, TableControls, MentorToggleButton, openTaskPage, updateTable } = this.props;

    return (
      <>
        <div className="buttons">
          <Button
            onClick={this.props.addRow}
            type="primary"
            style={{ marginBottom: 16, marginLeft: 16 }}
          >
            Add a row
          </Button>

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
            Скрыть выделенные ячейки
          </Button>

          <Button
            onClick={() => this.props.showSelectedRows()}
            type="primary"
            style={{ marginBottom: 16, marginLeft: 16 }}
          >
            Показать выделенные ячейки
          </Button>
          <Button
            onClick={() => this.props.showSelectedRows()}
            type="primary"
            style={{ marginBottom: 16, marginLeft: 16 }}
          >
            <a
              href="https://www.youtube.com/channel/UC578nebW2Mn-mNgjEArGZug"
              target="_blank"
            >
              RSS YouTube chanel
            </a>
          </Button>
          <button
            className="k-button"
            type="primary"
            style={{ marginBottom: 16, marginLeft: 16 }}
            onClick={this.exportPDFWithComponent}
          >
            Save table as PDF
          </button>
          {TableControls}
          {MentorToggleButton}
        </div>

        <PDFExport
          ref={component => (this.pdfExportComponent = component)}
          paperSize="A4"
          scale={0.5}
        >
          <Table
            searchable
            exportableProps={{
              showColumnPicker: true,
              btnProps: {
                type: 'primary',
                children: <span>Export to CSV</span>,
              },
            }}
            rowClassName={(record, index) =>
              record.key === this.state.selectedKey ||
              this.state.selectedRowKeys.includes(record.key)
                ? 'table-row-dark'
                : 'table-row-light'
            }
            pagination={{ pageSize: 50 }} // количество строк на странице минимальное
            dataSource={dataShedule}
            columns={columns}
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
          />
        </PDFExport>
      </>
    );
  }
}

export default Tables;
