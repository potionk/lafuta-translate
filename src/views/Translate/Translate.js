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
      k_translated_text: "",
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
    this.kakao_translate();
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
      'Authorization': 'Bearer ya29.c.Ko8ByweLvXJ8A2LUmDLjBjolE2_66tf0KR0COfvGtV-Ux1uEvY8BIohIm-eKnN5hY7dgmUeLZDrS67xM7XAc0BlxKuHynktbjAYqV9zKUr9g4pcFOWylvxXUi3d0Nea_1oPlIzf6sZOwArJbI_kvB79Bp4SPm9CwzidxfWWQ_87mNcVQ0E25wBG-rwesVo6m_Ss',
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

  kakao_translate = async () => {
    const headers = {
      'Authorization': 'KakaoAK 731079cdb935d4c712f1225cce3c9c6b',
    }
    let param = {
      src_lang: 'kr',
      target_lang: 'en',
      query: this.state.korean_text
    }

    axios.post("/v1/translation/translate", qs.stringify(param), { headers: headers })
      .then(res => {
        let english_text = res.data.translated_text;
        let t="";
        for(let i=0; i<english_text.length; i++){
          t+=english_text[i]+" ";
        }
        this.setState({
          k_translated_text: t,
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
            <Card>
              <CardBody>
                카카오번역<p />{this.state.k_translated_text}
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