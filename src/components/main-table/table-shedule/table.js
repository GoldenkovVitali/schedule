import React from 'react';
import './table.css';
import { Table, Button } from 'antd';
import 'antd/dist/antd.css';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';

class Tables extends React.Component {
  // pdfExportComponent;
  // grid;

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
    const { dataShedule, columns, TableControls, MentorToggleButton, toggleTaskPage } = this.props;

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
          <button
            className="k-button"
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
                  toggleTaskPage(record);
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
