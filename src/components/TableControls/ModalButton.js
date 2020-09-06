import React, {useState} from 'react';
import { Modal, Button } from 'antd';

const ModalButton = (props) => {
  const [visible, setVisible] = useState(false)
  const {children} = props;

  const showModal = () => {
    setVisible(true)
  };

  const handleOk = e => {
    console.log(e);
    setVisible(false)
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false)
  };

    return (
      <>
        <Button type="primary" onClick={showModal}>
          Настройки таблицы
        </Button>
        <Modal okText="Сохранить" cancelText="Отменить" title="Настройки таблицы"  width='80%' visible={visible} onOk={handleOk} onCancel={handleCancel}>
          {children}
        </Modal>
      </>
    );
}

export default ModalButton;
