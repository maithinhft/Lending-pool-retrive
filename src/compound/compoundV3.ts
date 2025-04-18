import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import { getPrice, sleep } from "../services/util";

const ARBITRUM_RPC = "https://arbitrum.rpc.subquery.network/public";

const provider = new ethers.JsonRpcProvider(ARBITRUM_RPC);

const COMP_ADDRESS = {
    cUSDCev3: "0xA5EDBDD9646f8dFF606d7448e414884C7d905dCA", 
    cUSDCv3: "0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf",
    cWETHv3: "0x6f7D514bbD4aFf3BcD1140B7344b32f063dEe486",
    cUSDTv3: "0xd98Be00b5D27fc98112BdE293e487f8D4cA57d07",
}

const COMP_ABI = [
    "function getUtilization() public view returns (uint64)",
    "function getSupplyRate(uint utilization) public view returns (uint64)",
    "function getBorrowRate(uint utilization) public view returns (uint64)",
    "function baseTrackingSupplySpeed() public view returns(uint)",
    "function trackingIndexScale() public view returns(uint)",
    "function totalSupply() override external view returns (uint256)",
    "function trackingBorrowIndex() public view returns (uint256)",
    "function totalBorrow() override external view returns (uint256)",
    "function baseTrackingBorrowSpeed() public view returns(uint)",
    "function getAssetInfo(uint8 i) public view returns (uint8 offset, address asset, address priceFeed, uint64 scale, uint64 borrowCollateralFactor, uint64 liquidateCollateralFactor, uint64 liquidationFactor, uint128 supplyCap)",
]

export class CompoundV3 {
    private token_address = COMP_ADDRESS.cUSDCev3;
    constructor(token = "USDCe") {
        if (token == "USDCe") this.token_address = COMP_ADDRESS.cUSDCev3;
        if (token == "USDC") this.token_address = COMP_ADDRESS.cUSDCv3;
        if (token == "WETH") this.token_address = COMP_ADDRESS.cWETHv3;
        if (token == "USDT") this.token_address = COMP_ADDRESS.cUSDTv3;
    }
    public async getSupplyAPR() {
        const cTokenv3Contract = new ethers.Contract(this.token_address, COMP_ABI, provider);
    
        const SecondsPerYear = 60 * 60 * 24 * 365
        const Utilization = await cTokenv3Contract.getUtilization()
        const SupplyRate = await cTokenv3Contract.getSupplyRate(Utilization)
        const SupplyAPR = parseInt(SupplyRate) / (10 ** 18) * SecondsPerYear * 100
        return SupplyAPR;
    }   
    public async getBorrowAPR() {
        const cTokenv3Contract = new ethers.Contract(this.token_address, COMP_ABI, provider);
    
        const SecondsPerYear = 60 * 60 * 24 * 365
        const Utilization = await cTokenv3Contract.getUtilization()
        const BorrowRate = await cTokenv3Contract.getBorrowRate(Utilization)
        const SupplyAPR = parseInt(BorrowRate) / (10 ** 18) * SecondsPerYear * 100
        return SupplyAPR;
    }

    public async rewardAPR() {
        const compPrice = await getPrice('compound');
        const ethPrice = await getPrice('eth');
        // COMP reward = baseTrackingSupplySpeed * Second_per_year / baseIndexScale
        const cTokenv3Contract = new ethers.Contract(this.token_address, COMP_ABI, provider);

        let decimals = 10 ** 6; 
        if (this.token_address == '0x6f7D514bbD4aFf3BcD1140B7344b32f063dEe486') decimals = decimals * 10 ** 12 / ethPrice; //1 ETH

        
        const baseTrackingSupplySpeed = await cTokenv3Contract.baseTrackingSupplySpeed();
        const trackingIndexScale = await cTokenv3Contract.trackingIndexScale();
        const totalSupply = await cTokenv3Contract.totalSupply();
        const CompSupplyApr = BigNumber(baseTrackingSupplySpeed)
                        .multipliedBy(365 * 24 * 60 * 60).div(trackingIndexScale)
                        .multipliedBy(decimals).div(totalSupply)
                        .multipliedBy(compPrice); //COMP price
        console.log('Supply reward apr: ' + CompSupplyApr.toString());

        const baseTrackingBorrowSpeed = await cTokenv3Contract.baseTrackingBorrowSpeed();
        const totalBorrow = await cTokenv3Contract.totalBorrow();
        const CompborrowApr = BigNumber(baseTrackingBorrowSpeed)
                        .multipliedBy(365 * 24 * 60 * 60).div(trackingIndexScale)
                        .multipliedBy(decimals).div(totalBorrow)
                        .multipliedBy(compPrice); //COMP price
        console.log('Borrow reward apr: ' + CompborrowApr.toString());
    }

    public async thresholdAndLTV() {
        const cTokenv3Contract = new ethers.Contract(this.token_address, COMP_ABI, provider);
        for (let i=0; i<=7; i++) {
            console.log(await cTokenv3Contract.getAssetInfo(i))
            await sleep(1000);
        }
    }
}
