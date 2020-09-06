import React, {useState} from 'react';
import { Slider, InputNumber, Row, Col, Typography } from 'antd';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss'
import FontColorPicker from "./FontColorPicker";
import BackgroundColorPicker from "./BackgroundColorPicker";
import FontSizeControl from "./FontSizeControl";

const { Title } = Typography;

class ColRange extends React.Component {
  state = {
    inputValue: 10,
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  onChange = value => {
    this.setState({
      inputValue: value,
    });
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

  render() {
    const { inputValue } = this.state;
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <>
        <Row>
          <Col span={8}>
            <Title level={5}>Цвет фона:</Title>
          </Col>
          <Col span={8}>
          <BackgroundColorPicker />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Title level={5}>Цвет шрифта:</Title>
          </Col>
          <Col span={8}>
            <FontColorPicker/>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Title level={5}>Размер шрифта:</Title>
          </Col>
          <Col span={8}>
            <FontSizeControl/>
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
            onChange={this.onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={10}
            step={10}
            max={150}
            style={{ margin: '0 16px' }}
            value={inputValue}
            onChange={this.onChange}
          />
        </Col>
      </Row>
        </>
    );
  }
}


export default ColRange;
