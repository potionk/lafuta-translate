import React, { Component } from 'react';
import googleIcon from '../../assets/icon/google_icon.png';
import kakaoIcon from '../../assets/icon/kakao_icon.png';
import papagoIcon from '../../assets/icon/papago_icon.png';
import pencilIcon from '../../assets/icon/pencil_icon.png';
import paperIcon from '../../assets/icon/paper_icon.png';
import axios from "axios";
import { Label, Button, Col, Input, Row, Card, CardBody, ListGroup, ListGroupItem, CardHeader } from 'reactstrap';
const qs = require('querystring');

const PAPAGO_HEADERS = {
  'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'Accept': '*/*',
  'X-Naver-Client-Id': '48do5KkeVQYZBNxkJGUt',
  'X-Naver-Client-Secret': 'vIXAEug1_8'
}

const KAKAO_HEADERS = {
  'Authorization': 'KakaoAK 731079cdb935d4c712f1225cce3c9c6b',
}

class Translate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputKoreanText: "",
      inputEnglishText: "",
      koreanText: "",
      englishText: "",
      selectText: [["", "", "", ""]],
      papagoResult: [""],
      googleResult: [""],
      kakaoResult: [""],
      userTranslate: [""],
      color: [],
      isSameLength: true
    };
    this.handleClick = this.handleClick.bind(this);
  };

  handleChangeK = (e) => {
    this.setState({
      inputKoreanText: e.target.value
    });
  };

  handleChangeE = (e) => {
    this.setState({
      inputEnglishText: e.target.value
    });
  };

  handleChangeU = (e) => {
    let getUserTranslate = this.state.userTranslate;
    getUserTranslate[e.target.dataset.index] = e.target.value;
    this.setState({
      userTranslate: getUserTranslate,
    });
  };


  make2DArray(num) {
    var arr = new Array(num);
    for (var i = 0; i < num; i++) {
      arr[i] = new Array(5);
      arr[i][0] = "success"; // success가 해당 블럭 색칠하는 attribute의 값이 됨
    }
    return arr;
  }

  handleClick = async (e) => {
    if (this.state.inputKoreanText.trim() === "" || this.state.inputEnglishText.trim() === "") {
      alert("내용을 모두 입력해주세요.");
    } else {
      let inputKorlen = (this.state.inputKoreanText.trim() + " ").split(". ").length;
      let inputEnglen = (this.state.inputEnglishText.trim() + " ").split(". ").length;
      let isSame = inputKorlen === inputEnglen ? true : false;
      await this.setState({ // await없을 시 translate 메소드 실행 시 인자가 빠져 들어갈 수 있어 에러가 날 가능성이 있음.
        koreanText: this.state.inputKoreanText.trim(),
        englishText: this.state.inputEnglishText.trim(),
        selectText: this.make2DArray(inputKorlen),
        papagoResult: [],
        googleResult: [],
        kakaoResult: [],
        isSameLength: isSame,
        userTranslate: new Array(inputKorlen),
      });
      this.papago_translate();
      this.googleTranslate();
      this.kakaoTranslate();
    }
  };

  handleSubmit = (e) => {
    this.setState({
      papagoResult: this.state.koreanText,
    });
  }

  papago_translate = async () => {
    let splitKor = (this.state.koreanText + " ").split(". ");
    let pResult = [];
    for (let i = 0; i < splitKor.length; i++) {
      if (splitKor[i] === "") {
        continue;
      }
      let param = {
        source: 'ko',
        target: 'en',
        text: splitKor[i]
      };
      await axios.post("/v1/papago/n2mt", qs.stringify(param), { headers: PAPAGO_HEADERS })
        .then(res => {
          let englishText = res.data;
          pResult.push(englishText.message.result.translatedText)
        }).catch(error => {
          console.log('failed', error)
        });
    }
    this.setState({
      papagoResult: this.state.papagoResult.concat(pResult)
    });
  };

  googleTranslate = async () => {
    let key = "";
    await axios.get("/translate/get_key") // proxy 설정하여 서버의 주소로 돌리거나 http://localhost:(port num)/translate/get_key 로 사용
      .then(res => {
        key = res.data.key;
      }).catch(error => {
        console.log('failed', error)
      })
    let splitKor = (this.state.koreanText + " ").split(". ");
    let gResult = [];
    let googleHeaders = {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + key,
    };
    for (let i = 0; i < splitKor.length; i++) {
      if (splitKor[i] === "") {
        continue;
      }
      let param = {
        source: 'ko',
        target: 'en',
        format: 'text',
        q: splitKor[i]
      };
      await axios.post("/language/translate/v2", param, { headers: googleHeaders })
        .then(res => {
          let englishText = res.data;
          gResult.push(englishText.data.translations[0].translatedText);
        }).catch(error => {
          console.log('failed', error)
        });
    }
    this.setState({
      googleResult: this.state.googleResult.concat(gResult)
    });
  };

  kakaoTranslate = async () => {
    let splitKor = (this.state.koreanText + " ").split(". ");
    let kakaoTranslated = [];
    for (let i = 0; i < splitKor.length; i++) {
      if (splitKor[i] === "") {
        continue;
      }
      let param = {
        src_lang: 'kr',
        target_lang: 'en',
        query: splitKor[i]
      };
      await axios.post("/v1/translation/translate", qs.stringify(param), { headers: KAKAO_HEADERS })
        .then(res => {
          let englishText = res.data.translated_text;
          let t = "";
          for (let i = 0; i < englishText.length; i++) {
            t += englishText[i] + " ";
          }
          kakaoTranslated.push(t);
        }).catch(error => {
          console.log('failed', error);
        })
    }
    this.setState({
      kakaoResult: this.state.kakaoResult.concat(kakaoTranslated)
    });
  };

  highlight(index, arg) {
    let getSelectText = this.state.selectText;
    for (let i = 0; i < 5; i++) {
      getSelectText[index][i] = "";
    }
    getSelectText[index][arg] = "success";
    this.setState({
      selectText: getSelectText,
    });
  }

  copyKoreanResult() {
    let splitKor = (this.state.koreanText + " ").split(". ");
    let result = "";
    for (let i = 0; i < splitKor.length - 1; i++) {
      result += splitKor[i] + ".";
      if (i !== splitKor.length - 2) result += "\n";
    }
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = result;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    alert("복사 완료!");
  }

  copyEnglishResult() {
    let getSelectText = this.state.selectText;
    let getPapagoResult = this.state.papagoResult;
    let getGoogleResult = this.state.googleResult;
    let getKakaoResult = this.state.kakaoResult;
    let getInputEnglish = this.state.englishText.split(". ");
    let getUserTranslate = this.state.userTranslate;
    let result = "";
    for (let i = 0; i < getSelectText.length - 1; i++) {
      if (getSelectText[i][0] === "success") {
        result += getPapagoResult[i];
      } else if (getSelectText[i][1] === "success") {
        result += getGoogleResult[i];
      } else if (getSelectText[i][2] === "success") {
        result += getKakaoResult[i];
      } else if (getSelectText[i][3] === "success") {
        result += getInputEnglish[i];
      } else if (getSelectText[i][4] === "success") {
        result += getUserTranslate[i];
      }
      if (i !== getSelectText.length - 2) {
        result += "\n";
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

  copyThis(index, translator) {
    let target = "";
    switch (translator) {
      case 0:
        target = this.state.papagoResult[index];
        break;
      case 1:
        target = this.state.googleResult[index];
        break;
      case 2:
        target = this.state.kakaoResult[index];
        break;
      case 3:
        let getInputEnglish = this.state.englishText.split(". ");
        target = getInputEnglish[index];
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
    let getIsSameLength = this.state.isSameLength;
    let splitKor = (this.state.koreanText + " ").split(". ");
    let splitEng = (this.state.englishText + " ").split(". ");
    let pResult = this.state.papagoResult;
    let gResult = this.state.googleResult;
    let kResult = this.state.kakaoResult;
    if (pResult === undefined) pResult = new Array(splitKor.length);
    if (gResult === undefined) gResult = new Array(splitKor.length);
    if (kResult === undefined) kResult = new Array(splitKor.length);
    if (getIsSameLength) {
      return (
        <Col sm>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i><strong>번역 결과</strong>
            </CardHeader>
            <CardBody>
              {splitKor.map((txt, index) => (
                txt === "" ? <br key={index} /> : (
                  <ListGroup key={index}>
                    <ListGroupItem key="0" active tag="button" action>{txt.trim()}.</ListGroupItem>
                    <ListGroupItem key="1" tag="button" action color={this.state.selectText[index][0]} onClick={() => this.highlight(index, 0)} onDoubleClick={() => this.copyThis(index, 0)}><img src={papagoIcon} alt="papago" />{pResult[index]}</ListGroupItem>
                    <ListGroupItem key="2" tag="button" action color={this.state.selectText[index][1]} onClick={() => this.highlight(index, 1)} onDoubleClick={() => this.copyThis(index, 1)}><img src={googleIcon} alt="google" />{gResult[index]}</ListGroupItem>
                    <ListGroupItem key="3" tag="button" action color={this.state.selectText[index][2]} onClick={() => this.highlight(index, 2)} onDoubleClick={() => this.copyThis(index, 2)}><img src={kakaoIcon} alt="kakao" />{kResult[index]}</ListGroupItem>
                    <ListGroupItem key="4" tag="button" action color={this.state.selectText[index][3]} onClick={() => this.highlight(index, 3)} onDoubleClick={() => this.copyThis(index, 3)}><img src={paperIcon} alt="kakao" />{splitEng[index]}</ListGroupItem>
                    <ListGroupItem key="5" tag="button" action color={this.state.selectText[index][4]} onClick={() => this.highlight(index, 4)}><img src={pencilIcon} alt="user" />
                      <Input type="textarea" value={this.state.userTranslate[index]} data-index={index} onChange={this.handleChangeU} rows="1" />
                    </ListGroupItem>
                  </ListGroup>
                )
              ))}
            </CardBody>
          </Card>
          <Button onClick={() => this.copyKoreanResult()}>(한글)클립보드에 복사</Button><p />
          <Button onClick={() => this.copyEnglishResult()}>(영어)클립보드에 복사</Button>
        </Col>
      )
    } else {
      return (
        <Col sm>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i><strong>번역 결과</strong>
            </CardHeader>
            <CardBody>
              {splitKor.map((txt, index) => (
                txt === "" ? <br key={index} /> : (
                  <ListGroup key={index}>
                    <ListGroupItem key="0" active tag="button" action>{txt}.</ListGroupItem>
                    <ListGroupItem key="1" tag="button" action color={this.state.selectText[index][0]} onClick={() => this.highlight(index, 0)} onDoubleClick={() => this.copyThis(index, 0)}><img src={papagoIcon} alt="papago" />{pResult[index]}</ListGroupItem>
                    <ListGroupItem key="2" tag="button" action color={this.state.selectText[index][1]} onClick={() => this.highlight(index, 1)} onDoubleClick={() => this.copyThis(index, 1)}><img src={googleIcon} alt="google" />{gResult[index]}</ListGroupItem>
                    <ListGroupItem key="3" tag="button" action color={this.state.selectText[index][2]} onClick={() => this.highlight(index, 2)} onDoubleClick={() => this.copyThis(index, 2)}><img src={kakaoIcon} alt="kakao" />{kResult[index]}</ListGroupItem>
                    <ListGroupItem key="4" tag="button" action color={this.state.selectText[index][3]} onClick={() => this.highlight(index, 3)}><img src={pencilIcon} alt="user" />
                      <Input type="textarea" value={this.state.userTranslate[index]} data-index={index} onChange={this.handleChangeU} rows="1" />
                    </ListGroupItem>
                  </ListGroup>
                )
              ))}
            </CardBody>
          </Card>
          <Button onClick={() => this.copyKoreanResult()}>(한글)클립보드에 복사</Button><p />
          <Button onClick={() => this.copyEnglishResult()}>(영어)클립보드에 복사</Button>
        </Col>
      )
    }
  }

  makeInputEngCard() {
    let getIsSameLength = this.state.isSameLength;
    if (!getIsSameLength) {
      let splitEng = (this.state.englishText + " ").split(". ");
      return (
        <Col sm>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i><strong>Input Eng</strong>
            </CardHeader>
            <CardBody>
              {splitEng.map((txt, index) => (
                txt === "" ? <br key={index} /> : (
                  <ListGroup key={index}>
                    <ListGroupItem key="0" tag="button" action onDoubleClick={() => this.copyThis(index,3)}>{txt}.</ListGroupItem>
                  </ListGroup>
                )
              ))}
            </CardBody>
          </Card>
          <Button onClick={() => this.copyKoreanResult()}>(한글)클립보드에 복사</Button><p />
          <Button onClick={() => this.copyEnglishResult()}>(영어)클립보드에 복사</Button>
        </Col>
      )
    } else {
      return (<div></div>)
    }

  }

  render() {
    return (
      <div>
        <Row>
          <Col sm>
            <Label>Kor</Label>
            <Input type="textarea" value={this.state.inputKoreanText}
              onChange={this.handleChangeK} rows="9" />
            <Label>Eng</Label>
            <Input type="textarea" value={this.state.inputEnglishText}
              onChange={this.handleChangeE} rows="9" />
            <Button onClick={this.handleClick}>Check!</Button>
          </Col>
          {this.makeResultCard()}
          {this.makeInputEngCard()}
        </Row>
      </div>
    );
  }
}

export default Translate;