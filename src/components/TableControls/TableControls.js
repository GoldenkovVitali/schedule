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
  const [rowCount, setRowCount] = useState(10);
  const [fontSize, setFontSize] = useState(14);
  const [displayBgPicker, setDisplayBgPicker] = useState(false);
  const [colorBgPicker, setColorBgPicker] = useState({ r: '241', g: '112', b: '19', a: '1',});
  const [displayFontPicker, setDisplayFontPicker] = useState(false);
  const [colorFontPicker, setColorFontPicker] = useState({ r: '241', g: '112', b: '19', a: '1',});

  const { onHideColumns, initColumns} = props

  useEffect(()=> {
    if (initColumns) {
      setColumns(props.initColumns)
    }
  }, [props])

  const onSaveSettings = () => {
    onHideColumns(targetKeys)
  }


  return (
    <Row>
      <Col xs={{ span: 12, offset: 3 }} lg={{ span: 12, offset: 3 }}>
        <ModalButton onSaveSettings={onSaveSettings} icon={<SettingOutlined />}>
          <Row>
            <Col span={12} offset={1}>
              <Title level={5}>Отображение  колонок:</Title>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }}>
               <ColTransfer initColumns={col} targetKeys={targetKeys} setTargetKeys={setTargetKeys} />
            </Col>
            <Col xs={{ span: 8, offset: 1 }} lg={{ span: 8, offset: 1 }}>
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
                 setFontSize={setFontSize}
               />
            </Col>
          </Row>
        </ModalButton>
      </Col>
    </Row>
  )
}

export default TableControls;
