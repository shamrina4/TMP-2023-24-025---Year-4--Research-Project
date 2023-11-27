/**
 * SCOPE    -   Display React code and result UI
 * PAGE     -   displayResult.js
 * 
 * ================================================
 * 
 */

import React, { Component } from 'react';
import SideNavBar from '../navBar/sideNavBar';
import step1 from '../../assets/img/1.png';
import step2 from '../../assets/img/2.png';
import step3 from '../../assets/img/3.png';
import step4 from '../../assets/img/4.png';
import '../../assets/css/textAreaStyle.css';
//import ReactUI from './ReactUI.js';
import ReactHtmlParser from 'react-html-parser';
import Axios from 'axios';

const initialStates = {
    "code": '',
    "json": {},
    "generatedCode": '',
    "styles": '',
    "formBackgroundColor": '',
    "formBorderColor": '',
    "formBorderSize": '',
    "formBorderPatten": '',
    "headerFontSize": '',
    "headerBold": '',
    "headerFontColor": '',
    "labelFontSize": '',
    "labelFontColor": '',
    "inputBorderColor": '',
    "inputBorderSize": '',
    "inputBorderPattern": '',
    "inputBorderRadius": '',
    "buttonBackgroundColor": '',
    "buttonFontColor": '',
    "buttonBorderRadius": ''
}
export default class displayResultPage extends Component {

    constructor(props) {
        super(props);
        this.generateCode = this.generateCode.bind(this);
        this.state = initialStates;
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/convertToJson/getTableStructure')
            .then(response => {
                this.setState({ json: response.data });
            })
            .catch((e) => {
                console.log('Error:', e);
                alert(e.message);
            });

        Axios.get(`http://localhost:3001/templateStyle/getTemplateDetailsById/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ styles: response.data.data });
                this.setState({ formBackgroundColor: this.state.styles.formBackgroundColor });
                this.setState({ formBorderColor: this.state.styles.formBorderColor });
                this.setState({ formBorderSize: this.state.styles.formBorderSize });
                this.setState({ formBorderPatten: this.state.styles.formBorderPatten });
                this.setState({ headerBold: this.state.styles.headerBold });
                this.setState({ headerFontColor: this.state.styles.headerFontColor });
                this.setState({ labelFontSize: this.state.styles.labelFontSize });
                this.setState({ labelFontColor: this.state.styles.labelFontColor });
                this.setState({ inputBorderColor: this.state.styles.inputBorderColor });
                this.setState({ inputBorderSize: this.state.styles.inputBorderSize });
                this.setState({ inputBorderPattern: this.state.styles.inputBorderPattern });
                this.setState({ inputBorderRadius: this.state.styles.inputBorderRadius });
                this.setState({ buttonBackgroundColor: this.state.styles.buttonBackgroundColor });
                this.setState({ buttonFontColor: this.state.styles.buttonFontColor });
                this.setState({ buttonBorderRadius: this.state.styles.buttonBorderRadius });
            })
            .catch((e) => {
                console.log('Error:', e);
                alert(e.message);
            });
    }

    static getGeneratedCode(){
        return this.state.generateCode;
    }

    generateCode() {
        let data = this.state.json;
        const keys = Object.keys(data);

        let tempObj = {};

        keys.forEach((key, index) => {
            tempObj = data[key];
        });;

        let jsonStruct = JSON.parse(tempObj[0].json);

        console.log('DATA 2: ', jsonStruct.Window.Grid);

        //Loop through list
        let labelList = [];
        let buttonList = [];

        jsonStruct.Window.Grid.map(item => {
            labelList = item.Label;
            buttonList = item.Button;
        });

        //CODE GENERATION START
        let code = '<div className="' + jsonStruct.Window.$.Title + '">' + '\n';
        code = code + '\t' + '<form style={{ border: "' + this.state.formBorderSize + ' ' + this.state.formBorderPatten + ' ' + this.state.formBorderColor + '" , backgroundColor: "' + this.state.formBackgroundColor + '", width: "43%" , marginLeft: "29%"' + ' }}>' + '\n';

        code = code + '\t\t' + '<div class="formContainer" style={{textAlign: "center", margin: "24px 0 12px 0"}}>' + '\n';
        code = code + '\t\t\t' + '<h1 style={{ color: "' + this.state.headerFontColor + '" }}>' + jsonStruct.Window.$.Title + '</h1><hr/>' + '\n';
        code = code + '\t\t' + '<div>' + '\n';

        code = code + '\t\t' + '<div class="container" style={{padding: "16px"}}>' + '\n';

        //Label
        for (let i = 0; i < labelList.length; i++) {
            code = code + this.generateCodeForLabel(labelList[i].$.Content);
            code = code + this.generateCodeForInput(labelList[i].$.Content);
            code = code + '\t\t\t' + '<br /><br />' + '\n';
        }

        //Button
        for (let i = 0; i < buttonList.length; i++) {
            code = code + this.generateCodeForButton(buttonList[i].$.Content);
        }
        code = code + '\t\t\t' + '<br /><br /><br />' + '\n';
        code = code + '\t\t' + '<div>' + '\n';

        code = code + '\t' + '</form>' + '\n';
        code = code + '<div>';

        //Get the generated Code
        this.setState({ generatedCode: code });
    }

    //Code generation for label
    //Pass the style parameters as method params
    generateCodeForLabel(labelName) {
        let labelCode = '\t\t\t' + '<label style={{ float: "left", paddingTop:"5px", fontSize: "' + this.state.labelFontSize + '" }}>' + '\n';
        labelCode = labelCode + '\t\t\t\t' + '<b style={{ color: "' + this.state.labelFontColor + '"}}>' + labelName + '</b>' + '\n';
        labelCode = labelCode + '\t\t\t' + '</label>' + '\n';

        return labelCode;
    }

    //Code generation for input
    //Pass the style parameters as method params
    generateCodeForInput(labelName) {
        let inputCode = '\t\t\t' + '<input' + '\n';
        inputCode = inputCode + '\t\t\t\t' + 'type="text"' + '\n';
        inputCode = inputCode + '\t\t\t\t' + 'placeholder="Enter ' + labelName + '"' + '\n';
        inputCode = inputCode + '\t\t\t\t' + 'name="' + labelName + '"' + '\n';;
        inputCode = inputCode + '\t\t\t\t' + 'required' + '\n';
        inputCode = inputCode + '\t\t\t\t' + 'style={{ padding: "12px 20px", margin: "8px 0", width: "100%", border: "' + this.state.inputBorderSize + ' ' + this.state.inputBorderPattern + ' ' + this.state.inputBorderColor + '"}}' + '\n';
        inputCode = inputCode + '\t\t\t' + '/>' + '\n';

        return inputCode;
    }

    //Code generation for Button
    //Pass the style parameters as method params
    generateCodeForButton(buttonName) {
        let buttonCode = '\t\t\t' + '<button type="submit" style={{ padding: "14px 20px", margin: "8px 0", width: "100%", backgroundColor: "' + this.state.buttonBackgroundColor + '", color: "' + this.state.buttonFontColor + '", border: "none", borderRadius: "' + this.state.buttonBorderRadius + '"}}>' + buttonName + '</button>' + '\n';

        return buttonCode;
    }

    render() {
        return (
            <div>
                <body class="g-sidenav-show   bg-gray-100">
                    <div class="min-height-200 bg-primary position-absolute w-100"></div>
                    <SideNavBar />
                    <main class="main-content position-relative border-radius-lg ">
                        <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
                            <div class="container-fluid py-1 px-3">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                                        <li class="breadcrumb-item text-sm"><a class="opacity-5 text-white" href="">Pages</a></li>
                                        <li class="breadcrumb-item text-sm text-white active" aria-current="page">Display Code & Result</li>
                                    </ol>
                                    <h6 class="font-weight-bolder text-white mb-0">Display Code & Result</h6>
                                </nav>
                            </div>
                        </nav>
                        <div class="container-fluid py-4">
                            <div class="row">
                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                    <div class="card" style={{ flex: 1, backgroundColor: 'black' }}>
                                        <div class="card-body p-3">
                                            <div class="row">
                                                <div class="col-8">
                                                    <div class="numbers">
                                                        <h5 class="font-weight-bolder" style={{ color: 'white' }}>
                                                            XML to JSON
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div class="col-4 text-end">
                                                    <div>
                                                        <img style={{ width: '40px', height: '40px' }} src={step1} class="navbar-brand-img h-100" alt="step1" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                    <div class="card" style={{ flex: 1, backgroundColor: 'black' }}>
                                        <div class="card-body p-3">
                                            <div class="row">
                                                <div class="col-8">
                                                    <div class="numbers">
                                                        <h5 class="font-weight-bolder" style={{ color: 'white' }}>
                                                            Add Styles
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div class="col-4 text-end">
                                                    <div>
                                                        <img style={{ width: '40px', height: '40px' }} src={step2} class="navbar-brand-img h-100" alt="step2" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                    <div class="card" style={{ flex: 1, backgroundColor: 'black' }}>
                                        <div class="card-body p-3">
                                            <div class="row">
                                                <div class="col-8">
                                                    <div class="numbers">
                                                        <h5 class="font-weight-bolder" style={{ color: 'white' }}>
                                                            Display Result
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div class="col-4 text-end">
                                                    <div>
                                                        <img style={{ width: '40px', height: '40px' }} src={step3} class="navbar-brand-img h-100" alt="step3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                    <div class="card">
                                        <div class="card-body p-3">
                                            <div class="row">
                                                <div class="col-8">
                                                    <div class="numbers">
                                                        <h5 class="font-weight-bolder">
                                                            Download Code
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div class="col-4 text-end">
                                                    <div>
                                                        <img style={{ width: '40px', height: '40px' }} src={step4} class="navbar-brand-img h-100" alt="step4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div><br /><br /><br /><br /><br />
                                <div class="row">
                                    <div class="col-sm-6">
                                        <center><div class="alert alert-secondary" role="alert" style={{ color: 'white', fontFamily: 'Noto Sans, sans-serif' }}>
                                            Display React Code <br />
                                            <i><p style={{ fontSize: '14px', color: 'black', backgroundColor: "#afe0ed", marginBottom: '-1px' }}><b>(NOTE: If you want the code screen to be in light mode, click on the code screen.)</b></p></i>
                                        </div></center>
                                        <div>
                                            <button type="button" class="btn btn-success" style={{ color: 'black', marginBottom: '5px' }} onClick={this.generateCode}>Generate Code</button>
                                        </div>
                                        <div>
                                            <textarea id="xmlString" class="ui-autocomplete-input" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true" cols="55" rows="65" style={{ fontSize: 13, width: '100%', height: '530px' }} defaultValue={this.state.generatedCode}>
                                            </textarea>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <center><div class="alert alert-secondary" role="alert" style={{ color: 'white', fontFamily: 'Noto Sans, sans-serif' }}>
                                            Display Result <br />
                                            <i><p style={{ fontSize: '13px', color: 'black', backgroundColor: "#afe0ed", marginBottom: '17px' }}></p></i>
                                        </div></center>
                                    </div>
                                </div>
                                <div id = "root" style={{ marginLeft: '50%', marginTop: '-531px' }}>
                                    {/* <ReactUI /> */}
                                    {ReactHtmlParser(this.state.generatedCode)}
                                </div>
                            </div>
                            <br />
                            <div class="col-12 text-end">
                                <a class="btn bg-gradient-dark mb-0" href="/preDefineStyles"><i class="fas fa-arrow-left"></i>&nbsp;&nbsp;Back</a>
                                &nbsp;&nbsp;&nbsp;
                                <a class="btn bg-gradient-dark mb-0" href="/downloadCode">Next&nbsp;&nbsp;<i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </main>
                </body>
            </div>
        )
    }
}