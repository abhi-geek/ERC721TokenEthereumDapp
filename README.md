# ERC721TokenEthereumDapp
This is a small Dapp to issue Prime Numbers as ERC721 token on Ethereum using Truffle and Ganache

step 1 : Download and setup Ganache and Metamask extention for browser (crome app store)
https://www.trufflesuite.com/ganache

strp 2 : Dowload and install truffle 
https://www.trufflesuite.com/

step 3 : Clone this project 

step 4 : make sure truffle.config.js is pointing to your network (local network in this case)

step 5 : run following commands one by one 
$truffle compile
$truffle migrate

step 6 : connect your metamask to your ganache network using Custom RPC option (http://127.0.0.1:7545 your ganache RPC server) 

one contracts are deployed (verify from ganache), run following command to get Dapp up
$npm install
$npm start

step 7 : Dapp will be running on (localhost:3000)
you can Mint Prime Numbers as ERC721 token using UI,
your metamask wallet should get prompt to approve transaction.
on success reload the browser and you can see freshly minted token on screen 

