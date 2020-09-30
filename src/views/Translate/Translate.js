import React, { Component } from 'react';
import google_icon from '../../assets/icon/google_icon.png';
import kakao_icon from '../../assets/icon/kakao_icon.png';
import papago_icon from '../../assets/icon/papago_icon.png';
import pencil_icon from '../../assets/icon/pencil_icon.png';
import axios from "axios";
import { Button, Col, Input, Row, Card, CardBody, ListGroup, ListGroupItem, CardHeader } from 'reactstrap';
const qs = require('querystring');

const papago_headers = {
  'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'Accept': '*/*',
  'X-Naver-Client-Id': '48do5KkeVQYZBNxkJGUt',
  'X-Naver-Client-Secret': 'vIXAEug1_8'
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
      p_translated_text: [""],
      g_translated_text: [""],
      k_translated_text: [""],
      user_translate: [""],
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

  handleChangeU = (e) => {
    let get_user_translate = this.state.user_translate;
    get_user_translate[e.target.dataset.index] = e.target.value;
    this.setState({
      user_translate: get_user_translate,
    });
    console.log(this.state.user_translate)
  };

  make2DArray(num) {
    var arr = new Array(num);
    for (var i = 0; i < num; i++) {
      arr[i] = new Array(4);
      arr[i][0] = "success"; // success가 해당 블럭 색칠하는 attribute의 값이 됨
    }
    return arr;
  }

  handleClick = async (e) => {
    if (this.state.input_korean_text.trim() === "") {
      alert("내용을 입력해주세요.");
    } else {
      this.setState({
        able_submit: true,
      });
      let len = this.state.input_korean_text.split(". ").length;
      // console.log(len)
      await this.setState({ // await없을 시 translate 메소드 실행 시 인자가 빠져 들어갈 수 있어 에러가 날 가능성이 있음.
        korean_text: this.state.input_korean_text.trim(),
        select_text: this.make2DArray(len),
        p_translated_text: [],
        g_translated_text: [],
        k_translated_text: [],
        user_translate: new Array(len),
      });
      this.papago_translate();
      this.google_translate();
      this.kakao_translate();
    }
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
    let key = ""
    await axios.get("/translate/get_key") // proxy 설정하여 서버의 주소로 돌리거나 http://localhost:(port num)/translate/get_key 로 사용
      .then(res => {
        key = res.data.key;
      }).catch(error => {
        console.log('failed', error)
      })
    let google_headers = {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + key,
    }
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
    for (let i = 0; i < 4; i++) {
      get_select_text[index][i] = "";
    }
    get_select_text[index][arg] = "success";
    this.setState({
      select_text: get_select_text,
    });
  }

  copy_result() {
    let get_select_text = this.state.select_text;
    let get_p_translated_text = this.state.p_translated_text;
    let get_g_translated_text = this.state.g_translated_text;
    let get_k_translated_text = this.state.k_translated_text;
    let get_user_translate = this.state.user_translate;
    let result = "";
    for (let i = 0; i < get_select_text.length; i++) {
      if (get_select_text[i][0] === "success") {
        result += get_p_translated_text[i];
      } else if (get_select_text[i][1] === "success") {
        result += get_g_translated_text[i];
      } else if (get_select_text[i][2] === "success") {
        result += get_k_translated_text[i];
      } else if (get_select_text[i][3] === "success") {
        result += get_user_translate[i];
      }
      if (i !== get_select_text.length - 1) {
        result += " ";
      }
    }
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = result;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    alert("복사 완료!");
  }

  copy_this(index, translator) {
    let target = "";
    switch (translator) {
      case 0:
        target = this.state.p_translated_text[index];
        break;
      case 1:
        target = this.state.g_translated_text[index];
        break;
      case 2:
        target = this.state.k_translated_text[index];
        break;
      default:
    }
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = target;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    alert("복사 완료!");
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
                  <ListGroupItem key="1" tag="button" action color={this.state.select_text[index][0]} onClick={() => this.highlight(index, 0)} onDoubleClick={() => this.copy_this(index, 0)}><img src={papago_icon} alt="papago" />{papago_result[index]}</ListGroupItem>
                  <ListGroupItem key="2" tag="button" action color={this.state.select_text[index][1]} onClick={() => this.highlight(index, 1)} onDoubleClick={() => this.copy_this(index, 1)}><img src={google_icon} alt="google" />{google_result[index]}</ListGroupItem>
                  <ListGroupItem key="3" tag="button" action color={this.state.select_text[index][2]} onClick={() => this.highlight(index, 2)} onDoubleClick={() => this.copy_this(index, 2)}><img src={kakao_icon} alt="kakao" />{kakao_result[index]}</ListGroupItem>
                  <ListGroupItem key="4" tag="button" action color={this.state.select_text[index][3]} onClick={() => this.highlight(index, 3)}><img src={pencil_icon} alt="user" />
                    <Input type="textarea" value={this.state.user_translate[index]} data-index={index} onChange={this.handleChangeU} rows="1" />
                  </ListGroupItem>
                </ListGroup>
              )
            ))}
          </CardBody>
        </Card>
        <Button onClick={() => this.copy_result()}>클립보드에 복사</Button>
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