import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import { SECOND_PER_BLOCK, RPC } from "../config/constants";

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
    private tokenAddress = "";
    private provider = new ethers.JsonRpcProvider(RPC['ETHEREUM']);
    private chain = "";
    constructor(tokenAddress: string, chain = 'ETHEREUM') {
        this.tokenAddress = tokenAddress;
        this.chain = chain;

        if (!RPC[chain]) throw `No support ${chain}`; else
            this.provider = new ethers.JsonRpcProvider(RPC[chain]);
    }
    public async getSupplyAPR() {
        const cTokenV2Contract = new ethers.Contract(this.tokenAddress, COMP_ABI, this.provider);

        const ethMantissa = 1e18;
        const blocksPerDay = 24 * 60 * 60 * 1 / SECOND_PER_BLOCK[this.chain]; 
        const daysPerYear = 365;
        const supplyRatePerBlock = await cTokenV2Contract.supplyRatePerBlock();
        // const supplyApy = BigNumber(supplyRatePerBlock).div(ethMantissa).multipliedBy(blocksPerDay).plus(1).pow(daysPerYear).minus(1).toFixed(2);
        // return supplyApy;
        const supplyApr = BigNumber(supplyRatePerBlock).div(ethMantissa).multipliedBy(blocksPerDay * daysPerYear).toFixed(4);
        return supplyApr;
    }
    public async getBorrowAPR() {
        const cTokenV2Contract = new ethers.Contract(this.tokenAddress, COMP_ABI, this.provider);

        const ethMantissa = 1e18;
        const blocksPerDay = 24 * 60 * 60 * 1 / SECOND_PER_BLOCK[this.chain]; 
        const daysPerYear = 365;
        const borrowRatePerBlock = await cTokenV2Contract.borrowRatePerBlock();
        // const borrowApy = BigNumber(borrowRatePerBlock).div(ethMantissa).multipliedBy(blocksPerDay).plus(1).pow(daysPerYear).minus(1).toFixed(2);
        // return borrowApy;
        const borrowApr = BigNumber(borrowRatePerBlock).div(ethMantissa).multipliedBy(blocksPerDay * daysPerYear).toFixed(4);
        return borrowApr;
    }

    public async getLtv() {
        const controllerContract = new ethers.Contract(CONTROLLER_ADDRESS, COMP_ABI, this.provider);

        const collateralFactorInfos = await controllerContract.markets(this.tokenAddress);
        if (collateralFactorInfos && collateralFactorInfos.length && collateralFactorInfos.length >= 3) {
            const ltv = BigNumber(collateralFactorInfos[1]).div(10 ** 18).toFixed(2).toString();
            return ltv;
        }
        return 0;
    }
}
