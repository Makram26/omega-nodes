// import logo from './logo.svg';
import "./App.css";
import { useState } from "react";
import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  AnchorProvider,
  BN,
  Program,
  Provider,
  Wallet,
  web3,
} from "@project-serum/anchor";
import idl from "./idl.json";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";

import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

require("@solana/wallet-adapter-react-ui/styles.css");
const { default: axios } = require("axios");

const wallets = [
  /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
  new PhantomWalletAdapter(),
];

const { SystemProgram, Keypair } = web3;
const opts = {
  preflightCommitment: "processed",
};
const programID = new PublicKey(idl.metadata.address);

function NodesDetails() {
  let Location = useLocation();
  let navigate = useNavigate();

  const [solDayColor, setSolDayColor] = useState(true);
  const [solWeakColor, setSolWeakColor] = useState(false);
  const [solMonthColor, setSolMonthColor] = useState(false);
  const [walletShow, setWalletShow] = useState(false);

  const [packaged, setPackaged] = useState("2 Sol/Day");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ip, setIP] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [start_d, setStart_d] = useState("");
  const [end_d, setEnd_d] = useState("");
  const [time, setTime] = useState("");
  const [no_of_slots, setNo_Of_Slots] = useState(1);
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // let providerUrl = 'https://phantom.app/';
  // let wallet = new Wallet(providerUrl);
  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = "https://api.devnet.solana.com";
    // const network = "https://api.mainnet-beta.solana.com";
    const connection = new Connection(network, opts.preflightCommitment);

    return new AnchorProvider(connection, opts.preflightCommitment);
  }

  async function confirmTransaction() {
    // const { solana } = window;
    // console.log("12")
    // if (solana) {
    //   try {
    //     const response = await solana.connect();
    //     console.log("wallet account 12", response.publicKey.toString());
    //     // setWalletKey(response.publicKey.toString());
    //     // localStorage.setItem("wallet", response.publicKey.toString());
    //   } catch (err) {
    //     // { code: 4001, message: 'User rejected the request.' }
    //     alert('Request rejected')
    //   }
    // }

    let connection = new Connection(clusterApiUrl("devnet"));
    // let connection = new Connection(clusterApiUrl('mainnet-beta'));

    const response = await window.solana.connect();

    let transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: response.publicKey,
        toPubkey: "K3Mgp9r49PFyAJsoTGzwKzoVuWojcSrK4x4cPjvAY9M",
        lamports: 1000000000 * 2 * no_of_slots,
      })
    );
    let { blockhash } = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = response.publicKey;
    let signed = await window.solana.signTransaction(transaction);
    let txid = await connection.sendRawTransaction(signed.serialize());
    if (txid) {
      const end_d = $("#end_date").val();
      const addUserDetails = async () => {
        // const data = await axios.post(`https://mid.omeganodes.com/api/users/create`, { name, email, packaged, start_d, end_d, no_of_slots, wallet: Location.state.name })
        const url = "https://mid.omeganodes.com/api/users/create";
        try {
          const data = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              packaged,
              start_d,
              end_d,
              no_of_slots,
              wallet: Location.state.name,
            }),
            
          });
          console.log(data);
          navigate("/all-record", {
            state: { id: 1, name: Location.state.name },
          })
        } catch (error) {
          console.log(error);
        }
      };
      addUserDetails();
    } else {
      alert("Transaction Failed");
    }

    // await connection.confirmTransaction(txid);
    //     const provider = await getProvider();
    //     console.log("Provider: ", provider);
    //     const receiver = new web3.PublicKey(
    //       "8z7fAEeff5cRir9DH52cQupsfmC2Y3yPia8urFfrnhwc"
    //     );
    //     const response = await window.solana.connect();
    //     const treasury = new web3.PublicKey(response.publicKey.toString());
    //     console.log("Treasury: ", response.publicKey.toString());
    //     const lamports = new BN(
    //       solDayColor
    //         ? 1000000000 * 0.5
    //         : solWeakColor
    //         ? 1000000000 * 1
    //         : 1000000000 * 2
    // );
    /* create the program interface combining the idl, program ID, and provider */
    // const program = new Program(idl, programID, provider);
    // try {
    //   /* interact with the program via rpc */
    //   await program.methods
    //     .transferLamports(lamports)
    //     .accounts({
    //       from: treasury,
    //       to: receiver,
    //       systemProgram: SystemProgram.programId,
    //     })
    //     .rpc();
    // const program = new Program(idl, programID, provider);
    // try {
    //   /* interact with the program via rpc */
    //   await program.methods
    //     .transferLamports(lamports)
    //     .accounts({
    //       from: treasury,
    //       to: receiver,
    //       systemProgram: SystemProgram.programId,
    //     })
    //     .rpc();
    //   alert("successfully transection");

    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    // );
    // } catch (err) {
    //   console.log("Transaction error: ", err);
    // }
  }
  const ColorChangePackageHandler = (text) => {
    switch (true) {
      case text === "day":
        setSolDayColor(true);
        setSolWeakColor(false);
        setSolMonthColor(false);
        setPackaged("0.5 Sol/Day");
        break;

      case text === "weak":
        setSolDayColor(false);
        setSolWeakColor(true);
        setSolMonthColor(false);
        setPackaged("1 Sol/Weak");
        break;
      case text === "month":
        setSolDayColor(false);
        setSolWeakColor(false);
        setSolMonthColor(true);
        setPackaged("2 Sol/Month");
        break;
      default:
        break;
    }
  };
  const HandleRequest = () => {
    const mydate = new Date();
    // if(name !=""){
    //    alert(start_d)
    //    return true
    // }
    if (
      name === "" ||
      // email === "" &&
      // ip ==="" && location ===""  &&
      start_d === ""
      // time === "" &&
      // end_d === ""
    ) {
      alert("Please fill all mandatory field");
      return true;
    }
    // if (EMAIL_REGEX.test(email) === false) {
    //   alert("You have entered an invalid email address!");
    //   return true;
    // }
    if (no_of_slots < 1) {
      alert("Select No_of_slots grater then 0!");
      return true;
    }
    confirmTransaction();
    // navigate("/details", { state: { name: Location.state.name } });
  };

  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  //   if (!wallet.connected) {
  //     /* If the user's wallet is not connected, display connect wallet button. */
  //     console.log("in If condition");
  //     return (
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "center",
  //           marginTop: "100px",
  //         }}
  //       >
  //         <h3>Confirm Transaction App</h3>
  //         <WalletMultiButton />
  //       </div>
  //     );
  //   } else {
  //     console.log("in else condition");

  const handleDate = (e, duration) => {
    setStart_d(e.target.value);

    let vals = e.target.value.split("-");
    let year = vals[0];
    let month = vals[1];
    let day = vals[2];
    let day_int = parseInt(day) + duration;
    if (day_int > 30) {
      let newDay = day_int % 30;
      let newMonth = parseInt(month) + 1;
      if (newDay == 0) {
        let setNewDay = newDay + 30;
        $("#end_date")
          .val(
            year +
              "-" +
              String(newMonth).padStart(2, "0") +
              "-" +
              String(setNewDay).padStart(2, "0")
          )
          .prop("disabled", true);
      } else {
        $("#end_date")
          .val(
            year +
              "-" +
              String(newMonth).padStart(2, "0") +
              "-" +
              String(newDay).padStart(2, "0")
          )
          .prop("disabled", true);
      }
    } else {
      $("#end_date")
        .val(year + "-" + month + "-" + String(day_int).padStart(2, "0"))
        .prop("disabled", true);
    }

    // let vals = start_d.split('-');
    //     let year = vals[0];
    //     let month = vals[1];
    //     let day = vals[2];
    //     let day_int = parseInt(day) + parseInt(duration);
    //     console.log("dayssss",day_int);
    //     if (day_int > 30) {
    //         let newDay = day_int % 30
    //         let newMonth = parseInt(month) + 1
    //         if (newDay == 0) {
    //             let setNewDay = parseInt(newDay) + 30
    //             setEnd_d(year + '-' + String(newMonth).padStart(2, '0') + '-' + String(setNewDay).padStart(2, '0'))
    //         } else {
    //             setEnd_d(year + '-' + String(newMonth).padStart(2, '0') + '-' + String(newDay).padStart(2, '0'))
    //         }

    //     } else {
    //         setEnd_d(year + '-' + month + '-' + String(day_int).padStart(2, '0'))
    //     }

    //     console.log("end data",end_d)

    // const splitvalue = start_d.split("-")
    // // console.log("split", splitdata[2])
    // const dd = splitvalue[2]
    // const mm = splitvalue[1]
    // const yy = splitvalue[0]

    // if (solDayColor) {

    //   dd = dd + 1

    // }
    // else if (solWeakColor) {
    //     dd=dd+7
    //   if (dd >= 31) {
    //     let rem = dd % 30
    //     dd = dd + rem
    //   }
    // }
    // else {

    // }

    //  console.log("day",dd)
  };
  return (
    <>
      <div className="bg">
        <img src="/images/bg.png" alt="" />
      </div>
      <nav className="navbar navbar-expand-lg py-4">
        <div className="container">
          <a className="navbar-brand m-0" href="/">
            <img src="/images/logo.png" alt="" />
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <p
                className="nav-link"
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  fontFamily: "poppins",
                }}
              >
                Wallet Address
                <span style={{ color: "red" }}>
                  {" "}
                  :{" "}
                  {Location.state.name.slice(0, 4) +
                    "....." +
                    Location.state.name.slice(
                      Location.state.name.length - 8,
                      -4
                    )}
                </span>
              </p>
            </li>
          </ul>
        </div>
      </nav>
      <div className="text-center box-style">
        <p className="text-center text-white top-heading">
          Add <span>Details</span> here
        </p>
        <div className="row px-2">
          <div className="col-lg-6">
            <div className="input-container" style={{ marginRight: 30 }}>
              <label htmlFor="full">
                Full Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="input-container" style={{ marginRight: 30 }}>
              <label htmlFor="full">Email</label>
              <input
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* <div className='row px-2'>
          <div className='col-lg-6'>
            <div className='input-container' style={{ marginRight: 30 }}>
              <label htmlFor='full' >IP <span style={{ color: "red" }}>*</span></label>
              <input placeholder='Enter IP' onChange={(e)=> setIp(e.target.value)} />
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='input-container' style={{ marginRight: 30 }}>
              <label htmlFor='full' >Location <span style={{ color: "red" }}>*</span></label>
              <input placeholder='Enter Location' onChange={(e)=> setLocation(e.target.value)} />
            </div>
          </div>
        </div> */}
        <p
          className="input-container"
          style={{ color: "#FFFFFF", marginLeft: 9 }}
        >
          Selected Package <span style={{ color: "red" }}>*</span>
        </p>
        <div className="row px-2 custom-padding">
          <div
            className="col-lg-4 col-md-4"
            // onClick={() => ColorChangePackageHandler("day")}
          >
            <div
              className="input-container"
              style={{
                backgroundColor: solDayColor
                  ? "rgba(255, 255, 255, 0.095)"
                  : null,
                padding: 10,
                borderRadius: 26,
                width: "75%",
              }}
            >
              {/* {Location.state.price === 0.5 ?
                <div>
                  <img src="images/vission.png" alt="" />
                  <p>0.5 Sol/Day</p>
                </div>
                :
                Location.state.price === 1 ?
                  <div>
                    <img src="images/vission-1.png" alt="" />
                    <p>1 Sol/Weak</p>
                  </div>
                  : */}
              <div>
                <img src="images/vission.png" alt="" />
                <p>2 Sol/Month</p>
              </div>

              {/* } */}
            </div>
          </div>
          {/* <div
            className="col-lg-4 col-md-4"
            onClick={() => ColorChangePackageHandler("weak")}>
            <div
              className="input-container"
              style={{
                backgroundColor: solWeakColor
                  ? "rgba(255, 255, 255, 0.095)"
                  : null,
                padding: 10,
                borderRadius: 26,
                width: "75%",
              }}>
              <img src="images/vission-1.png" alt="" />
              <p>1 Sol/Weak</p>
            </div>
          </div> */}
          {/* <div
            className="col-lg-4 col-md-4"
            onClick={() => ColorChangePackageHandler("month")}>
            <div
              className="input-container"
              style={{
                backgroundColor: solMonthColor
                  ? "rgba(255, 255, 255, 0.095)"
                  : null,
                padding: 10,
                borderRadius: 26,
                width: "75%",
              }}>
              <img src="images/vission.png" alt="" />
              <p>2 Sol/Month</p>
            </div>
          </div> */}
        </div>

        <div className="row ps-3 pe-5">
          <div className="col-lg-4">
            <div className="input-container">
              <label htmlFor="full">
                Start Date <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                min={disablePastDate()}
                placeholder="Enter Date"
                style={{ width: "100%" }}
                onChange={(e) =>
                  handleDate(
                    e,
                    Location.state.price === 0.5
                      ? 1
                      : Location.state.price === 1
                      ? 7
                      : 30
                  )
                }
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="input-container">
              <label htmlFor="full">
                End Date <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                // value={end_d}
                // min={start_d}
                disabled={true}
                id="end_date"
                placeholder="Enter Location"
                style={{ width: "100%" }}
                // onChange={(e) =>
                //   start_d !== ""
                //     ? setEnd_d(e.target.value)
                //     : alert("Please select start date!")
                // }
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="input-container">
              <label htmlFor="full">
                No of slots <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                value={no_of_slots}
                min="1"
                onChange={(e) => setNo_Of_Slots(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          {/* <div className="col-lg-4">
            <div className="input-container">
              <label htmlFor="full">
                Time <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="time"
                placeholder="Enter Location"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div> */}
        </div>
        {/* <div className="row ps-3 pe-5">
          <div className="col-lg-5">
            <div className="input-container">
              <label htmlFor="full">
                No of slots <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                value={no_of_slots}
                min="1"
                onChange={(e) => setNo_Of_Slots(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div> */}
        <div className="text-center">
          {/* <button className="btn" onClick={() => storerecord()}>
              Checkout
            </button> */}

          <button className="btn" onClick={() => HandleRequest()}>
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

// const NodesDetails = () => (
//   <ConnectionProvider endpoint="https://api.devnet.solana.com">
//     <WalletProvider wallets={wallets} autoConnect>
//       <WalletModalProvider>
//         <App />
//       </WalletModalProvider>
//     </WalletProvider>
//   </ConnectionProvider>
// );
export default NodesDetails;
