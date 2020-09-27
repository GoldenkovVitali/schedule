import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css'
import {Row, Col, Typography} from 'antd';
import ModalButton from "./ModalButton";
import ColTransfer from "./ColTransfer";
import ControlPanel from "./ControlPanel";
import { SettingOutlined } from '@ant-design/icons';

const { Title } = Typography;

const TableControls = (props) => {
  const [col, setColumns] = useState([props.initColumns || []]);
  const [targetKeys, setTargetKeys] = useState(['Date']);
  const [fontSize, setFontSize] = useState(14);
  const [displayBgPicker, setDisplayBgPicker] = useState(false);
  const [displayFontPicker, setDisplayFontPicker] = useState(false);

  const {
    onHideColumns,
    initColumns,
    setColorFontPicker,
    colorFontPicker,
    setColorBgPicker,
    colorBgPicker,
    setRowCount,
    onFontSizeChange,
    prevFontSize,
    setColoBgFontSize,
    onHandleAccessible,
    isAccessible,
    rowCount } = props;

  useEffect(() => {
    if (initColumns) {
      setColumns(props.initColumns);
    }
    onFontSizeChange(fontSize)
  }, [initColumns]);

  const onSaveSettings = () => {
    onHideColumns(targetKeys);
    setColoBgFontSize();
  };

  return (
        <ModalButton onSaveSettings={onSaveSettings} icon={<SettingOutlined />}>
          <Row>
            <Col span={12}>
              <Title level={5}>Show/Hide columns:</Title>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 18 }} lg={{ span: 12, offset: 1 }}>
               <ColTransfer initColumns={col} targetKeys={targetKeys} setTargetKeys={setTargetKeys} />
            </Col>
            <Col xs={{ span: 18}} lg={{ span: 8, offset: 1 }}>
               <ControlPanel
                 rowCount={rowCount}
                 setRowCount={setRowCount}
                 displayBgPicker={displayBgPicker}
                 setDisplayBgPicker={setDisplayBgPicker}
                 colorBgPicker={colorBgPicker}
                 setColorBgPicker={setColorBgPicker}
                 displayFontPicker={displayFontPicker}
                 setDisplayFontPicker={setDisplayFontPicker}
                 colorFontPicker={colorFontPicker}
                 setColorFontPicker={setColorFontPicker}
                 onFontSizeChange={onFontSizeChange}
                 prevFontSize={prevFontSize}
                 onHandleAccessible={onHandleAccessible}
                 isAccessible={isAccessible}
               />
            </Col>
          </Row>
        </ModalButton>
  )
}

export default TableControls;
