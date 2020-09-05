import React from 'react';
import './table.css';
import { Table, Tag, Space } from "antd";
import 'antd/dist/antd.css';




class Tables extends React.Component {
  render() {
    const {dataShedule} = this.props;

    const columns = [
      {
        title: 'Date',
        dataIndex: 'dateTime',
        key: 'dateTime',
         },

    {
      title: 'Place',
        dataIndex: 'place',
      key: 'place',
    },
      {
        title: 'Tags',
        key: 'type',
        dataIndex: 'type',
        render: text => <Tag color="blue" >{text}</Tag>
  },
    {
      title: 'Name',
        dataIndex: 'name',
      key: 'name',

    },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Broadcast Url',
        dataIndex: 'descriptionUrl',
        key: 'descriptionUrl',
        render: text => <a className='urlshref' color="blue">{text}</a>
      },
      {
        title: 'Comment',
        dataIndex: 'comment',
        key: 'comment',
      },


  ];

    let styleOne = {
      color: 'red',
    }

    const divStyle = {
      color: 'blue',
    };


    return (
      <>
      <div style={divStyle}> ITS a Table. GOOOO!! </div>
    <Table   dataSource={dataShedule} columns={columns} >

      </Table>
      </>
  )
  }
}

export default Tables;
