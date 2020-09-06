import React from 'react';
import 'antd/dist/antd.css'
import './table.css'
import {Row, Col, Collapse, Typography} from 'antd';
import ModalButton from "./ModalButton";
import ColTransfer from "./ColTransfer";
import ColRange from "./ColRange";

const { Title } = Typography;
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const TableControls = () => {
  return (
    <Row>
      <Col xs={{ span: 12, offset: 3 }} lg={{ span: 12, offset: 3 }}>
        <ModalButton>
          <Row>
            <Col span={12} offset={1}>
              <Title level={5}>Отображение  колонок:</Title>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }}>
               <ColTransfer />
            </Col>
            <Col xs={{ span: 8, offset: 1 }} lg={{ span: 8, offset: 1 }}>
               <ColRange />
            </Col>
          </Row>
        </ModalButton>
      </Col>
    </Row>
  )
}

export default TableControls;
