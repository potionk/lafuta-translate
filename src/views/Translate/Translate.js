import React, { Component } from 'react';
import google_icon from '../../assets/icon/google_icon.png';
import kakao_icon from '../../assets/icon/kakao_icon.png';
import papago_icon from '../../assets/icon/papago_icon.png';
import axios from "axios";
import { Button, Col, Input, Row, Card, CardBody, ListGroup, ListGroupItem, CardHeader } from 'reactstrap';
const qs = require('querystring')
const papago_headers = {
  'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'Accept': '*/*',
  'X-Naver-Client-Id': '48do5KkeVQYZBNxkJGUt',
  'X-Naver-Client-Secret': 'vIXAEug1_8'
}
const google_headers = {
  'Content-type': 'application/json',
  'Authorization': 'Bearer ya29.c.KpQB1wdbkhsHtr7_tkA3wLHzrStpdAhwh5Q0BdK_1Dmwb7lrZ2Igysoo1ZTmn3nPHLCu4XOrbmIwF8oYe_zThLNNifr5DWgZVgf6Q3b0oy03ntyfUiODneLdiX_0MLYNHdaXIp9nzRQVmpBvzVfAW6trO9RpbappZDtv6O2pRpsm_LYWzVAJbANX25nUfdJTZXvb3kNxeA',
}
const kakao_headers = {
  'Authorization': 'KakaoAK 731079cdb935d4c712f1225cce3c9c6b',
}

class Translate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_korean_text: "",
      korean_text: "",
      select_text: [["", "", ""]],
      p_translated_text: [],
      g_translated_text: [],
      k_translated_text: [],
      color: [],
      able_submit: false
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleChange = (e) => {
    this.setState({
      input_korean_text: e.target.value
    })
  };

  make2DArray(num) {
    var arr = new Array(num);
    for (var i = 0; i < num; i++) {
      arr[i] = new Array(3);
      arr[i][0] = "success";
    }
    return arr;
  }

  handleClick = async (e) => {
    this.setState({
      able_submit: true,
    });
    await this.setState({
      korean_text: this.state.input_korean_text,
      select_text: this.make2DArray(this.state.input_korean_text.split(". ").length),
      p_translated_text: [],
      g_translated_text: [],
      k_translated_text: []
    });
    console.log(this.state.select_text)
    this.papago_translate();
    this.google_translate();
    this.kakao_translate();
  };

  handleSubmit = (e) => {
    this.setState({
      p_translated_text: this.state.korean_text,
    });
  }

  papago_translate = async () => {
    let splitKor = (this.state.korean_text + " ").split(". ");
    let papago_result = []
    for (let i = 0; i < splitKor.length; i++) {
      if (splitKor[i] === "") {
        continue;
      }
      let param = {
        source: 'ko',
        target: 'en',
        text: splitKor[i]
      }
      await axios.post("/v1/papago/n2mt", qs.stringify(param), { headers: papago_headers })
        .then(res => {
          let english_text = res.data;
          papago_result.push(english_text.message.result.translatedText)
        }).catch(error => {
          console.log('failed', error)
        })
    }
    this.setState({
      p_translated_text: this.state.p_translated_text.concat(papago_result)
    });
  };

  google_translate = async () => {
    let splitKor = (this.state.korean_text + " ").split(". ");
    let google_result = []
    for (let i = 0; i < splitKor.length; i++) {
      if (splitKor[i] === "") {
        continue;
      }
      let param = {
        source: 'ko',
        target: 'en',
        format: 'text',
        q: splitKor[i]
      }
      await axios.post("/language/translate/v2", param, { headers: google_headers })
        .then(res => {
          let english_text = res.data;
          google_result.push(english_text.data.translations[0].translatedText);
        }).catch(error => {
          console.log('failed', error)
        })
    }
    this.setState({
      g_translated_text: this.state.g_translated_text.concat(google_result)
    });
  };

  kakao_translate = async () => {

    let splitKor = (this.state.korean_text + " ").split(". ");
    let kakao_result = []
    for (let i = 0; i < splitKor.length; i++) {
      if (splitKor[i] === "") {
        continue;
      }
      let param = {
        src_lang: 'kr',
        target_lang: 'en',
        query: splitKor[i]
      }
      await axios.post("/v1/translation/translate", qs.stringify(param), { headers: kakao_headers })
        .then(res => {
          let english_text = res.data.translated_text;
          let t = "";
          for (let i = 0; i < english_text.length; i++) {
            t += english_text[i] + " ";
          }
          kakao_result.push(t);
        }).catch(error => {
          console.log('failed', error)
        })
    }
    this.setState({
      k_translated_text: this.state.k_translated_text.concat(kakao_result)
    });

  };

  highlight(index, arg) {
    let get_select_text = this.state.select_text;
    for (let i = 0; i < 3; i++) {
      get_select_text[index][i] = "";
    }
    get_select_text[index][arg] = "success";
    this.setState({
      select_text: get_select_text,
    });
  }

  makeResultCard() {
    let splitKor = (this.state.korean_text + " ").split(". ")
    let papago_result = this.state.p_translated_text
    let google_result = this.state.g_translated_text
    let kakao_result = this.state.k_translated_text
    if (papago_result === undefined) {
      papago_result = new Array(splitKor.length)
    }
    if (google_result === undefined) {
      google_result = new Array(splitKor.length)
    }
    if (kakao_result === undefined) {
      kakao_result = new Array(splitKor.length)
    }
    return (
      <Col>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>번역 결과</strong>
          </CardHeader>
          <CardBody>
            {splitKor.map((txt, index) => (
              txt === "" ? <br key={index} /> : (
                <ListGroup key={index}>
                  <ListGroupItem key="0" active tag="button" action>{txt}</ListGroupItem>
                  <ListGroupItem key="1" tag="button" action color={this.state.select_text[index][0]} onClick={() => this.highlight(index, 0)}><img src={papago_icon} alt="papago" />{papago_result[index]}</ListGroupItem>
                  <ListGroupItem key="2" tag="button" action color={this.state.select_text[index][1]} onClick={() => this.highlight(index, 1)}><img src={google_icon} alt="google" />{google_result[index]}</ListGroupItem>
                  <ListGroupItem key="3" tag="button" action color={this.state.select_text[index][2]} onClick={() => this.highlight(index, 2)}><img src={kakao_icon} alt="kakao" />{kakao_result[index]}</ListGroupItem>
                </ListGroup>
              )
            ))}
          </CardBody>
        </Card>
      </Col>
    )
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Input type="textarea" value={this.state.input_korean_text}
              onChange={this.handleChange} rows="9" />
            <Button onClick={this.handleClick}>Translate</Button>
          </Col>
          <Col>
            {this.makeResultCard(this.korean_text_list)}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Translate;