import React, { Component } from 'react';
import { Button, Col, Input, Row, ListGroup, ListGroupItem } from 'reactstrap';
import json_icon from '../../assets/icon/json_icon.png';
var keyword = require("keyword-extractor-korean"),
  extractor = keyword();

class Keyword_extractor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target:"",
      resultJSON:""
    };
  };

  handleChange = (e) => {
    let target=e.target.value;
    this.setState({
      target: target
    })
  };

  handleSubmit = (e) => {
    this.setState({
      p_translated_text: this.state.korean_text,
    });
  }


  copy_this(index, translator) {
    let target = this.state.resultJSON;
    var t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = target;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
    alert("복사 완료!");
  }

  makeResultCard() {
    return (
      <Col>
        <ListGroup>
          <ListGroupItem key="0" active tag="button" action>result</ListGroupItem>
          <ListGroupItem key="1" tag="button" action color="success" onDoubleClick={() => this.copy_this(0)}><img src={json_icon} alt="json" />{this.state.resultJSON}</ListGroupItem>
        </ListGroup>
      </Col>
    )
  }

  extract(){
    this.setState({
      resultJSON: this.JSONtoString(extractor(this.state.target))
    })
  }

  JSONtoString(object) {
    var results = [];
    for (var property in object) {
      var value = object[property];
      if (value)
        results.push(property.toString() + ': ' + value);
    }
    return '{' + results.join(', ') + '}';
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Input type="textarea" value={this.state.input_korean_text}
              onChange={this.handleChange} rows="9" />
              <Button onClick={() => this.extract()}>Extract</Button>
          </Col>
          <Col>
            {this.makeResultCard(this.korean_text_list)}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Keyword_extractor;