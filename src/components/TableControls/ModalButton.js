import React, {useState} from 'react';
import { Modal, Button } from 'antd';

const ModalButton = (props) => {
  const [visible, setVisible] = useState(false)
  const {children, onSaveSettings} = props;

  const showModal = () => {
    setVisible(true)
  };

  const handleOk = () => {
    setVisible(false)
    onSaveSettings()
  };

  const handleCancel = () => {
    setVisible(false)
  };

    return (
      <>
        <Button  style={{ marginBottom: 16, marginLeft: 16 }}  type="primary" onClick={showModal}>
          Table Settings
        </Button>
        <Modal okText="Save" cancelText="Cancel" title="Table Settings"  width='80%' visible={visible} onOk={handleOk} onCancel={handleCancel}>
          {children}
        </Modal>
      </>
    );
}

export default ModalButton;
