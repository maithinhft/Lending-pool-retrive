import { ethers } from "ethers";
import { SECOND_PER_BLOCK, RPC } from "../config/constants";
import BigNumber from "bignumber.js";
import { VENUS_CONTROLLER_ADDRESS } from "../config/config";

const VENUS_ABI = [
    "function supplyRatePerBlock() external view returns (uint256)",
    "function borrowRatePerBlock() external view returns (uint256)",
    "function markets(address cTokenAddress) view returns (bool, uint, bool)",
]

export class Venus {
    private tokenAddress = "";
    private provider = new ethers.JsonRpcProvider(RPC['BNB']);
    private chain = "";
    private controllerAddress = "";
    constructor(token = "", chain = 'BNB') {
        this.chain = chain;
        this.tokenAddress = token;
        this.provider = new ethers.JsonRpcProvider(RPC[chain]);
        this.controllerAddress = VENUS_CONTROLLER_ADDRESS[chain];
    }

    public async getSupplyAPR() {
        const vTokenContract = new ethers.Contract(this.tokenAddress, VENUS_ABI, this.provider);

        const bnbMantissa = 1e18;
        const blocksPerDay = 24 * 60 * 60 * 1 / SECOND_PER_BLOCK[this.chain];
        const daysPerYear = 365;

        const supplyRatePerBlock = await vTokenContract.supplyRatePerBlock();
        const supplyAPY = BigNumber(supplyRatePerBlock).div(bnbMantissa).multipliedBy(blocksPerDay).plus(1).pow(daysPerYear).minus(1).toFixed(4).toString();
        return supplyAPY;
        // const supplyAPR = BigNumber(supplyRatePerBlock).div(bnbMantissa).multipliedBy(blocksPerDay * daysPerYear).toString();
        // console.log("supply apr: " + supplyAPR);
    }

    public async getBorrowAPR() {
        const vTokenContract = new ethers.Contract(this.tokenAddress, VENUS_ABI, this.provider);
        const bnbMantissa = 1e18;
        const blocksPerDay = 24 * 60 * 60 * 1 / SECOND_PER_BLOCK[this.chain];
        const daysPerYear = 365;

        const borrowRatePerBlock = await vTokenContract.borrowRatePerBlock();
        const borrowAPY = BigNumber(borrowRatePerBlock).div(bnbMantissa).multipliedBy(blocksPerDay).plus(1).pow(daysPerYear).minus(1).toFixed(4).toString();
        return borrowAPY;
        // const borrowAPR = BigNumber(borrowRatePerBlock).div(bnbMantissa).multipliedBy(blocksPerDay * daysPerYear).toString();
        // console.log("borrow apr: " + borrowAPR);
    }

    public async getLtv() {
        const controllerContract = new ethers.Contract(this.controllerAddress, VENUS_ABI, this.provider);

        const collateralFactorInfos = await controllerContract.markets(this.tokenAddress);
        if (collateralFactorInfos && collateralFactorInfos.length && collateralFactorInfos.length >= 3) {
            const ltv = BigNumber(collateralFactorInfos[1]).div(10 ** 18).toFixed(2).toString();
            return ltv;
        }
        return 0;
    }
}