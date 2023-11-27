/**
 * SCOPE    -   Convert XMl to JSON process
 * PAGE     -   convertXmlToJson.js
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
import Axios from 'axios';
import '../../assets/css/xmlToJson.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const initialStates = {
    file: '',
    xmlFile: '  No any XML File here...',
    jsonFile: '  No any JSON File here...',
}

export default class convertXmlToJsonPage extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.convertXMLToJSONFormat = this.convertXMLToJSONFormat.bind(this);
        this.state = initialStates;
    }

    componentDidMount(e) {
        document.getElementById("submitBtn").disabled = true;
        document.getElementById("xmlToJSON").disabled = true;
        document.getElementById("submitData").disabled = true;

        //Delete any existing table structures
        this.deleteExistTbStructures();
    }

    /**
     * The function written to capture the user input and assign it the states
     * @param e - event
     * Uses - setState()
     */
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    //Upload JSON file
    async onFileUpload(e) {
        const file = e.target.files[0];
        this.setState({ file: file });

        //Display toast message
        toast.success('File Uploaded Successfully!!', this.state.file);
        document.getElementById("submitBtn").disabled = false;
        document.getElementById("xmlToJSON").disabled = false;

    };

    //Submit the JSON file
    submitJSONFile = (e) => {
        e.preventDefault();

        const data = new FormData();

        this.setState({ file: this.state.jsonFile });

        data.append('file', this.state.file)

        /**
        * DESCRIPTION       -       The function written to upload the json details to project
        * API CALL          -       UPLOAD JSON FILE
        */
        axios.post('http://localhost:3001/uploadFile/upload', data)
            .then((e) => {
                toast.success('JSON File Uploaded Successfully.');
            })
            .catch((e) => {
                toast.error('JSON File Upload Error')
            })
    }

    //Submit the xml file to the frontend
    onSubmit(e) {
        e.preventDefault();

        const reader = new FileReader();

        reader.readAsText(this.state.file);

        reader.onloadend = evt => {
            const readerData = evt.target.result;

            const parser = new DOMParser();
            const xml = parser.parseFromString(readerData, "text/xml");

            console.log(
                "data",
                new XMLSerializer().serializeToString(xml.documentElement)
            );

            this.setState({ xmlFile: new XMLSerializer().serializeToString(xml.documentElement) });
        }

    }

    //Convert submitted XMl to JSON
    convertXMLToJSONFormat(e) {
        e.preventDefault();
        toast.success('Converted to JSON format successfully');
        document.getElementById("submitData").disabled = false;

        var xml = this.state.xmlFile.toString();
        let pass = {
            "xmlFile": xml
        }

        /**
        * DESCRIPTION       -       The function written to convert xml to json
        * METHOD CALLS      -       setState()
        * API CALL          -       CONVERT To JSON
        */
        Axios.post('http://localhost:3001/convertToJson/convertXmlToJson', pass)
            .then((result) => {
                console.log('RESULT :', result.data.data);
                this.setState({ jsonFile: result.data.data });

                //add JSON to backend
                var jsonString = result.data.data.toString();
                let pass2 = {
                    "json": jsonString
                }
                this.saveConvertedJSON(pass2);
            })
            .catch((e) => {
                console.log('Error :', e);
            })

    }

    /**
        * DESCRIPTION       -       The function written to store JSON details in DB
        * API CALL          -       ADD JSON TABLE STRUCTURE
        */
    saveConvertedJSON(json) {
        Axios.post('http://localhost:3001/convertToJson/addTableStructure', json)
            .then((result) => {
                console.log(result);
            })
            .catch((e) => {
                console.log('Error:', e);
            })
    }

    /**
        * DESCRIPTION       -       The function written to remove JSON details from DB
        * API CALL          -       REMOVE JSON TABLE STRUCTURE
        */
    deleteExistTbStructures() {
        Axios.delete('http://localhost:3001/convertToJson/deleteAllTableStructure')
            .then(result => {
                console.log('Existing Table deleted!');
            }).catch(error => {
                console.log('Error in deletion!');
            });
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
                                        <li class="breadcrumb-item text-sm text-white active" aria-current="page">Convert XML to JSON</li>
                                    </ol>
                                    <h6 class="font-weight-bolder text-white mb-0">Convert XML to JSON</h6>
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
                                    <div class="card">
                                        <div class="card-body p-3">
                                            <div class="row">
                                                <div class="col-8">
                                                    <div class="numbers">
                                                        <h5 class="font-weight-bolder">
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
                                </div><br /><br /><br /><br /><br /><br />
                                <center>
                                    <div class="card bg-light text-dark" style={{ width: '1300px', height: '1100px' }}>
                                        <div class="alert alert-secondary" role="alert" style={{ color: 'white', fontFamily: 'Noto Sans, sans-serif' }}>
                                            Upload XML file here
                                        </div>
                                        <div class="card-body">
                                            <center>
                                                <form onSubmit={this.onSubmit}>
                                                    <div className="form-group files" style={{ width: "590px" }}>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            id="file"
                                                            name="file"
                                                            onChange={this.onFileUpload}
                                                        />
                                                    </div>
                                                    <ToastContainer />
                                                    <button type="submit" className="btn btn-dark" id="submitBtn" style={{ width: "200px" }}>Submit File</button><br /><br />

                                                    <div class="alert alert-secondary" role="alert" style={{ color: 'white', fontFamily: 'Noto Sans, sans-serif' }}>
                                                        Convert XML to JSON
                                                    </div><br />

                                                    <div class="row">
                                                        <div class="col-xl-5 col-sm-6 mb-xl-0 mb-4">
                                                            <div class="alert alert-dark" role="alert" style={{ color: 'white', fontFamily: 'Noto Sans, sans-serif' }}>
                                                                XML File
                                                                <textarea value={this.state.xmlFile} id="xmlString" className="textAreaStyle"></textarea>
                                                            </div>
                                                        </div>
                                                        <div class="col-xl-5 col-sm-6 mb-xl-0 mb-4" style={{ marginLeft: "210px" }}>
                                                            <div class="alert alert-dark" role="alert" style={{ color: 'white', fontFamily: 'Noto Sans, sans-serif' }}>
                                                                JSON File
                                                                <textarea value={this.state.jsonFile} className="textAreaStyle"></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary" id="xmlToJSON" onClick={this.convertXMLToJSONFormat} style={{ marginTop: "-620px", width: "200px" }}>Convert XML to JSON</button><br /><br />
                                                    <button type="submit" className="btn btn-primary" id="submitData" onClick={this.submitJSONFile} style={{ marginTop: "-590px", width: "200px" }}>Submit JSON File</button>
                                                </form>
                                            </center>
                                        </div>
                                    </div></center>
                            </div><br />
                            <div class="col-12 text-end">
                                <a class="btn bg-gradient-dark mb-0" href="/preDefineStyles">Next&nbsp;&nbsp;<i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </main>
                </body>
            </div>
        )
    }
}