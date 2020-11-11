import React, { Component } from 'react';
import axios from "axios";
import { Button, Col, Input, Row, Card, CardBody, ListGroup, ListGroupItem, CardHeader } from 'reactstrap';
const qs = require('querystring');


class Keyword_extractor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      korean_text: "",
      select_text: new Array(10).fill(""),
      engResult: [""],
      color: [],
    };
  };

  handleChange = (e) => {
    this.setState({
      inputText: e.target.value
    });
  };


  handleSubmit = (e) => {
    this.setState({
      p_translated_text: this.state.korean_text,
    });
  }

  extract = async () => {
    let param = {
      input: this.state.inputText
    };
    let engResult=[];
    await axios.post("/translate/get_eng_extracted", qs.stringify(param))
      .then(res => {
        engResult = res.data.result.split("\n");
      }).catch(error => {
        console.log('failed', error);
      })
    this.setState({
      engResult: engResult
    });
    console.log(engResult)
  };

  highlight(index) {
    let get_select_text = this.state.select_text;
    if(get_select_text[index] === ""){
      get_select_text[index] = "success";
    } else {
      get_select_text[index] = "";
    }
    this.setState({
      select_text: get_select_text,
    });
  }

  copy_result() {
    let getSelectText = this.state.select_text;
    let getResult = this.state.engResult;
    let result="";
    for (let i = 0; i < getResult.length; i++) {
      if (getSelectText[i] === "success") {
        result += getResult[i]+", ";
      }
    }
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = result.substring(0, result.length-2);
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    alert("복사 완료!");
  }

  copy_this(index) {
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = this.state.engResult[index];
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    alert("복사 완료!");
  }

  makeResultCard() {
    let engResult = this.state.engResult;
    let isInit = engResult.length===1&&engResult[0]===""?false:true;
    return (
      <Col>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>키워드 추출 결과</strong>
          </CardHeader>
          <CardBody>
          <ListGroup>
            {isInit?<ListGroupItem active action></ListGroupItem>:<br/>}
            {engResult.map((txt, index) => (
              txt === "" ? <br key={index} /> : (  
                  <ListGroupItem key={index} tag="button" color={this.state.select_text[index]} action onClick={() => this.highlight(index)} onDoubleClick={() => this.copy_this(index)}>{txt}</ListGroupItem> 
              )
            ))}
            </ListGroup>
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
            <Input type="textarea" value={this.state.inputText} onChange={this.handleChange} rows="9" />
            <br/>
            <Button onClick={this.extract}>Extract</Button>
          </Col>
          <Col>
            {this.makeResultCard()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Keyword_extractor;