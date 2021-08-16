const { assert, should } = require('chai');

const Color = artifacts.require('./Color.sol');

require('chai').use(require('chai-as-promised')).should();

contract('Color', async (accounts) => {
  let contract;

  beforeEach(async () => {
    contract = await Color.deployed();
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address;

      assert.notEqual(address, '');
      assert.notEqual(address, 0x0);
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it('has a name', async () => {
      const name = await contract.name();
      assert.equal(name, 'Color');
    });

    it('has a symbol', async () => {
      const name = await contract.symbol();
      assert.equal(name, 'CLR');
    });
  });

  describe('minting', async () => {
    it('creates a new token', async () => {
      const result = await contract.mint('#ABC123');
      const totalSupply = await contract.totalSupply();
      // Success
      assert.equal(totalSupply, 1);
      const event = result.logs[0].args;
      assert.equal(event.tokenId.toNumber(), 0, 'id is correct');
      assert.equal(
        event.from,
        '0x0000000000000000000000000000000000000000',
        'from is correct'
      );
      assert.equal(event.to, accounts[0], 'to is correct');

      // Failure
      await contract.mint('#ABC123').should.be.rejected;
    });
  });

  describe('indexing', async () => {
    it('lists colors', async () => {
      // Mint 3 tokens
      await contract.mint('#JQ6DU6');
      await contract.mint('#FFFFFF');
      await contract.mint('#000000');
      const totalSupply = await contract.totalSupply();

      let result = [];

      for (let i = 0; i < totalSupply; i++) {
        const color = await contract.colors(i);
        result.push(color);
      }

      let expected = ['#ABC123', '#JQ6DU6', '#FFFFFF', '#000000'];

      assert.equal(result.join(','), expected.join(','));
    });
  });
});
