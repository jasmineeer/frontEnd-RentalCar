import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";

export default function Navbar() {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Rental Mobil</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" href="/sign">Sign In</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Pelanggan</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active" href="/">Karyawan</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active" href="/">Mobil</a>
                        </li>

                        <Dropdown>
                            <DropdownToggle className="bg-light text-dark">Sewa</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="/">Form Sewa</DropdownItem>
                                <DropdownItem href="/">List Sewa</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </ul>
                </div>
            </div>
        </nav>
    )
}