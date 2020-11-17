import React, {Component} from 'react';
import axios from "axios";
import {
    Button,
    Col,
    Input,
    Row,
    Card,
    CardBody,
    ListGroup,
    ListGroupItem,
    CardHeader,
    FormGroup,
    Label
} from 'reactstrap';

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
            // isMaxLenCond: false,
            // isMinLenCond: false,
            // isSizeCond: false,
            isChecked: new Array(3).fill(false),
            // min, max, size
            extractArgs: [1, 3, 10],
            isArgsValidate: [true, true, true]
            // maxLen: 3,
            // minLen: 1,
            // size: 10
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
        let isArgsValidate = this.state.isArgsValidate;
        for (let i = 0; i < 3; i++) {
            if (isArgsValidate[i]) {
                alert("입력값을 확인해주세요.");
                return;
            }
        }
        if (this.state.inputText === "") {
            alert("입력값을 확인해주세요.");
            return;
        }
        let param = {
            input: this.state.inputText,
            minLen: this.state.extractArgs[0],
            maxLen: this.state.extractArgs[1],
            size: this.state.extractArgs[2],
        };
        let engResult = [];
        await axios.post("/translate/get_eng_extracted", qs.stringify(param))
            .then(res => {
                engResult = res.data.result.split("\n");
            }).catch(error => {
                console.log('failed', error);
            })
        this.setState({
            engResult: engResult
        });
    };

    handleCheckBox = (e) => {
        let isChecked = this.state.isChecked;
        let extractArgs = this.state.extractArgs;
        switch (e.target.name) {
            case "minLen":
                isChecked[0] = e.target.checked;
                if (!e.target.checked) extractArgs[0] = 1;
                break;
            case "maxLen":
                isChecked[1] = e.target.checked;
                if (!e.target.checked) extractArgs[1] = 3;
                break;
            case "size":
                isChecked[2] = e.target.checked;
                if (!e.target.checked) extractArgs[2] = 10;
                break;
            default:
        }
        this.setState({
            isChecked: isChecked,
            extractArgs: extractArgs
        });
    }

    highlight(index) {
        let get_select_text = this.state.select_text;
        if (get_select_text[index] === "") {
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
        let result = "";
        for (let i = 0; i < getResult.length; i++) {
            if (getSelectText[i] === "success") {
                result += getResult[i] + ", ";
            }
        }
        var t = document.createElement("textarea");
        document.body.appendChild(t);
        t.value = result.substring(0, result.length - 2);
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

    handleArgsInput = (e) => {
        let extractArgs = this.state.extractArgs;
        let isArgsValidate = this.state.isArgsValidate;
        let input = e.target.value.trim();
        if (isNaN(input) || input === "") {
            isArgsValidate[e.target.dataset.index] = false;
        } else {
            isArgsValidate[e.target.dataset.index] = input >= 0;
        }
        extractArgs[e.target.dataset.index] = input;
        this.setState({
            extractArgs: extractArgs,
            isArgsValidate: isArgsValidate
        });
    };

    makeCondition() {
        let isChecked = this.state.isChecked;
        let str = ["키워드 min Length", "키워드 max Length", "키워드 갯수"]
        if (isChecked[0] || isChecked[1] || isChecked[2]) {
            return (
                <div>
                    {isChecked.map((checked, index) => (
                        checked ? (<FormGroup row key={index}>
                            <Col md="3">
                                <Label htmlFor="text-input">{str[index]}</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id={index} name={index} onChange={this.handleArgsInput}
                                       data-index={index}
                                       valid={this.state.isArgsValidate[index]}
                                       invalid={!this.state.isArgsValidate[index]}
                                       placeholder={this.state.extractArgs[index]}/>
                            </Col>

                        </FormGroup>) : <div key={index}/>
                    ))
                    }
                </div>
            )
        }
    }

    makeResultCard() {
        let engResult = this.state.engResult;
        let isInit = !(engResult.length === 1 && engResult[0] === "");
        return (
            <Col>
                <Card>
                    <CardHeader>
                        <i className="fa fa-align-justify"/><strong>키워드 추출 결과</strong>
                    </CardHeader>
                    <CardBody>
                        <ListGroup>
                            {isInit ? <ListGroupItem active action/> : <br/>}
                            {engResult.map((txt, index) => (
                                txt === "" ? <br key={index}/> : (
                                    <ListGroupItem key={index} tag="button" color={this.state.select_text[index]} action
                                                   onClick={() => this.highlight(index)}
                                                   onDoubleClick={() => this.copy_this(index)}>{txt}</ListGroupItem>
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
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"/><strong>키워드 추출 결과</strong>
                            </CardHeader>
                            <CardBody>
                                <Input type="textarea" value={this.state.inputText} onChange={this.handleChange}
                                       rows="9"/>
                                <br/>
                                <FormGroup row>
                                    <Col>
                                        <FormGroup row>
                                            <Col md="0">
                                            </Col>
                                            <Col>
                                                <FormGroup check inline>
                                                    <Input className="form-check-input" type="checkbox" id="minLen"
                                                           name="minLen" onChange={this.handleCheckBox}/>
                                                    <Label className="form-check-label" check>키워드 min Length</Label>
                                                </FormGroup>
                                                <FormGroup check inline>
                                                    <Input className="form-check-input" type="checkbox" id="maxLen"
                                                           name="maxLen" onChange={this.handleCheckBox}/>
                                                    <Label className="form-check-label" check>키워드 max Length</Label>
                                                </FormGroup>
                                                <FormGroup check inline>
                                                    <Input className="form-check-input" type="checkbox" id="size"
                                                           name="size" onChange={this.handleCheckBox}/>
                                                    <Label className="form-check-label" check>키워드 갯수</Label>
                                                </FormGroup>
                                            </Col>
                                        </FormGroup>
                                        {this.makeCondition()}
                                    </Col>
                                </FormGroup>
                                <Button onClick={this.extract}>Extract</Button>
                            </CardBody>
                        </Card>
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