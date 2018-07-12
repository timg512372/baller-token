const BallerTokenArtifact = require("./build/contracts/BallerToken.json");
const BallerMarketArtifact = require("./build/contracts/BallerMarket.json");
const interval = require("interval-promise");
const web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");

const Web3 = new web3(
    new HDWalletProvider(
        "game saddle oyster laundry equal loop lunch allow cactus endless hover unfair",
        "https://ropsten.infura.io/Xtgr5qduGjOuTrmJZlOp"
    )
);

let ballerContract = new Web3.eth.Contract(
    BallerTokenArtifact.abi,
    "0xa271b1d143605fa891f8e5beb7de85256c623357"
);

let ballerMarketContract = new Web3.eth.Contract(
    BallerMarketArtifact.abi,
    "0xfe6acB1998ffD44B23F8431e27362274b9fF886e"
);

const firstNames = [
    "Brick",
    "Ronaldo",
    "Swish",
    "Carter",
    "Lavar",
    "Arthur",
    "Chester",
    "Jackie",
    "Tim",
    "Ryan",
    "Saturn",
    "Bob",
    "Table",
    "Steven",
    "Lebron",
    "Vincent",
    "Cornelius",
    "Avatar",
    "Venus",
    "Laura"
];

const lastNames = [
    "Ball",
    "James",
    "Dudley",
    "Moon",
    "Phlegm",
    "Brick",
    "Brandey",
    "Simpson",
    "Ni",
    "Guo",
    "Ninja",
    "Jefferson",
    "Washington",
    "Adams",
    "Lamp",
    "Microwave",
    "Jones",
    "Class",
    "Paddington",
    "Jordan"
];

const animals = [
    {
        species: "bear",
        imageUri: "https://www.dropbox.com/s/ouhj0csumoxhpam/bear_1.png?raw=1"
    },
    {
        species: "bear",
        imageUri: "https://www.dropbox.com/s/823iabuiaur4fso/bear_2.png?raw=1"
    },
    {
        species: "bear",
        imageUri: "https://www.dropbox.com/s/lvrbupa0gtik9ye/bear_3.png?raw=1"
    },
    {
        species: "bear",
        imageUri: "https://www.dropbox.com/s/eiuw2ykptm6cuh6/bear_4.png?raw=1"
    },
    {
        species: "bear",
        imageUri: "https://www.dropbox.com/s/vv4r9eod9tf9yc5/bear_5.png?raw=1"
    },
    {
        species: "bunny",
        imageUri: "https://www.dropbox.com/s/h6ktw19k0lvg256/bunny_1.png?raw=1"
    },
    {
        species: "bunny",
        imageUri: "https://www.dropbox.com/s/3dtu29q993irjil/bunny_2.png?raw=1"
    },
    {
        species: "bunny",
        imageUri: "https://www.dropbox.com/s/i0u6bnzs94plo6i/bunny_3.png?raw=1"
    },
    {
        species: "bunny",
        imageUri: "https://www.dropbox.com/s/cxxls90hg4ge31j/bunny_4.png?raw=1"
    },
    {
        species: "bunny",
        imageUri: "https://www.dropbox.com/s/19y8t5ja69i71ms/bunny_5.png?raw=1"
    },
    {
        species: "sloth",
        imageUri: "https://www.dropbox.com/s/l6scba394zpatob/sloth_1.png?raw=1"
    },
    {
        species: "sloth",
        imageUri: "https://www.dropbox.com/s/46r1tbn8wlfu10w/sloth_2.png?raw=1"
    },
    {
        species: "sloth",
        imageUri: "https://www.dropbox.com/s/i9pfvwkwuonnjuk/sloth_3.png?raw=1"
    },
    {
        species: "sloth",
        imageUri: "https://www.dropbox.com/s/6djrmsnq0jiviy3/sloth_4.png?raw=1"
    },
    {
        species: "sloth",
        imageUri: "https://www.dropbox.com/s/ksee4bycl8kefxp/sloth_5.png?raw=1"
    }
];

interval(
    async () => {
        await startMint();
    },
    300000,
    { iterations: 50000 }
);

function getName() {
    return `${firstNames[getRandomInt(0, 20)]} ${
        lastNames[getRandomInt(0, 20)]
    }`;
}

function getStats() {
    let name,
        position,
        species,
        imageSrc,
        height,
        shot,
        speed,
        age = 0,
        strength,
        confidence,
        pass,
        shift = 0;

    name = getName();

    position = getRandomInt(0, 5);

    if (position == 0) {
        let num = getRandomInt(0, animals.length);
        species = animals[num].species;
        imageSrc = animals[num].imageUri;

        if (species == "bunny") {
            height = 60;
        } else if (species == "sloth") {
            height = 80;
        } else {
            height = 100;
        }

        shot = getRandomInt(70, 90);
        speed = getRandomInt(60, 100);
        strength = getRandomInt(20, 60);
        confidence = getRandomInt(60, 100);
        pass = getRandomInt(90, 100);
    } else if (position == 1) {
        let num = getRandomInt(0, animals.length);
        species = animals[num].species;
        imageSrc = animals[num].imageUri;

        if (species == "bunny") {
            height = 60;
        } else if (species == "sloth") {
            height = 80;
        } else {
            height = 100;
        }

        shot = getRandomInt(70, 100);
        speed = getRandomInt(50, 90);
        strength = getRandomInt(40, 80);
        confidence = getRandomInt(70, 10);
        pass = getRandomInt(80, 90);
    } else if (position == 2) {
        let num = getRandomInt(0, animals.length);
        species = animals[num].species;
        imageSrc = animals[num].imageUri;

        if (species == "bunny") {
            height = 60;
        } else if (species == "sloth") {
            height = 80;
        } else {
            height = 100;
        }

        shot = getRandomInt(50, 90);
        speed = getRandomInt(40, 80);
        strength = getRandomInt(50, 90);
        confidence = getRandomInt(70, 100);
        pass = getRandomInt(50, 90);
    } else if (position == 3) {
        let num = getRandomInt(0, animals.length);
        species = animals[num].species;
        imageSrc = animals[num].imageUri;

        if (species == "bunny") {
            height = 60;
        } else if (species == "sloth") {
            height = 80;
        } else {
            height = 100;
        }

        shot = getRandomInt(70, 100);
        speed = getRandomInt(40, 80);
        strength = getRandomInt(60, 100);
        confidence = getRandomInt(50, 90);
        pass = getRandomInt(60, 80);
    } else if (position == 4) {
        let num = getRandomInt(0, animals.length);
        species = animals[num].species;
        imageSrc = animals[num].imageUri;

        if (species == "bunny") {
            height = 60;
        } else if (species == "sloth") {
            height = 80;
        } else {
            height = 100;
        }

        shot = getRandomInt(70, 100);
        speed = getRandomInt(20, 60);
        strength = getRandomInt(80, 100);
        confidence = getRandomInt(70, 100);
        pass = getRandomInt(60, 80);
    }

    const props = JSON.stringify({
        name,
        position,
        species,
        imageSrc,
        height,
        shot,
        speed,
        age,
        strength,
        confidence,
        pass,
        shift
    });

    return props;
}

async function startMint() {
    await ballerContract.methods.mint(getStats()).send(
        {
            from: "0x7299192CD862c9c5345cC47a2Ef24807436009b0",
            gas: 1000000
        },
        function() {
            return;
        }
    );

    console.log("created");

    const tokens = await ballerContract.methods
        .tokensOf("0x7299192CD862c9c5345cC47a2Ef24807436009b0")
        .call();

    await ballerContract.methods
        .approve("0xfe6acB1998ffD44B23F8431e27362274b9fF886e", tokens[0])
        .send(
            {
                from: "0x7299192CD862c9c5345cC47a2Ef24807436009b0",
                gas: 1000000
            },
            function() {
                return;
            }
        );

    console.log("approved");

    await ballerMarketContract.methods.createListing(tokens[0], 100).send(
        {
            from: "0x7299192CD862c9c5345cC47a2Ef24807436009b0",
            gas: 1000000
        },
        function() {
            return;
        }
    );

    console.log("listed");
    return;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
