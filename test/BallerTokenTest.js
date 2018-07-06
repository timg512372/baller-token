const BallerToken = artifacts.require("BallerToken");
import assertRevert from "zeppelin-solidity/test/helpers/assertRevert";

contract("Baller token", accounts => {
    it("Should make first account an owner", async () => {
        let instance = await BallerToken.deployed("Baller", "BALL");
        let owner = await instance.owner();
        assert.equal(owner, accounts[0]);
    });

    describe("mint", () => {
        it("creates token with specified stats", async () => {
            let instance = await BallerToken.deployed();
            let owner = await instance.owner();
            let token = await instance.mint(123123);

            let tokens = await instance.tokensOf(owner);
            let baller = await instance.getBaller(tokens[0]);
            assert.deepEqual(baller.toNumber(), 123123);
        });

        it("allows to mint only to owner", async () => {
            let instance = await BallerToken.deployed();
            let other = accounts[1];

            await instance.transferOwnership(other);
            await assertRevert(instance.mint(123123));
        });
    });
});
