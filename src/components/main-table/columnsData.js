import { Col, Row, Tag } from 'antd';

const columnsData = [
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: 'Start Time',
    dataIndex: 'startTime',
    key: 'startTime',
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
    title: 'Description Url',
    dataIndex: 'descriptionUrl',
    key: 'descriptionUrl',
    editable: true,
    render: text => <a>{text}</a>,
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    key: 'deadline',
    editable: true,
  },
];

export default columnsData;
