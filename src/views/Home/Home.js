import React, { Component } from 'react';
import google_icon from '../../assets/icon/google_icon.png';
import kakao_icon from '../../assets/icon/kakao_icon.png';
import papago_icon from '../../assets/icon/papago_icon.png';
import lafuta_icon from '../../assets/icon/lafuta_icon.png';
import translation_page from '../../assets/application_screenshot/01_translate.png';
import keyword_page from '../../assets/application_screenshot/02_keyword.png';
import search_page from '../../assets/application_screenshot/03_search.png';
import feedback_page from '../../assets/application_screenshot/04_feedback.png';
import jongun from '../../assets/img/jongun.png';
import jeesu from '../../assets/img/jeesu.png';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        color: [],
        able_submit: false,
        search_url: ""
    };
};

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  render() {
    //developer info(GitHub)
    //Translator info (w.image)
    return (
      <div>
        <h3>Service</h3>
        <p />
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <b>01. 번역 결과 취합 제공</b>
              </CardHeader>
              <CardBody>
                    <img src={translation_page} width="440" height="300"  alt="translation_page"/><p />
                    4종의 번역 결과를 한 눈에 볼 수 있습니다.<br />
                    이를 이용하여 간단하게 번역 및 편집이 가능합니다.<br />
              </CardBody>
            </Card>
            </Col>
            <Col>
            <Card>
              <CardHeader>
                <b>02. 키워드 추출</b>
              </CardHeader>
              <CardBody>
                    <img src={keyword_page} width="440" height="300"  alt="keyword_page"/><p />
                    영문 문단에서 키워드를 추출합니다.<br />
                    이를 이용하여 원하는 개수와 길이의 키워드를 추출할 수 있습니다.<br />
              </CardBody>
            </Card>
          </Col>
          </Row>
          <Row>
            <Col>
            <Card>
              <CardHeader>
                <b>03. 쉬운 검색</b>
              </CardHeader>
              <CardBody>
                    <img src={search_page} width="440" height="300"  alt="search_page"/><p />
                    번역한 문장에 대해 검색할 수 있습니다.<br />
                    원하는 문장을 살짝 당기면 구글 검색으로 이어집니다.<br />
              </CardBody>
            </Card>
            </Col>
            <Col>
            <Card>
              <CardHeader>
                <b>04. 데이터 피드백</b>
              </CardHeader>
              <CardBody>
                    <img src={feedback_page} width="440" height="300"  alt="feedback_page"/><p />
                    원하는 문장이 없을 시, 번역 모델의 발전을 위해 기여해주세요.<br />
                    번역 제공 페이지처럼, 편집 후 제출해주면 데이터에 반영됩니다.<br />
              </CardBody>
            </Card>
            </Col>
        </Row>


        <h3>Translator information</h3>
        <Row>
          <Col>
          <Card>
              <CardHeader>
                <b>4종 번역기 제공</b>
              </CardHeader>
            <CardBody>
              <div>
                Lafuta Paper Translator Assistant는 아래의 4종의 번역 결과를 제공합니다.<br />
                원하시는 번역 결과를 마음껏 편집, 이용하세요!<br />
                <br />
              </div>
              <ListGroup>
                <ListGroupItem>
                  <img src={papago_icon} alt="papago"/> 네이버 파파고
                </ListGroupItem>
                <ListGroupItem>
                  <img src={google_icon} alt="google"/> 구글 번역기
                </ListGroupItem>
                <ListGroupItem>
                  <img src={kakao_icon} alt="kakao"/> 카카오 번역기
                </ListGroupItem>
                <ListGroupItem>
                  <img src={lafuta_icon} alt="lafuta"/> 자체 번역기
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
          </Col>
        </Row>

        <h3>Developer information</h3>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>김종운</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <div class="col">
                    <img src={jongun} width="40" height="40" alt="jongun"/>
                  </div>
                  <div class="col-10">
                <div>
                  충남대학교 컴퓨터공학과 졸업예정<br />
                  Chungnam National University a bachelor's degree due<br />
                  Web Developer for this project<p />
                  <a href="https://github.com/potionk">GitHub link</a>
                </div>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader>
                <strong>정지수</strong>
              </CardHeader>
              <CardBody>
                
              <Row>
                  <div class="col">
                    <img src={jeesu} width="40" height="40" alt="jeesu"/>
                  </div>
                  <div class="col-10">
                <div>
                  충남대학교 컴퓨터공학과 졸업예정<br />
                  Chungnam National University a bachelor's degree due<br />
                  Frontend, NMT Developer for this project<p />
                  
                  <a href="https://github.com/Jeesu-Jung">GitHub link</a>
                </div>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
