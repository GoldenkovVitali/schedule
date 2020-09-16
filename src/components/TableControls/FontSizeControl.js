import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const FontSizeControl = ({onFontSizeChange, prevFontSize}) => {

  const handleLess = () => {
    onFontSizeChange('less')
  };

  const handleMore = () => {
    onFontSizeChange('more')
  };

    return (
        <Row>
          <Col span={6}>
            <Button onClick={handleLess} type="primary" >
              <MinusOutlined />
            </Button>
          </Col>
          <Col span={7}>
              <Title style={{textAlign: 'center'}} level={5}>{prevFontSize}</Title>
          </Col>
          <Col span={6}>
            <Button onClick={handleMore} type="primary" >
              <PlusOutlined />
            </Button>
          </Col>
        </Row>
    );
}

export default FontSizeControl;
