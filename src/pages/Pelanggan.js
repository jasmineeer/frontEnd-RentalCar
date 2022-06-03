import { useState, useEffect } from "react";
import { Toast, Modal } from "bootstrap";
import axios from "axios";

export default function Pelanggan() {
    let [pelanggan, setPelanggan] = useState([])
    let [message, setMessage] = useState("")      
    let [idPelanggan, setIdPelanggan] = useState(0)
    let [namaPelanggan, setNamaPelanggan] = useState("")
    let [alamatPelanggan, setAlamatPelanggan] = useState("")
    let [kontak, setKontak] = useState(0)
    let [action, setAction] = useState("")    
    let [modal, setModal] = useState(null)          

    /** Get token from local storage */
    let token = localStorage.getItem(`token-rental`)

    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    /** create function to show toast messages */
    let showToast = message => {
        let myToast = new Toast(
            document.getElementById(`myToast`),
            {
                autohide: true
            }
        )
        /** perintah untuk mengisi state `message` */
        setMessage(message)

        /** show toast messages */
        myToast.show()
    }

    /** Create function to get Data Pelanggan from Back-End */
    let getData = () => {
        /**
         * endpoint = http://localhost:8080/Pelanggan 
         * method = GET
         * request = -
         * response = array data pelanggan
         * authorization = Bearer Token
         */

        let endpoint = `http://localhost:8080/pelanggan `

        /** Sending data */
        axios.get(endpoint, authorization)
        .then(response => {
            /** Simpan data di state Pelanggan */
            setPelanggan(response.data)

            /** call show toast */
            // showToast(`Data Pelanggan berhasil dimuat`)
        })
        .catch(error => console.log(error))
    }

    let tambahData = () => {
        /** show modal */
        modal.show()

        /** mengosongkan inputan form */
        setIdPelanggan(0)
        setNamaPelanggan("")
        setAlamatPelanggan("")
        setKontak(0)
        setAction(`insert`)
    }

    let editData = item => {
        /** show modal */
        modal.show()

        /** isi form sesuai data yang dipilih */
        setIdPelanggan(item.id_pelanggan)
        setNamaPelanggan(item.nama_pelanggan)
        setAlamatPelanggan(item.alamat_pelanggan)
        setKontak(item.kontak)
        setAction(`edit`)
    }

    let simpanData = event => {
        event.preventDefault()
        /** hide modal */
        modal.hide()

        if(action === `insert`) {
            let endpoint = `http://localhost:8080/pelanggan`
            let request = {
                nama_pelanggan: namaPelanggan,
                alamat_pelanggan: alamatPelanggan,
                kontak: kontak 
            }

            /** sending data */
            axios.post(endpoint, request, authorization)
            .then(response => {
                showToast(response.data.message)
                /** refresh data */
                getData()
            })
            .catch(error => console.log(error))
        } else if(action === `edit`) {
            let endpoint = `http://localhost:8080/pelanggan/${idPelanggan}`
            let request = {
                nama_pelanggan: namaPelanggan,
                alamat_pelanggan: alamatPelanggan,
                kontak: kontak 
            }

            /** sending data */
            axios.put(endpoint, request, authorization)
            .then(response => {
                showToast(response.data.message)
                /** refresh data */
                getData()
            })
            .catch(error => console.log(error))
        }
    }

    let hapusData = item => {
        if(window.confirm(`Are you sure want to delete this item?`)) {
            let endpoint = `http://localhost:8080/pelanggan/${item.id_pelanggan}`
            axios.delete(endpoint, authorization)
            .then(response => {
                /** sending data */
                showToast(response.data.message)
                /** refresh data */
                getData()
            })
            .catch(error => console.log(error))
        }
    }


    useEffect(() => {
        let modal = new Modal(document.getElementById(`modalPelanggan`))
        setModal(modal)
        getData()
    },[])

    return (
        <div className="container-fluid">

            {/* start component Toast */}
            <div className="position-fixed top-0 end-0 p-3" style={{zIndex: 11}}>
                <div className="toast bg-light" id="myToast">
                    <div className="toast-header text-white" style={{background: `pink`}}>
                        <strong>Message</strong>
                    </div>

                    <div className="toast-body">
                        {message}
                    </div>
                </div>
            </div>
            {/* end component Toast */}

            <div className="card m-2">
                <div className="card-header" style={{background: `purple`}}>
                    <h4 className="display-6 text-white">
                        Jenis Pelanggan 
                    </h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {pelanggan.map(item => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-2">
                                        <small className="text-info">
                                            ID Pelanggan
                                        </small>
                                    
                                        <h5>
                                            {item.id_pelanggan}
                                        </h5>
                                    </div>

                                    <div className="col-3">
                                        <small className="text-warning">
                                            Pelanggan
                                        </small>

                                        <h5>
                                            {item.nama_pelanggan}
                                        </h5>
                                    </div>

                                    <div className="col-3">
                                        <small className="text-danger">
                                            Alamat
                                        </small>

                                        <h5>
                                            {item.alamat_pelanggan}
                                        </h5>
                                    </div>

                                    <div className="col-2">
                                        <small className="text-danger">
                                            Kontak
                                        </small>

                                        <h5>
                                            {item.kontak}
                                        </h5>
                                    </div>

                                    <div className="col-2">
                                        <small className="text-info">
                                            Option 
                                        </small>

                                        <br />

                                        <button className="btn btn-sm btn-info mx-1" onClick={() => editData(item)}>
                                            <span className="fa fa-edit"></span>
                                        </button>

                                        <button className="btn btn-sm btn-danger" onClick={() => hapusData(item)}>
                                            <span className="fa fa-trash"></span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* button tambah */}
                    <button className="btn btn-sm btn-success my-2" onClick={() => tambahData()}>
                        <span className="fa fa-plus mx-1"></span>
                        Tambah Data 
                    </button>

                    {/* buat modal yang isinya form untuk data Pelanggan */}
                    <div className="modal" id="modalPelanggan">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header" style={{background: `pink`}}>
                                    <h4 className="text-white">
                                        Form Pelanggan 
                                    </h4>
                                </div>

                                <div className="modal-body">
                                    <form onSubmit={ev => simpanData(ev)}>
                                        Nama
                                        <input className="form-control mb-2" type="text" 
                                        onChange={e => setNamaPelanggan(e.target.value)} 
                                        value={namaPelanggan}
                                        required />

                                        Alamat
                                        <input className="form-control mb-2" type="text" 
                                        onChange={e => setAlamatPelanggan(e.target.value)} 
                                        value={alamatPelanggan}
                                        required />

                                        Kontak
                                        <input className="form-control mb-2" type="number" 
                                        onChange={e => setKontak(e.target.value)} 
                                        value={kontak}
                                        required />

                                        <button className="btn btn-success" type="submit">
                                            <span className="fa fa-check mx-1"></span>
                                            Simpan 
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end modal */}

                </div>
            </div>
        </div>
    )
}