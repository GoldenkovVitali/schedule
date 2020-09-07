import React from 'react';
import './table.css';
import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';

class Tables extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    editing: false, // редактирование можно или нет, это вторая часть таска для менторов
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    // константы. которые будут входить!
    const { dataShedule } = this.props;

    //  Цвет, заливка, шрифт
    const color = 'green';
    const bgColor = 'none';
    const fontSize = '14px';

    let styles = {
      color: color,
      backgroundColor: bgColor,
      fontSize: fontSize,
    };

    let columns = [
      {
        title: 'Date',
        dataIndex: 'dateTime',
        key: 'dateTime',
        render: text => <div style={styles}>{text}</div>,
      },
      {
        title: 'Place',
        dataIndex: 'place',
        key: 'place',
        render: text => <div style={styles}>{text}</div>,
      },
      {
        title: 'Tags',
        key: 'type',
        dataIndex: 'type',
        render: text => <Tag color="blue">{text}</Tag>,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <div style={styles}>{text}</div>,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: text => <div style={styles}>{text}</div>,
      },
      {
        title: 'Broadcast Url',
        dataIndex: 'descriptionUrl',
        key: 'descriptionUrl',
        render: text => <a style={{ color: 'blue' }}>{text}</a>,
      },
      {
        title: 'Comment',
        dataIndex: 'comment',
        key: 'comment',
        render: text => <div style={styles}>{text}</div>,
      },
    ];

    // МОи предложения по фильтрации
    // let newCol = columns.filter((element, i) => {
    //   if (element.title !== 'Comment') {
    //     console.log(element.title);
    //     return element;
    //   }
    // });
    // console.log(newCol);

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

    return (
      <>
        <div> ITS a Table. GOOOO!! </div>
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
