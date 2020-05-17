import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Contribute from '../Contribute/Contribute';
import axios from "axios";
import { Button, Col, Input, Row, Card, CardBody } from 'reactstrap';
const qs = require('querystring')

class Translate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      korean_text: "",
      p_translated_text: "",
      g_translated_text: "",
      able_submit: false
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleChange = (e) => {
    this.setState({
      korean_text: e.target.value
    })
  };

  handleClick = (e) => {
    this.setState({
      p_translated_text: "in translation...",
      g_translated_text: "in translation...",
      able_submit: true
    });
    this.papago_translate();
    this.google_translate();
  };

  handleSubmit = (e) => {
    // this.setState({
    //   p_translated_text: this.state.korean_text,
    // });
  }

  papago_translate = async () => {
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

    axios.post("/v1/papago/n2mt", qs.stringify(param), { headers: headers })
      .then(res => {
        let english_text = res.data;
        this.setState({
          p_translated_text: english_text.message.result.translatedText,
        });
      }).catch(error => {
        console.log('failed', error)
      })
  };

  google_translate = async () => {
    const headers = {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ya29.c.Ko8BywfnXDO9KrChTolHstctGk4PHckhxDxYLl1y23Yd4ey9SHX6XgAs9oGeam_vO-ZIjcx3Bhsmaf_ylYnyE3Xaf1Li2CpCQ3A1uglIZ0_3Px5aFuePgrVISh7Nn736YrZ5EHXMSrABGUTBfCy60xviV2Pam9Vh0Edm80AeGv7WDKbWpNcvThV6Vr6IVW0imtQ',
    }
    let param = {
      source: 'ko',
      target: 'en',
      format: 'text',
      q: this.state.korean_text
    }

    axios.post("/language/translate/v2", param, { headers: headers })
      .then(res => {
        let english_text = res.data;
        this.setState({
          g_translated_text: english_text.data.translations[0].translatedText,
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
              onChange={this.handleChange} rows="9" />
            <Button onClick={this.handleClick}>Translate</Button>
          </Col>
          <Col>
            <Card>
              <CardBody>
                파파고번역<p />{this.state.p_translated_text}
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                구글번역<p />{this.state.g_translated_text}
              </CardBody>
            </Card>
            <Link to={{
              pathname: '/contribute',
              state: {
                korean_text: this.state.korean_text,
                p_translated_text: this.state.p_translated_text
              }
            }}>
              <Button disabled={!this.state.able_submit} onClick={this.handleSubmit}>Contribute</Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Translate;