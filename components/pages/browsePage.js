/**
 * SCOPE    -   Browse xml data - 1st try
 * PAGE     -   browsePage.js
 * 
 * ===============================================
 
 */

import React, { Component } from 'react'
import { FileUploader } from './xmlFileUploader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideNavBar from '../navBar/sideNavBar';
import step1 from '../../assets/img/1.png';
import step2 from '../../assets/img/2.png';
import step3 from '../../assets/img/3.png';
import step4 from '../../assets/img/4.png';

export default class browsePage extends Component {
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
                                </div>
                            </div>
                            <br /><br /><br />
                            <center>
                                <div class="card bg-light text-dark" style={{ width: '700px' }}>
                                    <div class="alert alert-secondary" role="alert" style={{ color: 'white', fontFamily: 'Noto Sans, sans-serif' }}>
                                        Upload Your XML File here.
                                    </div>
                                    <div class="card-body">
                                        <center>
                                            <FileUploader />
                                            <ToastContainer />
                                        </center>
                                    </div>
                                </div></center>
                            <br />
                            <div class="col-12 text-end">
                                <a class="btn bg-gradient-dark mb-0" href="/addStyles">Next&nbsp;&nbsp;<i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </main>
                </body>
            </div>
        )
    }
}