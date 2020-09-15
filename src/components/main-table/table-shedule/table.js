import React from 'react';
import './table.css';
import { Table, Tag, Space, Button } from 'antd';
import 'antd/dist/antd.css';
import TableControls from "../../TableControls";

class Tables extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    editing: false, // редактирование можно или нет, это вторая часть таска для менторов
  };

  onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    // константы. которые будут входить!
    const { dataShedule, columns, colorFontPicker, colorBgPicker  } = this.props;


    //  Цвет, заливка, шрифт
    const color = 'green';
    const bgColor = 'none';
    const fontSize = '14px';

    let styles = {
      color: colorFontPicker,
      backgroundColor: colorBgPicker,
      fontSize: fontSize,
    };

    // Выделение
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        {
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
console.log('columns', columns)
    return (
      <>
        <div> ITS a Table. GOOOO!! </div>
        <Button
          onClick={this.props.addRow}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Add a row
        </Button>
        <Button
          onClick={this.props.addColumn}
          type="primary"
          style={{ marginBottom: 16, marginLeft: 16 }}
        >
          Add a column
        </Button>

        <Button
          onClick={() =>
            this.props.hideSelectedRows(this.state.selectedRowKeys)
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
        <Table
          rowSelection={rowSelection} // выделение
          pagination={{ pageSize: 50 }} // количество строк на странице минимальное
          dataSource={dataShedule}
          columns={columns}
        />
      </>
    );
  }
}

export default Tables;
