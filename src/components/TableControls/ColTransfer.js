import React from 'react';
import { Transfer } from 'antd';

const loc = { itemUnit: 'Колонка', itemsUnit: 'Колонки', notFoundContent: 'Список пуст', searchPlaceholder: 'Искать...' }

const ColTransfer = ({initColumns, targetKeys, setTargetKeys}) => {

  const onChange = (newTargetKeys, direction, moveKeys) => {
    console.log(newTargetKeys, direction, moveKeys);
    setTargetKeys(newTargetKeys);
  };

  const handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };

  return (
    <Transfer
      dataSource={initColumns}
      showSearch
      operations={['скрыть', 'показать']}
      targetKeys={targetKeys}
      onChange={onChange}
      onSearch={handleSearch}
      render={item => item.title}
      locale={loc}
    />
  );
}

export default  ColTransfer;
