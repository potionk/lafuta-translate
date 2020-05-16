import React, {Component} from 'react';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Contribute from '../Contribute/Contribute';
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
      Translated_Text: "" ,
      able_submit: false
    };
    
    this.handleClick = this.handleClick.bind(this);
  };
  handleChange=(e)=>{
    this.setState({
      KoreanText: e.target.value
    })
  }
  handleClick=(e)=>{
    let dummy_text = "Deep learning has emerged as a new area of machine-learning research and has been successfully applied to natural language processing, such as machine translation and sentence classification. In this work, we use effective Korean input token units to encode Korean sentences for classification problems, such as topic detection. Recurrent and convolutional neural networks for Korean sentence encoding are briefly reviewed, and various Korean input tokens units, including character, morpheme-tag, morpheme, word, subword, syllable window, and hybrids of morpheme and character methods are explored. Extensive experiments on sentimental analysis, topic detection, and intention understanding tasks are conducted to find effective input token units.";
    this.setState({
      Translated_Text:dummy_text,
      able_submit:true
    });
  }
  handleSubmit=(e)=>{                                                                                     
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
          <Button onClick={this.handleClick}>Translate</Button>
        </Col>
        <Col>
          <Card>
            <CardBody>
              {this.state.Translated_Text}
            </CardBody>
          </Card>
          <Link to={{pathname: '/contribute',
            state: {
              KoreanText: this.state.KoreanText,
              Translated_Text: this.state.Translated_Text
          }}}>
            <Button disabled={!this.state.able_submit} onClick={this.handleSubmit}>Contribute</Button>
          </Link>
        </Col>          
      </Row>
    </div>
    );
    }
}

export default Translate;