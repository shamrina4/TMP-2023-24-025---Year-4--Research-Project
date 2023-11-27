/**
 * SCOPE    -   Display sample UI template
 * PAGE     -   ReactUI.js
 * 
 * ================================================
 *
 */

import React, { Component } from 'react'

export default class ReactUI extends Component { 
    render() {
        return (
            <div>
                <div className="LoginForm">
                    <form style={{ border: '3px solid #000000', backgroundColor: '#42e37f', width: '43%', marginLeft: '29%' }}>
                        <div class="formContainer" style={{ textAlign: 'center', margin: '24px 0 12px 0' }}>
                            <h1 style={{ color: 'white' }}>LOGIN FORM</h1><hr />
                        </div>
                        <div class="container" style={{ padding: '16px' }}>
                            <label for="uname" style={{ float: 'left', paddingTop: '5px', fontSize: '16px' }}>
                                <b style={{ color: 'white' }}>Username</b>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Username"
                                name="uname"
                                required
                                style={{ padding: '12px 20px', margin: '8px 0', border: '2px solid #ccc', width: '100%' }}
                            />
                            <br /><br />
                            <label for="psw" style={{ float: 'left', paddingTop: '5px', fontSize: '16px' }}>
                                <b style={{ color: 'white' }}>Password</b>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                name="psw"
                                required
                                style={{ padding: '12px 20px', margin: '8px 0', border: '2px solid #ccc', width: '100%' }}
                            />
                            <br /><br />
                            <button type="submit" style={{ backgroundColor: '#000000', color: 'white', padding: '14px 20px', margin: '8px 0', border: 'none', borderRadius: '7px', width: '100%' }}>Login</button>
                            <br /><br />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}