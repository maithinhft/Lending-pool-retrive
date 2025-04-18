import { ethers } from "ethers";
import { getPrice, sleep } from "../services/util";
import BigNumber from "bignumber.js";
import { RPC } from "../config/constants";

const COMP_ADDRESS: any = {
    cAAVE: "0xe65cdB6479BaC1e22340E4E755fAE7E509EcD06c",
    cBAT: "0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E",
    cCOMP: "0x70e36f6BF80a52b3B46b3aF8e106CC0ed743E8e4",
    cDAI: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    cETH: "0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5",
    cFEI: "0x7713DD9Ca933848F6819F38B8352D9A15EA73F67",
    cLINK: "0xFAce851a4921ce59e912d19329929CE6da6EB0c7",
    cMKR: "0x95b4eF2869eBD94BEb4eEE400a99824BF5DC325b",
    cREP: "0x158079Ee67Fce2f58472A96584A73C7Ab9AC95c1",
    cSAI: "0xF5DCe57282A584D2746FaF1593d3121Fcac444dC",
    cSUSHI: "0x4B0181102A0112A2ef11AbEE5563bb4a3176c9d7",
    cTUSD: "0x12392F67bdf24faE0AF363c24aC620a2f67DAd86",
    cUNI: "0x35A18000230DA775CAc24873d00Ff85BccdeD550",
    cUSDC: "0x39AA39c021dfbaE8faC545936693aC917d5E7563",
    cUSDP: "0x041171993284df560249B57358F931D9eB7b925D",
    cUSDT: "0xf650C3d88D12dB855b8bf7D11Be6C55A4e07dCC9",
    cWBTC: "0xC11b1268C1A384e55C48c2391d8d480264A3A7F4",
    cWBTC2: "0xccF4429DB6322D5C611ee964527D42E5d685DD6a",
    cYFI: "0x80a2AE356fc9ef4305676f7a3E2Ed04e12C33946",
    cZRX: "0xB3319f5D18Bc0D84dD1b4825Dcde5d5f7266d407",
}

const CONTROLLER_ADDRESS = "0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B";

const COMP_ABI = [
    "function compSpeeds(address) public view returns(uint)",
    "function supplyRatePerBlock() public view returns (uint)",
    "function borrowRatePerBlock() public view returns (uint)",
    "function getAssetInfo(uint8 i) public view returns (uint8 offset, address asset, address priceFeed, uint64 scale, uint64 borrowCollateralFactor, uint64 liquidateCollateralFactor, uint64 liquidationFactor, uint128 supplyCap)",
    "function markets(address cTokenAddress) view returns (bool, uint, bool)",
    "function closeFactorMantissa() view returns (uint)",
]

export class CompoundV2 {
    private token_address = COMP_ADDRESS.cDAI;
    private provider = new ethers.JsonRpcProvider(RPC['ETHEREUM']);
    constructor(token = "USDC", chain = 'ETHEREUM') {
        this.token_address = COMP_ADDRESS[token];

        if (!RPC[chain]) throw `No support ${chain}`; else
            this.provider = new ethers.JsonRpcProvider(RPC[chain]);
    }
    public async getSupplyAPR() {
        const cTokenV2Contract = new ethers.Contract(this.token_address, COMP_ABI, this.provider);

        const ethMantissa = 1e18;
        const blocksPerDay = 7200; // 12 seconds per block
        const daysPerYear = 365;
        const supplyRatePerBlock = await cTokenV2Contract.supplyRatePerBlock();
        const supplyApy = BigNumber(supplyRatePerBlock).div(ethMantissa).multipliedBy(blocksPerDay).plus(1).pow(daysPerYear).minus(1).multipliedBy(100).toFixed(2);
        return supplyApy;
        // const supplyApr = BigNumber(supplyRatePerBlock).div(ethMantissa).multipliedBy(blocksPerDay * daysPerYear).multipliedBy(100).toFixed(4);
        // return supplyApr;
    }
    public async getBorrowAPR() {
        const cTokenV2Contract = new ethers.Contract(this.token_address, COMP_ABI, this.provider);

        const ethMantissa = 1e18;
        const blocksPerDay = 7200; // 12 seconds per block
        const daysPerYear = 365;
        const borrowRatePerBlock = await cTokenV2Contract.borrowRatePerBlock();
        const borrowApy = BigNumber(borrowRatePerBlock).div(ethMantissa).multipliedBy(blocksPerDay).plus(1).pow(daysPerYear).minus(1).multipliedBy(100).toFixed(2);
        return borrowApy;
        // const borrowApr = BigNumber(borrowRatePerBlock).div(ethMantissa).multipliedBy(blocksPerDay * daysPerYear).multipliedBy(100).toFixed(4);
        // return borrowApr;
    }

    public async rewardAPR() {
        const compPrice = await getPrice('compound');
        const ethPrice = await getPrice('eth');
        // COMP reward = baseTrackingSupplySpeed * Second_per_year / baseIndexScale
        const cTokenV2Contract = new ethers.Contract(this.token_address, COMP_ABI, this.provider);

        let decimals = 10 ** 6;
        if (this.token_address == '0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5') decimals = decimals * 10 ** 12 / ethPrice; //1 ETH

        const baseTrackingSupplySpeed = await cTokenV2Contract.baseTrackingSupplySpeed();
        const trackingIndexScale = await cTokenV2Contract.trackingIndexScale();
        const totalSupply = await cTokenV2Contract.totalSupply();
        const CompSupplyApr = BigNumber(baseTrackingSupplySpeed)
            .multipliedBy(365 * 24 * 60 * 60).div(trackingIndexScale)
            .multipliedBy(decimals).div(totalSupply)
            .multipliedBy(compPrice); //COMP price
        console.log('Supply reward apr: ' + CompSupplyApr.toString());

        const baseTrackingBorrowSpeed = await cTokenV2Contract.baseTrackingBorrowSpeed();
        const totalBorrow = await cTokenV2Contract.totalBorrow();
        const CompborrowApr = BigNumber(baseTrackingBorrowSpeed)
            .multipliedBy(365 * 24 * 60 * 60).div(trackingIndexScale)
            .multipliedBy(decimals).div(totalBorrow)
            .multipliedBy(compPrice); //COMP price
        console.log('Borrow reward apr: ' + CompborrowApr.toString());
    }

    public async thresholdAndLTV() {
        const controllerContract = new ethers.Contract(CONTROLLER_ADDRESS, COMP_ABI, this.provider);

        const collateralFactorInfos = await controllerContract.markets(this.token_address);
        if (collateralFactorInfos && collateralFactorInfos.length && collateralFactorInfos.length >= 3) {
            const ltv = BigNumber(collateralFactorInfos[1]).div(10 ** 18).toFixed(2).toString();
            return ltv;
        }
        return 0;
    }
}
