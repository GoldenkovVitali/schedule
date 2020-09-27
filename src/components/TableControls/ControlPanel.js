import React from 'react';
import { Slider, InputNumber, Row, Col, Typography } from 'antd';
import FontColorPicker from "./FontColorPicker";
import BackgroundColorPicker from "./BackgroundColorPicker";
import FontSizeControl from "./FontSizeControl";
import AccesebilityButton from "./AccesebilityButton";
import TableControls from "./index";

const { Title } = Typography;

const ControlPanel = ({
                        rowCount,
                        setRowCount,
                        displayBgPicker,
                        setDisplayBgPicker,
                        colorBgPicker,
                        setColorBgPicker,
                        displayFontPicker,
                        setDisplayFontPicker,
                        colorFontPicker,
                        setColorFontPicker,
                        prevFontSize,
                        onHandleAccessible,
                        isAccessible,
                        onFontSizeChange}) => {

  const onChange = (value) => {
    setRowCount(value)
  };

  return (
    <>
      <Row>
        <Col xs={{ span: 18 }} lg={{ span: 8, offset: 1 }}>
          <Title level={5}>Background:</Title>
        </Col>
        <Col xs={{ span: 18 }} lg={{ span: 8, offset: 1 }}>
        <BackgroundColorPicker
          displayBgPicker={displayBgPicker}
          setDisplayBgPicker={setDisplayBgPicker}
          colorBgPicker={colorBgPicker}
          setColorBgPicker={setColorBgPicker}
          onHandleAccessible={onHandleAccessible}
        />
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 18 }} lg={{ span: 8, offset: 1 }}>
          <Title level={5}>Font color:</Title>
        </Col>
        <Col xs={{ span: 18 }} lg={{ span: 8, offset: 1 }}>
          <FontColorPicker
            displayFontPicker={displayFontPicker}
            setDisplayFontPicker={setDisplayFontPicker}
            colorFontPicker={colorFontPicker}
            setColorFontPicker={setColorFontPicker}
            onHandleAccessible={onHandleAccessible}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 18 }} lg={{ span: 8, offset: 1 }} style={{marginBottom: 10}}>
          <Title level={5}>Font size:</Title>
        </Col>
        <Col xs={{ span: 18 }} lg={{ span: 12, offset: 1 }}>
          <FontSizeControl
            onFontSizeChange={onFontSizeChange}
            prevFontSize={prevFontSize}
            onHandleAccessible={onHandleAccessible}/>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 18 }} lg={{ span: 8, offset: 1 }}>
          <Title level={5}>Accessibility:</Title>
        </Col>
        <Col xs={{ span: 18 }} lg={{ span: 8, offset: 1 }}>
          <AccesebilityButton onHandleAccessible={onHandleAccessible} isAccessible={isAccessible} />
        </Col>
      </Row>
    <Row>
      <Col xs={{ span: 18 }} lg={{ span: 8, offset: 1 }}>
        <Title level={5}>Rows:</Title>
      </Col>
    </Row>
    <Row>
      <Col xs={{ span: 18 }} lg={{ span: 12 }}>
        <Slider
          min={1}
          step={1}
          max={150}
          onChange={onChange}
          value={typeof rowCount === 'number' ? rowCount : 0}
        />
      </Col>
      <Col xs={{ span: 18 }} lg={{ span: 4 }}>
        <InputNumber
          min={1}
          step={1}
          max={150}
          style={{ margin: '0 16px' }}
          value={rowCount}
          onChange={onChange}
        />
      </Col>
    </Row>
      </>
  );
}


export default ControlPanel;
