import React, { useState } from 'react';
import { Input, InputNumber, Popconfirm, Form } from 'antd';
import Service from '../../../service/Service';
import { Table } from 'ant-table-extensions';

const service = new Service();

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};


const EditableTable = ({ dataShedule, columns, openTaskPage, updateRow, rowCount }) => {
  if (dataShedule !== null) {
    const [form] = Form.useForm();
    const [data, setData] = useState(dataShedule);
    const [editingKey, setEditingKey] = useState('');
    const [selectedKey, setSelectedKey] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const isEditing = record => record.key === editingKey;

    const edit = record => {
      form.setFieldsValue({
        dateTime: '',
        time: '',
        place: '',
        ...record,
      });
      setEditingKey(record.key);
    };

    const cancel = () => {
      setEditingKey('');
    };

    const save = async key => {
      try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex(item => key === item.key);

        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          service.updateEvent({ ...item, ...row });
          setData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };

    columns = [
      ...columns,
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <a
                href="javascript:;"
                onClick={() => {
                  save(record.key);
                }}
                onSubmit={() => console.log(record)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </a>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </a>
          );
        },
      },
    ];

    const mergedColumns = columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });

    return (
      <Form form={form} component={false}>
        <Table
          searchable
          exportableProps={{
            showColumnPicker: true,
            btnProps: {
              type: 'primary',
              children: <span>Export to CSV</span>,
            },
          }}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
          rowClassName={(record, index) =>
            record.key === selectedKey ||
            selectedRowKeys.includes(record.key)
              ? 'table-row-dark'
              : 'table-row-light'
          }
          pagination={{ pageSize: rowCount }}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                if (event.shiftKey) {
                  setSelectedRowKeys(() => {
                    return [...selectedRowKeys, record.key]
                  })
                } else {
                  setSelectedRowKeys([])
                  setSelectedKey(record.key)
                }
              },
              onDoubleClick: () => {
                openTaskPage(record, updateRow);
                console.log('sadasdasd')
              },
            };
          }}
        />
      </Form>
    );
  } else {
    return <div>Loading</div>;
  }
};

export default EditableTable;
