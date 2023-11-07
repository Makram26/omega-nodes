import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

export default function AllRecord() {
  const [allLinks, setAllLinks] = useState([]);
  let Location = useLocation();
  const navigate = useNavigate();

  // console.log("My wallet", Location.state.name)
  const [states, setStates] = useState("Virginia");
  const [btnDisable, setBtnDisable] = useState(true);
  const [totalLinks, setTotalLinks] = useState(0);
  const [totalSlots, setTotalSlots] = useState(0);

  const [ip, setIp] = useState("");
  const IP_REGEX =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  const [showAlert, setShowAlert] = useState(false);
  const myAlert = () => {
    setShowAlert(true);
  };
  const closeAl = () => {
    setShowAlert(false);
  };

  const GetAllLinks = async () => {
    try {
      // let tempSlots = 0
      let tempArray = [];
      // let wallet = "kSP1HFm4viVFwwPbifF3SwD4q7wtX6gSxzuiCdhvhvv"
      const url = "https://mid.omeganodes.com/api/links/allLinksByAdmin";
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //   body: JSON.stringify({)
      });
      const res = await data.json();
      // console.log("all packages", res.allPackages)
      tempArray.push(res.allPackages);
      // console.log("active status", tempArray[0].active);
      setAllLinks(tempArray);
    } catch (error) {
      alert(error);
    }
  };

  const GetUserLinks = async () => {
    try {
      // let tempSlots = 0
      let tempArray = [];
      let wallet = Location.state.name;
      const url = "https://mid.omeganodes.com/api/links/allLinksByWallet";
      // const url = "http://localhost:5000/api/links/allLinksByWallet";
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet }),
      });
      const res = await data.json();

      setBtnDisable(true);

      // console.log("user packages", res.allPackages)

      // console.log("tempArray",tempArray);s
      tempArray.push(res.allPackages);
      // console.log("temp  record",res.allPackages.length);
      // console.log("active status",tempArray[0].active);
      setAllLinks(tempArray);
      let T_Links = 0;
      for (let i = 0; i < res.allPackages.length; i++) {
        if (res.allPackages[i].active == true) {
          T_Links = T_Links + 1;
        }
      }

      setTotalLinks(T_Links);
    } catch (error) {
      alert(error);
    }
  };
  // console.log("tempArray", totalLinks);
  const GenerateNOde = async () => {
    // let wallet = "kSP1HFm4viVFwwPbifF3SwD4q7wtX6gSxzuiCdhvhvv"
    let wallet = Location.state.name;
    const url = "https://mid.omeganodes.com/ninjaForm";
    // const url = "http://localhost:5000/ninjaForm";
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
      console.log("response", res);
      if (res === "User already exists") {
        alert("IP already exists");
        setBtnDisable(true);
        closeAl();
        return true;
      }

      GetUserLinks();
      closeAl();
    } catch (error) {
      console.log(error);
    }

    // navigate('/manage-nodes')
  };
  const DeleteNode = async () => {
    let wallet = Location.state.name;
    const url = "https://mid.omeganodes.com/ninja/remove";

    try {
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip }),
      });
      const res = await data.json();
      GetUserLinks();
      closeAl();
    } catch (error) {
      alert(error);
    }

    try {
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip }),
      });
      const res = await data.json();
      GetUserLinks();
      closeAl();
    } catch (error) {
      alert(error);
    }

    // navigate('/manage-nodes')
  };
  const GetUser = async () => {
    try {
      let tempSlots = 0;
      // let wallet = "kSP1HFm4viVFwwPbifF3SwD4q7wtX6gSxzuiCdhvhvv"
      let wallet = Location.state.name;
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

  useEffect(() => {
    // setStates(allStates)
    if (Location.state.name == "K3Mgp9r49PFyAJsoTGzwKzoVuWojcSrK4x4cPjvAY9M") {
      GetAllLinks();
    } else {
      GetUserLinks();
      GetUser();
    }
  }, []);

  const RemoveLinks = async (links_id) => {
    console.log("link", links_id);
    try {
      const url = "https://mid.omeganodes.com/ninja/remove";
      // const url = "http://localhost:5000/ninja/remove";

      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: links_id }),
      });
      const res = await data.json();
      console.log("response", res);
      alert("Links Remove successfully");
      GetUserLinks();
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("total no of slots", totalSlots);
  // console.log("total no of links", totalLinks);

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
                        <th>Delete</th>
                        {/* <th scope="col">Start Date</th>
                        <th scope="col">End Date</th> */}
                        {/* <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Force close</th> */}
                      </tr>
                    </thead>

                    <tbody>
                      {[...allLinks] &&
                        [...allLinks].map(
                          (curElem) =>
                            curElem &&
                            curElem.map((job) =>
                              job.active == true ? (
                                <tr key={job._id}>
                                  <td>{job.ip}</td>
                                  <td>https://{job.link}.omeganodes.com/</td>
                                  <td>{job.location == "154.53.49.46"?"Virginia":"Frankfurt"}</td>
                                  <td className="item-center">
                                    <i
                                      className="fas fa-trash close"
                                      onClick={() => RemoveLinks(job._id)}
                                    ></i>
                                  </td>
                                  {/* <td>{job.location}</td>
                            <td>{job.location}</td> */}
                                </tr>
                              ) : null
                            )
                          // const {_id, ip, link, location} = curElem
                        )}
                    </tbody>
                  </table>
                </div>
                <div className="text_center">
                  {totalLinks === totalSlots + 1 ? null : (
                    <button className="detail_btn" onClick={() => myAlert()}>
                      Generate link
                    </button>
                  )}
                  <button
                    type="button"
                    className="detail_btn"
                    onClick={() =>
                      navigate("/nodes-details", {
                        state: { id: 1, name: Location.state.name },
                      })
                    }
                  >
                    Buy Nodes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showAlert && (
        <div className={`alert_box ${showAlert ? "alert_active" : ""}`}>
          <div className="custom_alert form_control">
            <i className="fa fa-times close" onClick={() => closeAl()}></i>
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
                {/* <input type="text" value="Virginia" name="" id="" /> */}
                <select name="cars" id="cars" onChange={(e)=>setStates(e.target.value)}>
                {/* <option value="opel"></option> */}
                  <option value="New York">New York</option>
                  <option value="Frankfurt">Frankfurt</option>
                </select>
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
