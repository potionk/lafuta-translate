import React, {Component} from 'react';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Contribute from '../Contribute/Contribute';
import axios from "axios";
import {Button, Col, Input, Row, Card, CardBody} from 'reactstrap';
const qs = require('querystring')

class Translate extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      korean_text:"",
      translated_text: "" ,
      able_submit: false
    };
    this.handleClick = this.handleClick.bind(this);
  };
  handleChange=(e)=>{
    this.setState({
      korean_text: e.target.value
    })
    console.log(this.state.korean_text)
  }
  handleClick=(e)=>{
    this.setState({
      translated_text: this.state.korean_text,
      able_submit:true
    });
    this.translate();
  }
  handleSubmit=(e)=>{                                                                                     
    this.setState({
      translated_text:this.state.korean_text,
    });
  }

  translate = async () => {
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*',
      'X-Naver-Client-Id': '48do5KkeVQYZBNxkJGUt',
      'X-Naver-Client-Secret': 'vIXAEug1_8'
    }
    let param = {
      source: 'ko',
      target: 'en',
      text: this.state.korean_text
    }

    axios.post("/v1/papago/n2mt", qs.stringify(param), {headers: headers})
      .then(res => {
        let english_text = res.data;
        console.log(english_text.message.result.translatedText);
        this.setState({
          translated_text: english_text.message.result.translatedText,
        });
      }).catch(error => {
        console.log('failed', error)
      })
  };

  render() {
    return (
    <div>
      <Row>
        <Col>
          <Input type="textarea" value={this.state.korean_text} 
          onChange={this.handleChange} rows="9"/>
          <Button onClick={this.handleClick}>Translate</Button>
        </Col>
        <Col>
          <Card>
            <CardBody>
              {this.state.translated_text}
            </CardBody>
          </Card>
          <Link to={{pathname: '/contribute',
            state: {
              korean_text: this.state.korean_text,
              translated_text: this.state.translated_text
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