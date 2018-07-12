const BallerToken = artifacts.require("BallerToken");
const BallerMarket = artifacts.require("BallerMarket");

contract("Market", accounts => {
    it("Should accept nft on creation", async () => {
        let nft = await BallerToken.new();
        let market = await BallerMarket.new(nft.address);
        const nftAddr = await market.nonFungibleContract();
        assert.equal(nftAddr, nft.address);
    });

    describe("createListing", () => {
        let nft, marketContract, tokens;

        before(async () => {
            nft = await BallerToken.new();
            marketContract = await BallerMarket.new(nft.address);

            await nft.mint(123123);
            tokens = await nft.tokensOf(accounts[0]);

            await nft.approve(marketContract.address, tokens[0]);
            await marketContract.createListing(tokens[0], 100);
        });

        it("Should take ownership of a token", async () => {
            const tokenOwner = await nft.ownerOf(tokens[0]);
            assert.equal(tokenOwner, marketContract.address);
        });

        it("Should create new auction", async () => {
            const market = await marketContract.tokenIdToMarket(tokens[0]);
            assert.equal(market[0], accounts[0]);
            assert.equal(market[1].toNumber(), 100);
        });
    });
});
