# Crypto.com Hackathon

**Project Flow**


Compile the smart contract using hardhat followed by deploying it on the goerli testnet 

The backend can be ran using the command "node scripts/index.js" from the root directory on localhost port 3000

The frontend can be ran by launching the index.html file on a browser 

In order to mint an image use the "SUBMIT SERVICE" tab on the NavBar at the top of the page, select an image and click Submit

The backend will then use [Pinata](https://app.pinata.cloud/) APIs to run the IPFS service and then the ether.js library utilises the smart contract to mint the image

Finally the status of the minted image can be monitored through the [Alchemy mempool](https://dashboard.alchemy.com/mempool). 


**Setting up intructions**

After cloning this repository make sure to add a .env to the root directory of the backend directory


The .env file must contain the following:


1. PRIVATE_KEY --> MetaMask private key


2. API_URL --> A url provided by Alchemy that allows the backend to publish contracts to a testnet without having to run a node 


3. PUBLIC_KEY --> MetaMask public key


4. Pinata_JWT --> A JSON web token provided by Pinata to automate the IPFS process before minting

**Credits**

https://startbootstrap.com/theme/agency

www.alchemy.com

www.ethereum.org
