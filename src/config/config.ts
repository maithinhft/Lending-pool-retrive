import dotenv from 'dotenv';
dotenv.config();

export const proto_aave_to_chain: any = {
    "proto_mainnet_v3": 1,
    "proto_lido_v3": 1,
    "proto_etherfi_v3": 1,
    "proto_base_v3": 8453,
    "proto_arbitrum_v3": 42161,
    "proto_avalanche_v3": 43114,
    "proto_optimism_v3": 10,
    "proto_polygon_v3": 137,
    "proto_metis_v3": 1088,
    "proto_gnosis_v3": 100,
    "proto_bnb_v3": 56,
    "proto_scroll_v3": 534353,
    "proto_zksync_v3": 324,
    "proto_linea_v3": 59144,
    "proto_sonic_v3": 420,
    "proto_celo_v3": 42220,
};

export const chain_to_rpc: any = {
    "1": "https://eth.llamarpc.com",
    "0x1": "https://eth.llamarpc.com",
    "8453": "https://base.llamarpc.com",
    "0x2105": "https://base.llamarpc.com",
    "42161": process.env.RPC_ARBITRUM ?? "https://arb1.arbitrum.io/rpc",
    "0xa4b1": process.env.RPC_ARBITRUM ?? "https://arb1.arbitrum.io/rpc",
    '0x38': process.env.RPC_BNB ?? "https://binance.llamarpc.com",
};

export const chain_to_scan: any = {
    "1": "https://etherscan.io",
    "8453": "https://basescan.org",
    "42161": "https://arbiscan.io",
    "43114": "https://snowtrace.io",
    "10": "https://optimistic.etherscan.io",
    "137": "https://polygonscan.com",
    "1088": "https://andromeda-explorer.metis.io",
    "100": "https://gnosis.blockscout.com",
    "56": "https://bscscan.com",
    "534353": "https://scrollscan.com",
    "324": "https://zkscan.io",
    "59144": "https://lineascan.build",
    "420": "https://sonicscan.org",
    "42220": "https://celo.blockscout.com/",
}

export const protocol_to_addresses: any = {
    "aavev3": {
        "0x1": {
            "lendingpool": "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2",
        },
        "0xa4b1": {
            "lendingpool": "0x794a61358D6845594F94dc1DB02A252b5b4814aD",
        },
        "0x38": {
            "lendingpool": "0x6807dc923806fE8Fd134338EABCA509979a7e0cB"
        }
    },
    "radiant": {
        "0x1": {
            "lendingpool": "0xA950974f64aA33f27F6C5e017eEE93BF7588ED07",
        },
        "0xa4b1": {
            "lendingpool": "0xE23B4AE3624fB6f7cDEF29bC8EAD912f1Ede6886",
        },
        "0x38": {
            "lendingpool": "0xCcf31D54C3A94f67b8cEFF8DD771DE5846dA032c",
        }
    }
};

export const VENUS_TOKEN_ADDRESS: any = {
    'BNB': {
        "AAVE": "0xfb6115445Bff7b52FeB98650C87f44907E58f802",
        "ADA": "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
        "BCH": "0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf",
        "BETH": "0x250632378E573c6Be1AC2f97Fcdf00515d0Aa91B",
        "WBNB": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "BTCB": "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        "CAKE": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
        "DAI": "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
        "DOGE": "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
        "DOT": "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
        "ETH": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        "FDUSD": "0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409",
        "FIL": "0x0D8Ce2A99Bb6e3B7Db580eD848240e4a0F9aE153",
        "LINK": "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
        "lisUSD": "0x0782b6d8c4551B9760e74c0545a9bCD90bdc41E5",
        "LTC": "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94",
        "MATIC": "0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
        "PT-sUSDE-26JUN2025": "0xDD809435ba6c9d6903730f923038801781cA66ce",
        "SOL": "0x570A5D26f7765Ecb712C0924E4De545B89fD43dF",
        "THE": "0xF4C8E32EaDEC4BFe97E0F595AdD0f4450a863a11",
        "TRX": "0xCE7de646e7208a4Ef112cb6ed5038FA6cC6b12e3",
        "TUSD": "0x40af3827F39D0EAcBF4A168f8D4ee67c121D11c9",
        "TWT": "0x4B0F1812e5Df2A09796481Ff14017e6005508003",
        "UNI": "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
        "USDC": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        "USDe": "0x5d3a1Ff2b6BAb83b63cd9AD0787074081a52ef34",
        "USDT": "0x55d398326f99059fF775485246999027B3197955",
        "WBETH": "0xa2e3356610840701bdf5611a53974510ae27e2e1",
        "XRP": "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
        "XVS": "0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63",

        // "BUSD": "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        // "LUNA": "0x156ab3346823B651294766e23e6Cf87254d68962",
        // "SolvBTC": "0x4aae823a6a0b376De6A78e74eCC5b079d38cBCf7",
        // "sUSDe": "0x211Cc4DD073734dA055fbF44a2b4667d5E5fE5d2",
        // "SXP": "0x47BEAd2563dCBf3bF2c9407fEa4dC236fAbA485A",
        // "TRXOLD": "0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B",
        // "TUSDOLD": "0x14016E85a25aeb13065688cAFB43044C2ef86784",
        // "UST": "0x3d4350cD54aeF9f9b2C29435e0fa809957B3F30a",
        // "VAI": "0x4BD17003473389A42DAF6a0a729f6Fdb328BbBd7",
    },
    "ETHEREUM": {
        "BAL": "0xba100000625a3754423978a60c9317c58a424e3D",
        "crvUSD": "0xf939E0A03FB07F59A73314E73794Be0E57ac1b4E",
        "DAI": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        "eBTC": "0x657e8C867D8B37dCC18fA4Caead9C45EB088C642",
        "EIGEN": "0xec53bF9167f50cDEB3Ae105f56099aaaB9061F83",
        "FRAX": "0x853d955aCEf822Db058eb8505911ED77F175b99e",
        "LBTC": "0x8236a87084f8B84306f72007F36F2618A5634494",
        "sFRAX": "0xA663B02CF0a4b149d2aD41910CB81e23e1c41c32",
        "SUSDS": "0xa3931d71877C0E7a3148CB7Eb4463524FEc27fbD",
        "TUSD": "0x0000000000085d4780B73119b644AE5ecd22b376",
        "USDC": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "USDS": "0xdC035D45d973E3EC169d2276DDab16f1e407384F",
        "USDT": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        "WBTC": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        "WETH": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "weETHs": "0x917ceE801a67f933F2e6b33fC0cD1ED2d5909D88",
        "yvUSDC-1": "0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204",
        "yvUSDT-1": "0x310B7Ea7475A0B449Cfd73bE81522F1B88eFAFaa",
        "yvUSDS-1": "0x182863131F9a4630fF9E27830d945B1413e347E8",
        "yvWETH-1": "0xc56413869c6CDf96496f2b1eF801fEDBdFA7dDB0",
    },
    "ARBITRUM": {
        "ARB": "0x912ce59144191c1204e64559fe8253a0e49e6548",
        "vgmBTC-USDC": "0x47c031236e19d024b42f8AE6780E44A573170703",
        "vgmWETH-USDC": "0x70d95587d40A2caf56bd97485aB3Eec10Bee6336",
        "USDC": "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
        "USDT": "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
        "WBTC": "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
        "WETH": "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    }
}

export const VENUS_vTOKEN_ADDRESS: any = {
    "BNB": {
        "vAAVE": "0x26DA28954763B92139ED49283625ceCAf52C6f94",
        "vADA": "0x9A0AF7FDb2065Ce470D72664DE73cAE409dA28Ec",
        "vBCH": "0x5F0388EBc2B94FA8E123F404b79cCF5f40b29176",
        "vBETH": "0x972207A639CC1B374B893cc33Fa251b55CEB7c07",
        "vWBNB": "0xA07c5b74C9B40447a954e1466938b865b6BBea36",
        "vBTCB": "0x882C173bC7Ff3b7786CA16dfeD3DFFfb9Ee7847B",
        "vCAKE": "0x86aC3974e2BD0d60825230fa6F355fF11409df5c",
        "vDAI": "0x334b3eCB4DCa3593BCCC3c7EBD1A1C1d1780FBF1",
        "vDOGE": "0xec3422Ef92B2fb59e84c8B02Ba73F1fE84Ed8D71",
        "vDOT": "0x1610bc33319e9398de5f57B33a5b184c806aD217",
        "vETH": "0xf508fCD89b8bd15579dc79A6827cB4686A3592c8",
        "vFDUSD": "0xC4eF4229FEc74Ccfe17B2bdeF7715fAC740BA0ba",
        "vFIL": "0xf91d58b5aE142DAcC749f58A49FCBac340Cb0343",
        "vLINK": "0x650b940a1033B8A1b1873f78730FcFC73ec11f1f",
        "vlisUSD": "0x689E0daB47Ab16bcae87Ec18491692BF621Dc6Ab",
        "vLTC": "0x57A5297F2cB2c0AaC9D554660acd6D385Ab50c6B",
        "vMATIC": "0x5c9476FcD6a4F9a3654139721c949c2233bBbBc8",
        "vPT-sUSDE-26JUN2025": "0x9e4E5fed5Ac5B9F732d0D850A615206330Bf1866",
        "vSOL": "0xBf515bA4D1b52FFdCeaBF20d31D705Ce789F2cEC",
        "vSolvBTC": "0xf841cb62c19fCd4fF5CD0AaB5939f3140BaaC3Ea",
        "vTHE": "0x86e06EAfa6A1eA631Eab51DE500E3D474933739f",
        "vTRX": "0xC5D3466aA484B040eE977073fcF337f2c00071c1",
        "vTUSD": "0xBf762cd5991cA1DCdDaC9ae5C638F5B5Dc3Bee6E",
        "vTWT": "0x4d41a36D04D97785bcEA57b057C412b278e6Edcc",
        "vUNI": "0x27FF564707786720C71A2e5c1490A63266683612",
        "vUSDC": "0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8",
        "vUSDe": "0x74ca6930108F775CC667894EEa33843e691680d7",
        "vUSDT": "0xfD5840Cd36d94D7229439859C0112a4185BC0255",
        "vWBETH": "0x6CFdEc747f37DAf3b87a35a1D9c8AD3063A1A8A0",
        "vXRP": "0xB248a295732e0225acd3337607cc01068e3b9c10",
        "vXVS": "0x151B1e2635A717bcDc836ECd6FbB62B674FE3E1D"
        // "vBUSD": "0x95c78222B3D6e262426483D42CfA53685A67Ab9D",
        // "vLUNA": "0xb91A659E88B51474767CD97EF3196A3e7cEDD2c8", --> bỏ
        // "vsUSDe": "0x699658323d58eE25c69F1a29d476946ab011bD18", --> bỏ
        // "vSXP": "0x2fF3d0F6990a40261c66E1ff2017aCBc282EB6d0", --> bỏ
        // "vTRXOLD": "0x61eDcFe8Dd6bA3c891CB9bEc2dc7657B3B422E93", --> bỏ
        // "vTUSDOLD": "0x08CEB3F4a7ed3500cA0982bcd0FC7816688084c3", --> bỏ
        // "vUST": "0x78366446547D062f45b4C0f320cDaa6d710D87bb", --> bỏ
    },
    "ETHEREUM": {
        "vBAL": "0x0Ec5488e4F8f319213a14cab188E01fB8517Faa8",
        "vcrvUSD": "0x672208C10aaAA2F9A6719F449C4C8227bc0BC202",
        "vDAI": "0xd8AdD9B41D4E1cd64Edad8722AB0bA8D35536657",
        "veBTC": "0x325cEB02fe1C2fF816A83a5770eA0E88e2faEcF2",
        "vEIGEN": "0x256AdDBe0a387c98f487e44b85c29eb983413c5e",
        "vFRAX": "0x4fAfbDc4F2a9876Bd1764827b26fb8dc4FD1dB95",
        "vLBTC": "0x25C20e6e110A1cE3FEbaCC8b7E48368c7b2F0C91",
        "vsFRAX": "0x17142a05fe678e9584FA1d88EfAC1bF181bF7ABe",
        "vsUSDS": "0xE36Ae842DbbD7aE372ebA02C8239cd431cC063d6",
        "vTUSD": "0x13eB80FDBe5C5f4a7039728E258A6f05fb3B912b",
        "vUSDC": "0x17C07e0c232f2f80DfDbd7a95b942D893A4C5ACb",
        "vUSDS": "0x0c6B19287999f1e31a5c0a44393b24B62D2C0468",
        "vUSDT": "0x8C3e3821259B82fFb32B2450A95d2dcbf161C24E",
        "vWBTC": "0x8716554364f20BCA783cb2BAA744d39361fd1D8d",
        "vWETH": "0x7c8ff7d2A1372433726f879BD945fFb250B94c65",
        "vweETHs": "0xc42E4bfb996ED35235bda505430cBE404Eb49F77",
        "vyvUSDC-1": "0xf87c0a64dc3a8622D6c63265FA29137788163879",
        "vyvUSDT-1": "0x475d0C68a8CD275c15D1F01F4f291804E445F677",
        "vyvUSDS-1": "0x520d67226Bc904aC122dcE66ed2f8f61AA1ED764",
        "vyvWETH-1": "0xba3916302cBA4aBcB51a01e706fC6051AaF272A0"
    },
    "ARBITRUM": {
        "vARB": "0xAeB0FEd69354f34831fe1D16475D9A83ddaCaDA6",
        "vgmBTC-USDC": "0x4f3a73f318C5EA67A86eaaCE24309F29f89900dF",
        "vgmWETH-USDC": "0x9bb8cEc9C0d46F53b4f2173BB2A0221F66c353cC",
        "vUSDC": "0x7D8609f8da70fF9027E9bc5229Af4F6727662707",
        "vUSDT": "0xB9F9117d4200dC296F9AcD1e8bE1937df834a2fD",
        "vWBTC": "0xaDa57840B372D4c28623E87FC175dE8490792811",
        "vWETH": "0x68a34332983f4Bf866768DD6D6E638b02eF5e1f0",
    }
}

export const VENUS_CONTROLLER_ADDRESS: any = {
    'BNB': '0xfD36E2c2a6789Db23113685031d7F16329158384',
    'ETHEREUM': '0x687a01ecF6d3907658f7A7c714749fAC32336D1B',
    'ARBITRUM': '0x317c1A5739F39046E20b08ac9BeEa3f10fD43326',
}

export const SILOV1_TOKEN_ADDRESS: any = {
    'ARBITRUM': {
        'WETH': '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
        'USDC': '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    },
    'ETHEREUM': {},
    'BNB': {}
}

export const SILOV1_MARKET_ADDRESS: any = [
    '0x0696e6808ee11a5750733a3d821f9bb847e584fb',
    '0xa8897b4552c075e884bdb8e7b704eb10db29bf0d',
    '0x862da0a25e3dfe46df2cd4c14d79e1e4684dea4a',
    '0x170a90981843461295a6ce0e0a631ee440222e29',
    '0x7e38a9d2c99caef533e5d692ed8a2ce4b478e585',
    '0xde998e5eef06dd09ff467086610b175f179a66a0',
    '0x950aaeda8c6e806a8c889b4dbcc0361760b86249',
    '0x30c4aa967f68705ab5677ebe17b3affd0c59e71c',
    '0xfc6778a6955e1cecac448051de967f9b5ff4d647',
    '0x82622a6bdd2f1fa757a08837633971d42c17241a',
    '0x5eda4bee7ba556e65bc4fb9eed5d74e61bc1f2a9',
    '0xc0ab69fffeb5375235d8caa4f7218097bbcc0a0a',
    '0xae1eb69e880670ca47c50c9ce712ec2b48fac3b6',
    '0xa0cf37273068b461df43f1cfb58e2b2cecb56706',
    '0x033f86120c101b0480b5c70327a8e90c4ae35041',
    '0xd713ef310351055af26c6d3e20c4e629090c39a5',
    '0x69ec552be56e6505703f0c861c40039e5702037a',
]