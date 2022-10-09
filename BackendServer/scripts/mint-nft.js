require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const Pinata_JWT = process.env.Pinata_JWT
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
var axios = require('axios');
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const {address} = require("./deploy.js")
const contractAddress = address
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (err) {
            console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
async function pinataImage(imageData){
    var FormData = require('form-data');
    var data = new FormData();
    data.append('file', imageData);
    data.append('pinataOptions', '{"cidVersion": 1}');
    data.append('pinataMetadata', '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}');

    var config = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
      headers: { 
        'Authorization': Pinata_JWT, 
        ...data.getHeaders()
      },
      data : data
    };
    console.log(config)
    try{
        const res = await axios(config);
        const image_CID = res.data.IpfsHash
        const imgData = {
            name:"Testing",
            value:"100",
            description:"A test mint",
            CID:image_CID
        }
        const CID_json = pinataJson(imgData)
        const base_url = "https://gateway.pinata.cloud/ipfs/"
        mintNFT(`${base_url+CID_json}`)
    }
    catch(e){throw e}

    
    // pinataJSON with the image CID
}
async function pinataJson(imageData){
    // get imageData from Pinata
    
    const data = {
        "attributes": [
          {
            "trait_type": "NFT_token",
            "value": imageData.value
          },
        ],
        "description": imageData.description,
        // QmT5mGFzYeiM598XUpeVvkxTUL16yzADS7o3eBkgHwknZj
        "image": `ipfs://${imageData.CID}`,
        "name": imageData.name
      }
    // var data = JSON.stringify({
    //   "pinataOptions": {
    //     "cidVersion": 1
    //   },
    //   "pinataMetadata": {
    //     "name": "testing",
    //     "keyvalues": {
    //       "customKey": "customValue",
    //       "customKey2": "customValue2"
    //     }
    //   },
    //   "pinataContent": {
    //     "somekey": "somevalue"
    //   }
    // });

    var config = {
      method: 'post',
      url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': Pinata_JWT
      },
      data : data
};

const res = await axios(config);
const CID_json = res.data.IpfsHash
console.log(res.data.IpfsHash);
return CID_json
}
//mintNFT("https://gateway.pinata.cloud/ipfs/QmdFD8YSy9jgQdC7ATiG6fG7ZFmrVsG4roWmQn3DRGfNav")
module.exports = {pinataImage,pinataJson,mintNFT}