import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getParsedNftAccountsByOwner,
  isValidSolanaAddress,
  createConnectionConfig,
} from "@nfteyez/sol-rayz";

import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";
import "./banner.css";

type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

export default function Home() {
  const [provider, setProvider] = useState<PhantomProvider | undefined>(
    undefined
  );
  const [walletKey, setWalletKey] = useState<PhantomProvider | undefined>(
    undefined
  );
  // const [solePrice,setSolePrice]=useState<number>(0)
  var solePrice = 0;
  const [showBox, setShowBox] = useState(false);
  let navigate = useNavigate();
  const getProvider = (): PhantomProvider | undefined => {
    if ("solana" in window) {
      // @ts-ignore
      const provider = window.solana as any;
      if (provider.isPhantom) return provider as PhantomProvider;
    }
  };
  /**
   * @description prompts user to connect wallet if it exists
   */
  const connectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      try {
        const response = await solana.connect();
        setWalletKey(response.publicKey.toString());
        localStorage.setItem("wallet", response.publicKey.toString());

        navigate("/nodes-details", {
          state: {
            id: 1,
            name: response.publicKey.toString(),
            price: solePrice,
          },
        });
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
        alert("Request rejected");
      }
    }
  };

  const OnlyConnectWallet = async () => {
    const provider = await getProvider();
    if (provider) {
      // @ts-ignore
      const { solana } = window;

      if (solana) {
        try {
          const response = await solana.connect();

          checkNFT(response.publicKey.toString());
          // if(response.publicKey.toString()=="K3Mgp9r49PFyAJsoTGzwKzoVuWojcSrK4x4cPjvAY9M"){
          //   navigate("/all-record");
          // }
          // else{
          //   navigate("/all-record", {
          //     state: { id: 1, name: response.publicKey.toString()},
          //   });
          // }
        } catch (err) {
          // { code: 4001, message: 'User rejected the request.' }
          alert("Request rejected");
        }
      }
    } else {
      alert("Wallet Not Connected");
    }
  };

  // useEffect(()=>{
  // checkNFT()
  // },[])

  const checkNFT = async (wallet: any) => {
    // console.log("wallet key",wallet);

    const mint_hash = ["K3Mgp9r49PFyAJsoTGzwKzoVuWojcSrK4x4cPjvAY9M"];
    // const opts = {
    //   preflightCommitment: "processed",
    // };
    // const network = "https://api.devnet.solana.com";
    // const MY_WALLET_ADDRESS = "FriELggez2Dy3phZeHHAdpcoEXkKQVkv6tx3zDtCVP8T";
    // const connection = createConnectionConfig(clusterApiUrl("mainnet-beta"));
    const connection = createConnectionConfig(clusterApiUrl("devnet"));
    // const metaplex = new Metaplex(connection);
    const nfts = await getParsedNftAccountsByOwner({
      publicAddress: wallet,
      connection: connection,
    });
    // console.log(nfts);
    if (nfts.length === 0) {
      alert("No NFT Found in the Wallet");
      return true;
    }
    let num = 0;
    for (let c in nfts) {
      if (mint_hash.includes(nfts[c].updateAuthority)) {
        // console.log("redirect to next page");
        num = 1;
        navigate("/all-record", {
          state: { id: 1, name: wallet },
        });
      }
    }
    if (num == 0) {
      alert("You Need to Have Omega NFT in Your Wallet to Proceed");
    }

    // const token_by_owner = await connection.getParsedProgramAccounts(
    //   TOKEN_PROGRAM_ID, // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    //   {
    //     filters: [
    //       {
    //         dataSize: 165, // number of bytes
    //       },
    //       {
    //         memcmp: {
    //           offset: 32, // number of bytes
    //           bytes: MY_WALLET_ADDRESS, // base58 encoded string
    //         },
    //       },
    //     ],
    //   }
    // );
  };

  /**
   * @description disconnect Phantom wallet
   */
  const disconnectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (walletKey && solana) {
      await (solana as PhantomProvider).disconnect();
      setWalletKey(undefined);
    }
  };

  const CheckExension = async (e: number) => {
    solePrice = e;
    const provider = await getProvider();
    if (provider) {
      setProvider(provider);
      connectWallet();
    } else {
      setProvider(undefined);
      setShowBox(true);
    }
  };

  return (
    <>
      {showBox === true ? (
        <div className="alert-add">
          <div className="alert-box">
            <i
              className="fas fa-times hide_alert_box"
              onClick={() => setShowBox(false)}
            ></i>
            <h2>Add Extension for Phantom</h2>
            Click on{" "}
            <a href="https://phantom.app/" target="_blank">
              Link
            </a>{" "}
            to add the extension
          </div>
        </div>
      ) : null}
      <div className="omega-banner">
        <h2 className="text-center text-white">Omega Node</h2>
        <div className="omega-card">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-12">
                <div className="nft-img">
                  <img src="/images/new.gif" alt="" />
                </div>
                <div className="actions">
                  {/* <button>Login</button> */}
                  <button onClick={() => OnlyConnectWallet()}>
                    Manage Nodes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
