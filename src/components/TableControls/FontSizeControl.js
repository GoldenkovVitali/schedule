import React, {useState} from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const FontSizeControl = ({setFontSize}) => {
  const [fontLevel, setFontLevel] = useState(3);

  const handleLess = () => {
    setFontSize((prevSize) => prevSize > 5 ? prevSize - 1 : 5)
    setFontLevel((prevSize) => prevSize > 1 ? prevSize - 1 : 1)
  };

  const handleMore = () => {
    setFontSize((prevSize) => prevSize < 50 ? prevSize + 1 : 50)
    setFontLevel((prevSize) => prevSize < 5 ? prevSize + 1 : 5)
  };

    return (
        <Row>
          <Col span={6}>
            <Button onClick={handleLess} type="primary" shape="circle">
              <MinusOutlined />
            </Button>
          </Col>
          <Col span={6}>
              <Title style={{textAlign: 'center'}} level={fontLevel}>A</Title>
          </Col>
          <Col span={6}>
            <Button onClick={handleMore} type="primary" shape="circle">
              <PlusOutlined />
            </Button>
          </Col>
        </Row>
    );
}

export default FontSizeControl;
