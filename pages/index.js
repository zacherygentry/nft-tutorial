import { useEffect, useState } from 'react';
import MintForm from '../library/components/MintForm';
import getColorContract from '../library/color';

import web3 from '../library/web3';

export default function Home() {
  const [account, setAccount] = useState('');
  const [totalSupply, setTotalSupply] = useState(0);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    const _accounts = await web3.eth.getAccounts();
    setAccount(_accounts[0]);

    const networkId = await web3.eth.net.getId();

    if (networkId) {
      const colorContract = getColorContract(networkId);

      setTotalSupply(await colorContract.methods.totalSupply().call());
      setColors(await colorContract.methods.getColors().call());
    } else {
      alert('Smart contract is not deployed on this network');
    }
  };

  return (
    <div>
      {account}
      <MintForm address={account} />
      <h3>Total Supply: {totalSupply}</h3>
      <h3>
        Colors:{' '}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {colors.map((c, index) => (
            <div key={index}>
              <div
                style={{
                  height: '150px',
                  width: '150px',
                  borderRadius: '50%',
                  backgroundColor: c,
                }}
              ></div>
              <div>{c}</div>
            </div>
          ))}
        </div>
      </h3>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
