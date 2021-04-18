const { assert } = require('chai')

const PrimeNumber = artifacts.require('./PrimeNumber.sol')


require('chai')
  .use(require('chai-as-promised'))
  .should()


contract('PrimeNumber', (accounts) => {

    before(async () => {
        contract = await PrimeNumber.deployed()
      })

    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = contract.address
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
        })
    })


    describe('minting', async () => {

        it('creates a new token', async () => {
          const result = await contract.mint('3')
          const totalSupply = await contract.totalSupply()
          // SUCCESS
          assert.equal(totalSupply, 1)
          const event = result.logs[0].args
          assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
          assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
          assert.equal(event.to, accounts[0], 'to is correct')
    
          // FAILURE: cannot mint same prime nft
          await contract.mint('3').should.be.rejected;
        })
      })


      describe('minting non prime', async () => {

        it('creates a new non prime token', async () => {
          // FAILURE: cannot mint non prime nft
          await contract.mint('6').should.be.rejected;
        })
      })



    describe('indexing', async () => {
        it('lists nfts', async () => {
          // Mint 2 more tokens
          await contract.mint('5')
          await contract.mint('7')
          const totalSupply = await contract.totalSupply()
    
          let prime
          let result = []
    
          for (var i = 1; i <= totalSupply; i++) {
            prime = await contract.primeNumbersNft(i - 1)
            result.push(prime)
          }
    
          let expected = [ '3', '5', '7']
          assert.equal(result.join(','), expected.join(','))
        })
      })
})