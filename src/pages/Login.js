import { useState } from "react";
import axios from "axios";

export default function Login() {
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")

    let loginProcess = ev => {
        // Untuk menghindari refresh/reload page
        ev.preventDefault()

        // Method: POST
        // Endpoint: http://localhost:8080/karyawan/auth
        // Request: username & password
        // Response: logged & token 

        let request = {
            username: username, 
            password: password 
        }
        let endpoint = `http://localhost:8080/karyawan/auth`

        // Sending data
        axios.post(endpoint, request) 
        .then(response => {
            if (response.data.logged === true) {
                let token = response.data.token 
                // Store token ke localStorage 
                localStorage.setItem(`token-rental`, token)
                let dataKaryawan = JSON.stringify(response.data.dataKaryawan)
                localStorage.setItem(`karyawan-rental`, dataKaryawan)
                alert(`Login Succeed`)
            } else{
                alert(response.data.message)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="container-fluid">
            <div className="card m-3">
                <div className="card-header bg-dark">
                    <h4 className="display-6 text-white">
                        Login Page 
                    </h4>
                </div>

                <div className="card-body">
                    <form onSubmit={ev => loginProcess(ev)}>
                        <h5>
                            Username 
                        </h5>
                        <input type={`text`} className="form-control mb-2" required
                        value={username} onChange={(ev) => setUsername(ev.target.value)} />

                        <h5>
                            Password 
                        </h5>
                        <input type={`password`} className="form-control mb-2" required
                        value={password} onChange={(ev) => setPassword(ev.target.value)} />

                        <button type="submit" className="btn btn-info">
                            Sign In 
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}