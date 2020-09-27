import React from 'react';
import { Transfer } from 'antd';

const ColTransfer = ({initColumns, targetKeys, setTargetKeys}) => {

  const onChange = (newTargetKeys, direction, moveKeys) => {
    //console.log(newTargetKeys, direction, moveKeys);
    setTargetKeys(newTargetKeys);
  };

  const handleSearch = (dir, value) => {
    // console.log('search:', dir, value);
  };

  return (
    <Transfer
      dataSource={initColumns}
      showSearch
      operations={['hide', 'show']}
      targetKeys={targetKeys}
      onChange={onChange}
      onSearch={handleSearch}
      render={item => item.title}
    />
  );
}

export default  ColTransfer;
