import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import PrimeNumber from '../abis/PrimeNumber.json'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
    const networkData = PrimeNumber.networks[networkId]
    if(networkData) {
      const abi = PrimeNumber.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply })
      // Load Nfts
      for (var i = 1; i <= totalSupply; i++) {
        const prime = await contract.methods.primeNumbersNft(i - 1).call()
        this.setState({
          primeNumbersNft: [...this.state.primeNumbersNft, prime]
        })
      }
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  mint = (prime) => {
    this.state.contract.methods.mint(prime).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({
        primeNumbersNft: [...this.state.primeNumbersNft, prime]
      })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      primeNumbersNft: []
    }
  }



  render() {
    return (
      <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        
      <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Prime Number NFT 
          </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">{this.state.account}</span></small>
          </li>
        </ul>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <h1>Issue Token</h1>
              <form onSubmit={(event) => {
                event.preventDefault()
                const prime = this.prime.value
                this.mint(prime)
              }}>
                <input
                  type='text'
                  className='form-control mb-1'
                  placeholder='Prime Number'
                  ref={(input) => { this.prime = input }}
                />
                <input
                  type='submit'
                  className='btn btn-block btn-primary'
                  value='MINT'
                />
              </form>
            </div>
          </main>
        </div>
        <hr/>
        <div className="row text-center">
          { this.state.primeNumbersNft.map((prime, key) => {
            return(
              <div key={key} className="col-md-3 mb-3">
                
                {/* <div className="token" style={{ backgroundColor: color }}></div> */}
                <h1><div>{prime}</div></h1>
              </div>
            )
          })}
        </div>
      </div>
    </div>
    );
  }
}

export default App;
