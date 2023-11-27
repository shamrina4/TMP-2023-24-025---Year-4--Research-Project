/**
 * SCOPE    -   Upload xml file - 1st try
 * PAGE     -   xmlFileUploader.js
 * 
 * ================================================
 * 
 */

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../assets/css/file-uploader.css';

export const FileUploader = ({ }) => {
    const [file, setFile] = useState([]);
    const onInputChange = (e) => {
        setFile(e.target.files[0])
    };

    /**
    * DESCRIPTION       -       The function written to upload the xml file to the project
    * API CALL          -       UPLOAD XML FILE
    */
    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append('file', file)

        axios.post('http://localhost:3001/uploadFile/upload', data)
            .then((e) => {
                toast.success('XML File Upload Success');
                console.log(e.data.file);
            })
            .catch((e) => {
                toast.error('XML File Upload Error');
            })
    };

    return (
        <div>
            <form method="post" action="#" id="#" onSubmit={onSubmit}>
                <div className="form-group files">
                    <input type="file"
                        onChange={onInputChange}
                        className="form-control"
                        multiple
                        required
                    />
                </div>
                <button class="btn btn-primary" style={{ width: '200px' }}>Submit</button><br />
                <button class="btn btn-primary" style={{ width: '200px' }}>Convert XML to JSON</button>
            </form>
        </div>
    )
};