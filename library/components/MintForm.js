import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import getColorContract from '../color';
import web3 from '../web3';

const MintForm = ({ address }) => {
  const router = useRouter();
  const [color, setColor] = useState('');

  const mint = async (e) => {
    e.preventDefault();

    const networkId = await web3.eth.net.getId();

    if (networkId) {
      const colorContract = getColorContract(networkId);

      await colorContract.methods.mint(color).send({ from: address });
      router.reload(window.location.pathname);
    } else {
      alert('Smart contract is not deployed on this network');
    }
  };
  return (
    <form onSubmit={mint}>
      <input onChange={(e) => setColor(e.target.value)} />
      <button type='submit'>Mint</button>
    </form>
  );
};
export default MintForm;
