import React from "react";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div className="intro">
                <img src="images/nodes-nijna.png" alt="" />
                <p>
                  The best NFT marketplace website in the world and feel{" "}
                  <br className="d_none" /> your experience in selling or buy
                  our work
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12 pl_60">
              <h4>About</h4>
              <ul>
                <li>
                  <a href="/">Product</a>
                </li>
                <li>
                  <a href="/">Resource</a>
                </li>
                <li>
                  <a href="/">Term &amp; Condition</a>
                </li>
                <li>
                  <a href="/">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12 pl_40">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="/">Our Team</a>
                </li>
                <li>
                  <a href="/">Partner With Us</a>
                </li>
                <li>
                  <a href="/">Privacy &amp; Policy</a>
                </li>
                <li>
                  <a href="/">Features</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="/">+56459 66959 99</a>
                </li>
                <li>
                  <a href="/">muhammadali22952@sdasd.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
