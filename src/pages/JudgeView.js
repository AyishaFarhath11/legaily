import React, { useState } from "react";
import { NFTStorage } from "nft.storage";
import WalletConnection from "./WalletConnection"; // Adjust path if needed

const API_TOKEN ="66ca35bd.0b4d4bf684054fe08fea45939d795016";
const client = new NFTStorage({ token: API_TOKEN });

export default function JudgeView() {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState("");
  const [walletAddress, setWalletAddress] = useState(null);

  const uploadFile = async () => {
    if (!file) return alert("Please select a file");
    if (!walletAddress) return alert("Please connect your wallet first");

    try {
      const cid = await client.storeBlob(new Blob([file]));
      setCid(cid);
      alert("Uploaded! CID: " + cid);

      // Optional: Save to smart contract
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "700px", margin: "auto" }}>
      <h2>Judge View</h2>

      {/* Wallet connect section */}
      <div style={{ marginBottom: "20px" }}>
        <WalletConnection setWalletAddress={setWalletAddress} />
      </div>

      {/* File upload section */}
      <div style={{ marginBottom: "20px" }}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={uploadFile} style={{ marginLeft: 10 }}>
          Upload to NFT.Storage
        </button>
      </div>

      {/* CID display */}
      {cid && (
        <p>
          File CID:{" "}
          <a href={`https://ipfs.io/ipfs/${cid}`} target="_blank" rel="noreferrer">
            {cid}
          </a>
        </p>
      )}

      {/* Wallet address display */}
      {walletAddress && (
        <p>
          Connected wallet: <b>{walletAddress}</b>
        </p>
      )}
    </div>
  );
}
