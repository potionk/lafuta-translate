import React, { Component } from 'react';
import google_icon from '../../assets/icon/google_icon.png';
import kakao_icon from '../../assets/icon/kakao_icon.png';
import papago_icon from '../../assets/icon/papago_icon.png';
import lafuta_icon from '../../assets/icon/lafuta_icon.png';
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
  
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    //developer info(GitHub)
    //Translator info (w.image)
    return (
      <div>
        <b>Translator information</b>
        <Row>
          <Col>
          <Card>
              <CardHeader>
                <strong>4종 번역기 제공</strong>
              </CardHeader>
            <CardBody>
              <div>
                Lafuta Paper Translator Assistant는 한영 번역을 제공하는 논문 번역 도우미 웹입니다.<br />
                아래의 4종의 번역 결과를 제공합니다.<br />
                원하시는 번역 결과를 마음껏 편집, 이용하세요!<p />
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
                  <img src={lafuta_icon} alt="lafuta"/> Lafuta 자체 논문 번역기
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
          </Col>
        </Row>


        <b>Developer information</b>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>김종운</strong>
              </CardHeader>
              <CardBody>
                <div>
                  충남대학교 컴퓨터공학과 졸업예정<br />
                  Chungnam National University a bachelor's degree due<br />
                  Web Developer for this project<p />
                  <a href="https://github.com/potionk">GitHub link</a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader>
                <strong>정지수</strong>
              </CardHeader>
              <CardBody>
                <div>
                  충남대학교 컴퓨터공학과 졸업예정<br />
                  Chungnam National University a bachelor's degree due<br />
                  Frontend, NMT Developer for this project<p />
                  
                  <a href="https://github.com/Jeesu-Jung">GitHub link</a>
                </div>
              </CardBody>
            </Card>
            
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;