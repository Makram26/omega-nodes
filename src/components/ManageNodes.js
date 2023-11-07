import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

// const override = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };

export default function ManageNodes(props) {
  const navigate = useNavigate();
  let Location = useLocation();

  // let [loading, setLoading] = useState(true);
  // let [color, setColor] = useState("red");

  const [states, setStates] = useState("Virginia");
  const [ip, setIp] = useState("");
  const [allLinks, setAllLinks] = useState([]);
  const [totalLinks, setTotalLinks] = useState(0);
  const [totalSlots, setTotalSlots] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  // const allStates = ["Virginia"]
  let wallet = Location.state.wallet;
  const getOptionValue = (e) => {
    setStates(e.target.value);
  };

  const IP_REGEX =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const GetUser = async () => {
    try {
      let tempSlots = 0;
      // let wallet = "kSP1HFm4viVFwwPbifF3SwD4q7wtX6gSxzuiCdhvhvv"
      const url = "https://mid.omeganodes.com/api/packages/allPackagesByWallet";
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet }),
      });
      const res = await data.json();
      for (let i = 0; i < res.walletKey.length; i++) {
        tempSlots = tempSlots + res.walletKey[i].no_of_slots;
      }
      setTotalSlots(tempSlots);
    } catch (error) {
      alert(error);
    }
  };

  const GenerateNOde = async () => {
    // let wallet = "kSP1HFm4viVFwwPbifF3SwD4q7wtX6gSxzuiCdhvhvv"
    const url = "https://mid.omeganodes.com/ninjaForm";
    if (IP_REGEX.test(ip) === false) {
      alert("You have entered an invalid IP Address e.g 999.999.999.999");
      return true;
    }
    try {
      setBtnDisable(false);
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip, states, wallet }),
      });
      const res = await data.json();
      GetUser();
      GetAllLinks();
      props.closeAl();
    } catch (error) {
      alert(error);
    }

    // navigate('/manage-nodes')
  };
  const GetAllLinks = async () => {
    try {
      setBtnDisable(true);
      // let tempSlots = 0
      let tempArray = [];
      // let wallet = "kSP1HFm4viVFwwPbifF3SwD4q7wtX6gSxzuiCdhvhvv"
      const url = "https://mid.omeganodes.com/api/links/allLinksByWallet";
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet }),
      });
      const res = await data.json();
      tempArray.push(res.allPackages);
      setAllLinks(tempArray);
      setTotalLinks(res.allPackages.length);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    // setStates(allStates)
    GetUser();
    GetAllLinks();
  }, []);
  return (
    <>
      <section className="manage_nodes">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 form_default_color">
              <div className="form-wrap box">
                <div className="row justify-content-between align-items-center m-0 mb-4">
                  <div className="col-lg-1 p-0">
                    <i
                      className="fas fa-arrow-left awesome-arrow-left"
                      onClick={() => navigate("/")}
                    ></i>
                  </div>
                  <div className="col-lg-11 p-0">
                    <h2 className="text_center m-0">MANAGE NODES</h2>
                  </div>
                </div>
                <div className="tabular_content">
                  <table className="table_bordered">
                    <thead>
                      <tr>
                        {/* <th scope="col">Name</th> */}
                        <th scope="col">IP</th>
                        <th scope="col">Link</th>
                        <th scope="col">Location</th>
                        <th scope="col">Delete</th>
                        {/* <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Force close</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {[...allLinks].map(
                        (curElem) =>
                          curElem.map((job) => (
                            <tr key={job._id}>
                              <td>{job.ip}</td>
                              <td>https://{job.link}.omeganodes.com</td>
                              <td>Virginia</td>
                              <td className="item-center">
                                <i className="fas fa-times"></i>
                              </td>
                            </tr>
                          ))
                        // const {_id, ip, link, location} = curElem
                      )}
                    </tbody>
                  </table>
                </div>
                {/* <ClipLoader color={color} loading={loading}  size={150} /> */}
                {totalLinks === totalSlots ? null : (
                  <div className="text_center">
                    <button
                      className="detail_btn"
                      onClick={() => props.myAlert()}
                    >
                      Generate link
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {props.showAlert && (
        <div className={`alert_box ${props.showAlert ? "alert_active" : ""}`}>
          <div className="custom_alert form_control">
            <i
              className="fa fa-times close"
              onClick={() => props.closeAl()}
            ></i>
            <h2 className="text_center">Nodes Ninja</h2>
            <div className="form_row">
              <div className="form_col">
                <label htmlFor="ip">
                  IP
                  <span>*</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => setIp(e.target.value)}
                  name=""
                  id=""
                />
              </div>
            </div>
            <div className="form_row">
              <div className="form_col">
                <label htmlFor="ip">
                  State
                  <span>*</span>
                </label>
                <input type="text" value="Virginia" name="" id="" />
              </div>
            </div>
            {/* <div className="form_row">
            <div className="form_col">
              <label htmlFor="location">
                State
                <span>*</span>
              </label>
              <div style={{width:90,borderColor:"#000000",borderWidth:1}}>
              <h6>{states}</h6>
              </div>
              
              <select name="" id="" onChange={getOptionValue} value={states}>
                <option value="">Select</option>
                {allStates.map((curElem) => {
                  return (
                    <option key={curElem} value={curElem}>{curElem}</option>
                  )
                })}
              </select>
            </div>
          </div> */}

            {btnDisable ? (
              <div className="form_actions alert_actions">
                <button
                  type="button"
                  className=""
                  onClick={() => GenerateNOde()}
                >
                  Generate
                </button>
              </div>
            ) : (
              <div className="form_actions alert_actions">
                <button
                  type="button"
                  className=""
                  onClick={() => alert("Please wait!", btnDisable)}
                >
                  Generate
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
