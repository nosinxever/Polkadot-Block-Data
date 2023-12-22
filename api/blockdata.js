// api/blockdata.js
const { ApiPromise, WsProvider } = require('@polkadot/api');

module.exports = async (req, res) => {
    try {
        const provider = new WsProvider('wss://rpc.polkadot.io');
        const api = await ApiPromise.create({ provider });
        const latestHash = await api.rpc.chain.getBlockHash();
        const latestBlock = await api.rpc.chain.getBlock(latestHash);
        const blockNumber = latestBlock.block.header.number.toNumber();
        const extrinsicsCount = latestBlock.block.extrinsics.length;

        res.status(200).json({ blockNumber, extrinsicsCount });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
