import React from 'react';
import { Slider, InputNumber, Row, Col, Typography } from 'antd';
import FontColorPicker from "./FontColorPicker";
import BackgroundColorPicker from "./BackgroundColorPicker";
import FontSizeControl from "./FontSizeControl";
import AccesebilityButton from "./AccesebilityButton";

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
                        prefFontSize,
                        setFontSize}) => {

  const onChange = (value) => {
    setRowCount(value)
  };

  return (
    <>
      <Row>
        <Col span={8}>
          <Title level={5}>Цвет фона:</Title>
        </Col>
        <Col span={8}>
        <BackgroundColorPicker
          displayBgPicker={displayBgPicker}
          setDisplayBgPicker={setDisplayBgPicker}
          colorBgPicker={colorBgPicker}
          setColorBgPicker={setColorBgPicker}
        />
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Title level={5}>Цвет шрифта:</Title>
        </Col>
        <Col span={8}>
          <FontColorPicker
            displayFontPicker={displayFontPicker}
            setDisplayFontPicker={setDisplayFontPicker}
            colorFontPicker={colorFontPicker}
            setColorFontPicker={setColorFontPicker}
          />
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Title level={5}>Шрифт:</Title>
        </Col>
        <Col span={8}>
          <FontSizeControl setFontSize={setFontSize} prefFontSize={prefFontSize}/>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Title level={5}>Для слабовидящих:</Title>
        </Col>
        <Col span={8}>
          <AccesebilityButton/>
        </Col>
      </Row>
    <Row>
      <Col span={12}>
        <Title level={5}>Количество строк:</Title>
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <Slider
          min={10}
          step={10}
          max={150}
          onChange={onChange}
          value={typeof rowCount === 'number' ? rowCount : 0}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={10}
          step={10}
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
