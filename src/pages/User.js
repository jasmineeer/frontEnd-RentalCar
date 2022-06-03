import { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "bootstrap";

export default function User(){
    let [karyawan, setKaryawan] = useState([])
    let [message, setMessage] = useState("")
    let [modal, setModal] = useState(null)
    let [idKaryawan, setIdKaryawan] = useState(0)
    let [namaKaryawan, setNamaKaryawan] = useState("")
    let [alamatKaryawan, setAlamatKaryawan] = useState("")
    let [kontakKaryawanr, setKontakKaryawan] = useState(0)
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    
    let token = localStorage.getItem(`token-rental`)

    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let showToast = message => {
        let myToast = new Toast(
            document.getElementById{`myToast`},
            {
                autohide: true 
            }
        )
        setMessage(message)
        myToast.show()
    }

    let getData = () => {
        let endpoint = `http://localhost:8080/karyawan`

        axios.get(endpoint, authorization)
        .then(response => {
            setKaryawan(response.data)
        })
        .catch(error => console.log(error))
    }

    return (

    )
}