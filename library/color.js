import web3 from './web3';
import Color from '../abis/Color.json';

const getColorContract = (networkId) => {
  return new web3.eth.Contract(Color.abi, Color.networks[networkId].address);
};

export default getColorContract;
