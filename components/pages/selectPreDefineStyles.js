/**
 * SCOPE    -   Pre define styles selection process
 * PAGE     -   preDefineStyles.js
 * 
 * ================================================
 * 
 */

import React, { Component } from 'react'
import SideNavBar from '../navBar/sideNavBar';
import step1 from '../../assets/img/1.png';
import step2 from '../../assets/img/2.png';
import step3 from '../../assets/img/3.png';
import step4 from '../../assets/img/4.png';
import style1 from '../../assets/img/style1.jpg';
import style2 from '../../assets/img/style2.jpg';
import style3 from '../../assets/img/style3.jpg';
import style5 from '../../assets/img/style5.jpg';
import style6 from '../../assets/img/style6.jpg';
import '../../assets/css/preDefineStyles.css';
import '../../assets/css/image-zoom.css'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';

const initialStates = {
    "templateDetails": [],
    formBackgroundColor: '',
    formBorderColor: '',
    formBorderSize: '',
    formBorderPatten: '',
    headerFontSize: '',
    headerBold: '',
    headerFontColor: '',
    labelFontSize: '',
    labelFontColor: '',
    inputBorderColor: '',
    inputBorderSize: '',
    inputBorderPattern: '',
    inputBorderRadius: '',
    buttonBackgroundColor: '',
    buttonFontColor: '',
    buttonBorderRadius: '',
    templateID: ''
}
export default class preDefineStylesPage extends Component {

    constructor(props) {
        super(props);
        this.handleTemplateSelect = this.handleTemplateSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.navigateToDisplayResult = this.navigateToDisplayResult.bind(this);
        this.state = initialStates;
    }

    handleTemplateSelect(e) {
        e.preventDefault();

        let templateValue = e.target.value;

        /**
         * DESCRIPTION      -       The function written to get the pre define styles once selected & enable the fields in offer form
         * METHOD CALLS     -       setState()
         * API CALL         -       GET TEMPLATE DETAILS BY ID
         */
        Axios.get(`http://localhost:3001/templateStyle/getTemplateDetails/${templateValue}`)
            .then(result => {
                this.setState({ templateDetails: result.data.data });

                if (result.data.data.length == 0) {
                    alert('Template has no details');
                } else {
                    if (result.data.data.at(0) != null) {
                        this.setState({ formBackgroundColor: result.data.data.at(0).formBackgroundColor });
                        this.setState({ formBorderColor: result.data.data.at(0).formBorderColor });
                        this.setState({ formBorderSize: result.data.data.at(0).formBorderSize });
                        this.setState({ formBorderPatten: result.data.data.at(0).formBorderPatten });
                        this.setState({ headerFontSize: result.data.data.at(0).headerFontSize });
                        this.setState({ headerBold: result.data.data.at(0).headerBold });
                        this.setState({ headerFontColor: result.data.data.at(0).headerFontColor });
                        this.setState({ labelFontSize: result.data.data.at(0).labelFontSize });
                        this.setState({ labelFontColor: result.data.data.at(0).labelFontColor });
                        this.setState({ inputBorderColor: result.data.data.at(0).inputBorderColor });
                        this.setState({ inputBorderSize: result.data.data.at(0).inputBorderSize });
                        this.setState({ inputBorderPattern: result.data.data.at(0).inputBorderPattern });
                        this.setState({ inputBorderRadius: result.data.data.at(0).inputBorderRadius });
                        this.setState({ buttonBackgroundColor: result.data.data.at(0).buttonBackgroundColor });
                        this.setState({ buttonFontColor: result.data.data.at(0).buttonFontColor });
                        this.setState({ buttonBorderRadius: result.data.data.at(0).buttonBorderRadius });
                        this.setState({ templateID: result.data.data.at(0)._id });
                    } else {
                        console.log('Error in seting value!');
                    }

                }

            }).catch(error => {
                alert('Error :', error);
            });

    }

    /**
     * DESCRIPTION      -       The function written to capture the user input and assign it the states
     * PARAMETER        -       event (e)
     * METHOD CALLS     -       setState()
     */
    onChange(e) {
        e.persist();
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        let ID = "";
        this.state.templateDetails.map((item, index) => {
            ID = item._id;
        })

        console.log(ID);
        console.log('value', document.getElementsByClassName("formBorderColor").defaultValue);

        let updateTemplateDetails = {
            formBackgroundColor: this.state.formBackgroundColor,
            formBorderColor: this.state.formBorderColor,
            formBorderSize: this.state.formBorderSize,
            formBorderPatten: this.state.formBorderPatten,
            headerFontSize: this.state.headerFontSize,
            headerBold: this.state.headerBold,
            headerFontColor: this.state.headerFontColor,
            labelFontSize: this.state.labelFontSize,
            labelFontColor: this.state.labelFontColor,
            inputBorderColor: this.state.inputBorderColor,
            inputBorderSize: this.state.inputBorderSize,
            inputBorderPattern: this.state.inputBorderPattern,
            inputBorderRadius: this.state.inputBorderRadius,
            buttonBackgroundColor: this.state.buttonBackgroundColor,
            buttonFontColor: this.state.buttonFontColor,
            buttonBorderRadius: this.state.buttonBorderRadius
        }

        /**
        * DESCRIPTION       -       The function written to update the template style details.
        * METHOD CALLS      -       setState()
        * API CALL          -       UPDATE TEMPLATE DETAILS
        */
        Axios.put(`http://localhost:3001/templateStyle/updateTemplateDetails/${ID}`, updateTemplateDetails)
            .then(response => {
                toast.success('Style Details Updated Successfully');
            }).catch(error => {
                toast.error(error.message);
            });
    }

    navigateToDisplayResult() {
        let tempID = this.state.templateID;
        window.location = `/displayResult/${tempID}`
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
                                        <li class="breadcrumb-item text-sm text-white active" aria-current="page">Add Styles</li>
                                    </ol>
                                    <h6 class="font-weight-bolder text-white mb-0">Add Styles</h6>
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
                                    <div class="card">
                                        <div class="card-body p-3">
                                            <div class="row">
                                                <div class="col-8">
                                                    <div class="numbers">
                                                        <h5 class="font-weight-bolder">
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
                                </div>
                                <br /><br /><br /><br /><br /><br />
                                <center>
                                    <div class="card bg-light text-dark" style={{ width: '1360px' }}>
                                        <div class="alert alert-secondary" role="alert" style={{ color: 'white', fontFamily: 'Noto Sans, sans-serif' }}>
                                            Select the template style you prefer below and click the 'Submit' button. <br />
                                            (The style form will be updated automatically according to your template style selection.)
                                        </div>
                                        <div class="card-body">
                                            <div class="img-wrapper">
                                                <div class="row">
                                                    <div class="column">
                                                        <div class="p-2 mb-2 bg-dark text-white">Template Style - 01</div>
                                                        <a href={style1} class="without-caption image-link"><img src={style1} style={{ width: '100%' }} /></a>
                                                    </div>
                                                    <div class="column">
                                                        <div class="p-2 mb-2 bg-dark text-white">Template Style - 02</div>
                                                        <a href={style2} class="without-caption image-link"><img src={style2} style={{ width: '100%' }} /></a>
                                                    </div>
                                                    <div class="column">
                                                        <div class="p-2 mb-2 bg-dark text-white">Template Style - 03</div>
                                                        <a href={style3} class="without-caption image-link"><img src={style3} style={{ width: '100%' }} /></a>
                                                    </div>
                                                    <div class="column">
                                                        <div class="p-2 mb-2 bg-dark text-white">Template Style - 04</div>
                                                        <a href={style5} class="without-caption image-link"><img src={style5} style={{ width: '100%' }} /></a>
                                                    </div>
                                                    <div class="column">
                                                        <div class="p-2 mb-2 bg-dark text-white">Template Style - 05</div>
                                                        <a href={style6} class="without-caption image-link"><img src={style6} style={{ width: '100%' }} /></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <center>
                                            <div class="card bg-light text-dark" style={{ width: '800px', height: '550px' }}>
                                                <div class="card-body" style={{ backgroundColor: 'white', border: 'groove' }}>
                                                    <ToastContainer />
                                                    <div class="bg-img">
                                                        <div class="container">
                                                            <h3>STYLE FORM</h3><br />
                                                            <select name="templateStyle" onChange={this.handleTemplateSelect} id="templateStyle" style={{ width: '100%', height: '50px', borderColor: '#e0dada', borderRadius: '6px', backgroundColor: '#c8dbe8' }}>
                                                                <option disabled selected value>&nbsp;&nbsp;Select Template Style</option>
                                                                <option value="template01">&nbsp;&nbsp;Template Style - 01</option>
                                                                <option value="template02">&nbsp;&nbsp;Template Style - 02 </option>
                                                                <option value="template03">&nbsp;&nbsp;Template Style - 03</option>
                                                                <option value="template04">&nbsp;&nbsp;Template Style - 04</option>
                                                                <option value="template05">&nbsp;&nbsp;Template Style - 05</option>
                                                            </select><br /><br />
                                                            {this.state.templateDetails.length > 0 && this.state.templateDetails.map((item, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <form class="form-inline" onSubmit={this.onSubmit}>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <p><b>Styling Form - </b></p>
                                                                                </div>
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <label for="form">Background Color</label><br />
                                                                                    <input
                                                                                        type="color"
                                                                                        id="formBackgroundColor"
                                                                                        name="formBackgroundColor"
                                                                                        defaultValue={this.state.formBackgroundColor}
                                                                                        onChange={this.onChange}
                                                                                        value={this.state.formBackgroundColor}
                                                                                        style={{ width: '30%', height: '38%', borderColor: '#e0dada' }}
                                                                                    />
                                                                                </div>
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <label for="form">Border Color</label><br />
                                                                                    <input
                                                                                        type="color"
                                                                                        id="formBorderColor"
                                                                                        name="formBorderColor"
                                                                                        defaultValue={this.state.formBorderColor}
                                                                                        onChange={this.onChange}
                                                                                        value={this.state.formBorderColor}
                                                                                        style={{ width: '30%', height: '38%', borderColor: '#e0dada' }}
                                                                                    />
                                                                                </div>
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <label for="pwd">Other Border Styles</label>
                                                                                    <br />
                                                                                    <select onChange={this.onChange} defaultValue={this.state.formBorderSize} value={this.state.formBorderSize} name="formBorderSize" id="formBorderSize" tyle={{ width: '40%', height: '40%', borderColor: '#e0dada', borderRadius: '6px' }}>
                                                                                        <option value="1px">1px</option>
                                                                                        <option value="2px">2px</option>
                                                                                        <option value="3px">3px</option>
                                                                                    </select>&nbsp;&nbsp;
                                                                                    <select onChange={this.onChange} defaultValue={this.state.formBorderPatten} value={this.state.formBorderPatten} name="formBorderPatten" id="formBorderPatten" tyle={{ width: '50%', height: '40%', borderColor: '#e0dada', borderRadius: '6px' }}>
                                                                                        <option value="solid">solid</option>
                                                                                        <option value="groove">groove</option>
                                                                                        <option value="ridge">ridge</option>
                                                                                        <option value="inset">inset</option>
                                                                                        <option value="outset">outset</option>
                                                                                    </select>
                                                                                </div><br />
                                                                                <br /><br /><br /><hr /><br />
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <p><b>Styling Header - </b></p>
                                                                                </div>
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <label for="form">Font Size (px)</label><br />
                                                                                    <select onChange={this.onChange} defaultValue={this.state.headerFontSize} value={this.state.headerFontSize} name="headerFontSize" id="headerFontSize" style={{ width: '80%', height: '40%', borderColor: '#e0dada', borderRadius: '6px' }}>
                                                                                        <option value="h1">h1</option>
                                                                                        <option value="h2">h2</option>
                                                                                        <option value="h3">h3</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <label for="pwd">Bold/Unbold</label><br />
                                                                                    <select onChange={this.onChange} defaultValue={this.state.headerBold} value={this.state.headerBold} name="headerBold" id="headerBold" tyle={{ width: '80%', height: '40%', borderColor: '#e0dada', borderRadius: '6px' }}>
                                                                                        <option value="b">bold</option>
                                                                                        <option value="non">non</option>
                                                                                    </select>
                                                                                    <br /><br /><br />
                                                                                </div>
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <label for="pwd">Font Color</label><br />
                                                                                    <input
                                                                                        type="color"
                                                                                        id="headerFontColor"
                                                                                        name="headerFontColor"
                                                                                        defaultValue={this.state.headerFontColor}
                                                                                        onChange={this.onChange}
                                                                                        value={this.state.headerFontColor}
                                                                                        style={{ width: '30%', height: '38%', borderColor: '#e0dada' }}
                                                                                    /><br />
                                                                                </div>
                                                                                <br /><hr /><br />
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <p><b>Styling Label - </b></p>
                                                                                </div>
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <label for="form">Font Size (px)</label><br />
                                                                                    <select onChange={this.onChange} defaultValue={this.state.labelFontSize} value={this.state.labelFontSize} name="labelFontSize" id="labelFontSize" style={{ width: '80%', height: '40%', borderColor: '#e0dada', borderRadius: '6px' }}>
                                                                                        <option value="14px">14px</option>
                                                                                        <option value="15px">15px</option>
                                                                                        <option value="16px">16px</option>
                                                                                        <option value="17px">17px</option>
                                                                                        <option value="18px">18px</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <label for="pwd">Font Color</label><br />
                                                                                    <input
                                                                                        type="color"
                                                                                        id="labelFontColor"
                                                                                        name="labelFontColor"
                                                                                        defaultValue={this.state.labelFontColor}
                                                                                        onChange={this.onChange}
                                                                                        value={this.state.labelFontColor}
                                                                                        style={{ width: '30%', height: '38%', borderColor: '#e0dada' }}
                                                                                    /><br /><br /><br />
                                                                                </div>
                                                                                <br /><hr /><br />
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <p><b>Styling Input Field - </b></p>
                                                                                </div>
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <label for="form">Border Color</label><br />
                                                                                    <input
                                                                                        type="color"
                                                                                        id="inputBorderColor"
                                                                                        name="inputBorderColor"
                                                                                        defaultValue={this.state.inputBorderColor}
                                                                                        onChange={this.onChange}
                                                                                        value={this.state.inputBorderColor}
                                                                                        style={{ width: '30%', height: '38%', borderColor: '#e0dada' }}
                                                                                    />
                                                                                </div>
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <label for="pwd">Other Border Styles</label>
                                                                                    <br />
                                                                                    <select onChange={this.onChange} defaultValue={this.state.inputBorderSize} value={this.state.inputBorderSize} name="inputBorderSize" id="inputBorderSize" style={{ width: '40%', height: '40%', borderColor: '#e0dada', borderRadius: '6px' }}>
                                                                                        <option value="1px">1px</option>
                                                                                        <option value="2px">2px</option>
                                                                                        <option value="3px">3px</option>
                                                                                    </select>&nbsp;&nbsp;
                                                                                    <select onChange={this.onChange} defaultValue={this.state.inputBorderPattern} value={this.state.inputBorderPattern} name="inputBorderPattern" id="inputBorderPattern" style={{ width: '50%', height: '40%', borderColor: '#e0dada', borderRadius: '6px' }}>
                                                                                        <option value="solid">solid</option>
                                                                                        <option value="groove">groove</option>
                                                                                        <option value="ridge">ridge</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <label for="form">Border Radius</label><br />
                                                                                    <select onChange={this.onChange} defaultValue={this.state.inputBorderRadius} value={this.state.inputBorderRadius} name="inputBorderRadius" id="inputBorderRadius" style={{ width: '80%', height: '50%', borderColor: '#e0dada', borderRadius: '6px' }}>
                                                                                        <option value="6px">6px</option>
                                                                                        <option value="7px">7px</option>
                                                                                        <option value="8px">8px</option>
                                                                                    </select><br /><br />
                                                                                </div>
                                                                                <br />
                                                                                <br /><br /><br /><hr /><br />
                                                                            </div>
                                                                            <div class="row">
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <p><b>Styling Button - </b></p>
                                                                                </div>
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <label for="form">Background Color</label><br />
                                                                                    <input
                                                                                        type="color"
                                                                                        id="buttonBackgroundColor"
                                                                                        name="buttonBackgroundColor"
                                                                                        defaultValue={this.state.buttonBackgroundColor}
                                                                                        onChange={this.onChange}
                                                                                        value={this.state.buttonBackgroundColor}
                                                                                        style={{ width: '30%', height: '50%', borderColor: '#e0dada' }}
                                                                                    />
                                                                                </div>
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <label for="form">Font Color</label><br />
                                                                                    <input
                                                                                        type="color"
                                                                                        id="buttonFontColor"
                                                                                        name="buttonFontColor"
                                                                                        defaultValue={this.state.buttonFontColor}
                                                                                        onChange={this.onChange}
                                                                                        value={this.state.buttonFontColor}
                                                                                        style={{ width: '30%', height: '50%', borderColor: '#e0dada' }}
                                                                                    />
                                                                                </div>
                                                                                <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                                                                                    <label for="form">Button Border Radius</label><br />
                                                                                    <select onChange={this.onChange} defaultValue={this.state.buttonBorderRadius} value={this.state.buttonBorderRadius} name="buttonBorderRadius" id="buttonBorderRadius" style={{ width: '80%', height: '50%', borderColor: '#e0dada', borderRadius: '6px' }}>
                                                                                        <option value="6px">6px</option>
                                                                                        <option value="7px">7px</option>
                                                                                        <option value="8px">8px</option>
                                                                                    </select><br /><br />
                                                                                </div>
                                                                            </div>
                                                                            <br />
                                                                            <button type="submit" className="btn btn-primary" id="submitBtn" style={{ width: '20%' }}>Submit</button>
                                                                        </form>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div><br /><br /><br /><br /><br /><br /><br />
                                            <br /><br /><br /><br /><br /><br /><br /><br />
                                        </center>
                                    </div>
                                </center>
                            </div>
                            <br />
                            <div class="col-12 text-end">
                                <a class="btn bg-gradient-dark mb-0" href="/convertXmltoJson"><i class="fas fa-arrow-left"></i>&nbsp;&nbsp;Back</a>
                                &nbsp;&nbsp;&nbsp;
                                {/* <a class="btn bg-gradient-dark mb-0" href="/displayResult">Next&nbsp;&nbsp;<i class="fas fa-arrow-right"></i></a> */}
                                <a class="btn bg-gradient-dark mb-0" onClick={this.navigateToDisplayResult}>Next&nbsp;&nbsp;<i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </main>
                </body>
            </div>
        )
    }
}