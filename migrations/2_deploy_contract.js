var BallerToken = artifacts.require("./BallerToken.sol");
var BallerMarket = artifacts.require("./BallerMarket.sol");

module.exports = async function(deployer) {
    const ballerToken = await deployer.deploy(BallerToken);

    const marketContract = await deployer.deploy(
        BallerMarket,
        BallerToken.address
    );
};
