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
      KoreanText:this.props.location.state.KoreanText,
      Translated_Text: this.props.location.state.Translated_Text,
      able_submit: false
    };
  }
  handleChange=(e)=>{
    this.setState({
      KoreanText: e.target.value
    })
  }
  handleClick=(e)=>{
    console.log(this.state.KoreanText);
    this.setState({
      Translated_Text:this.state.KoreanText,
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
            {this.state.KoreanText} 
          </CardBody>
        </Card>
          <Button disabled={true} onClick={this.handleClick}>Translate</Button>
        </Col>
        <Col>
          <Card>
            <Input type="textarea" value={this.state.Translated_Text}
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