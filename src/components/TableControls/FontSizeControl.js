import React, {useState} from 'react';
import { Row, Col, Typography, Button } from 'antd';


const { Title } = Typography;

class FontSizeControl extends React.Component {
  state = {
    inputValue: 10,
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

    return (
        <Row>
          <Col span={6}>
            <Button type="primary" shape="circle">
             -
            </Button>
          </Col>
          <Col span={6}>
              <Title style={{textAlign: 'center'}} level={3}>A</Title>
          </Col>
          <Col span={6}>
            <Button type="primary" shape="circle">
              +
            </Button>
          </Col>
        </Row>
    );
  }
}


export default FontSizeControl;
