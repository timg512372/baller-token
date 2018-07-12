require("babel-register")({
    ignore: /node_modules\/(?!zeppelin-solidity)/
});
require("babel-polyfill");

var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic =
    "game saddle oyster laundry equal loop lunch allow cactus endless hover unfair";

module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        },
        ropsten: {
            provider: new HDWalletProvider(
                mnemonic,
                "https://ropsten.infura.io/Xtgr5qduGjOuTrmJZlOp"
            ),
            network_id: 3,
            gas: 4500000
        }
    }
};
