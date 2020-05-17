import React, {Component} from 'react';
import {
  Button,
  Col,
  Input,
  Row,
  Card,
  CardBody,
} from 'reactstrap';
class Contribute extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      korean_text:this.props.location.state.korean_text,
      p_translated_text: this.props.location.state.p_translated_text,
      able_submit: false
    };
  }
  handleChange=(e)=>{
    this.setState({
      korean_text: e.target.value
    })
  }
  handleClick=(e)=>{
    console.log(this.state.korean_text);
    this.setState({
      p_translated_text:this.state.korean_text,
      able_submit:true
    });
  }
  render() {
    return (
    <div>
      <Row>
        <Col>
        <Card>
          <CardBody rows="9">
            {this.state.korean_text} 
          </CardBody>
        </Card>
          <Button disabled={true} onClick={this.handleClick}>Translate</Button>
        </Col>
        <Col>
          <Card>
            <Input type="textarea" value={this.state.p_translated_text}
            onChange={this.handleChange} rows="9"/>
          </Card>
          <Button disabled={this.state.able_submit} onClick={this.handleSubmit}>Submit</Button>
        </Col>          
      </Row>
    </div>
    );
  }
}

export default Contribute;