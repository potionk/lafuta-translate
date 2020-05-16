import React, {Component, SetState} from 'react';
import {
  Button,
  Col,
  Input,
  Row,
  Card,
  CardBody,
} from 'reactstrap';
class Translate extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      KoreanText:"",
      Translated_Text: "" 
    };
    this.handleClick = this.handleClick.bind(this);
  };
  handleChange=(e)=>{
    this.setState({
      KoreanText: e.target.value
    })
  }
  handleClick=(e)=>{
    console.log(this.state.KoreanText);
    this.setState({
      Translated_Text:this.state.KoreanText,
      Korean : ""
    });
  }
  render() {
    return (
    <div>
      <Row>
        <Col>
          <Input type="textarea" value={this.state.KoreanText} 
          onChange={this.handleChange} rows="9"/>
        </Col>
        <Col>
        
          <Card>
            <CardBody>
              {this.state.Translated_Text}
            </CardBody>
          </Card>
        </Col>
                      
      </Row>
      <Button onClick={this.handleClick}>Translate</Button>
      {/* <Button onClick={this.handleSubmit}>Contribute</Button> */}
    </div>
    );
    }
}

export default Translate;