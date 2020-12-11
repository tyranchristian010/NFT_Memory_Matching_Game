const { assert } = require('chai')

const MemoryToken = artifacts.require('./MemoryToken.sol')

require('chai').use(require('chai-as-promised')).should()

contract('MemoryToken', (accounts)=> {
  let token
  before(async () => {
    token=await MemoryToken.deployed()
  })
  describe('deployment', async()=>{
    it ('deploys successfully', async()=>{
      const address = token.address
      assert.notEqual(address, '')
    })
    it('has a name', async()=>{
      const name = await token.name()
      assert.equal(name, 'Memory Token')
    })
    it('has a symbol', async()=>{
      const symbol = await token.symbol()
      assert.equal(symbol, 'MMRY')
    })
  })
  describe('token distribution', async()=>{
    let result
    it ('mints tokens', async()=>{
      await token.mint(accounts[0], 'https://www.token-uri.com/nft')

      //should increment totalSupply() to 1
      result = await token.totalSupply()
      assert.equal(result.toString(), '1')

       //should increment owner balance
       result = await token.balanceOf(accounts[0])
       assert.equal(result.toString(), '1', 'owner balance correct')

       //Token should belong to owner
       result = await token.ownerOf('1')          //check the owner of token 1
       assert.equal(result.toString(), accounts[0].toString(), 'ownerOf correct') //check to see if the result is in fact accounts[0]
       result = await token.tokenOfOwnerByIndex(accounts[0], 0)

       //Owner can see all tokens
       let balanceOf = await token.balanceOf(accounts[0]) //check the owners balance which is an array
       let tokenIds = []     //we hold the tokenIds in the array
       for (let i = 0; i<balanceOf; i++){  //loop through the balance and fetch out the tokens
         let id = await token.tokenOfOwnerByIndex(accounts[0], i) //find all the ids owned by accounts[0]
         tokenIds.push(id.toString())
       }
       let expected =['1']  //we expect accounts[0] to nly own 1 NFT token at the moment
       assert.equal(tokenIds.toString(), expected.toString(), 'tokenIds are correct') //we assert that the tokenIds do in fact equal 1 for accounts[0]

       //Token URI is correct
       let tokenURI = await token.tokenURI('1')   //we fetch the tokenURI of NFT 1
       assert.equal(tokenURI, 'https://www.token-uri.com/nft') //the tokenURI of NFT 1 is in fact our original tokenURI
    })
  })
})