import React from "react";
import TestWalletAdapter from "./TestWalletAdapter";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg py-4 nav-abs">
        <div className="container">
          <a className="navbar-brand m-0" href="/">
            <img src="images/logo.png" alt="" />
          </a>
          <div className="info d-flex justify-content-between align-items-center">
            <ul className="navbar-nav d_md_none">
              <li className="nav-item">
                <a
                  className="nav-link"
                  _role="button" _role_btn="nav-btn"
                  aria-current="page"
                  href="/"
                >
                  NFTs
                </a>
              </li>
            </ul>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNodesNinja"
              aria-controls="navbarNodesNinja"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <div className="toggle_btn_custom">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarNodesNinja">
            <ul className="navbar-nav ml-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
                {/* <TestWalletAdapter /> */}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
