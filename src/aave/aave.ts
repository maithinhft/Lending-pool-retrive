import { get_reserve_data, get_tokens_of_pool } from "./call_contract";
import { chain_to_rpc, protocol_to_addresses } from "../config/config";
import BigNumber from "bignumber.js";
import reserve_data_index from "../../json/reverse_data_index.json";

export class forkAaveV3 {
    public info: any;
    // info = { protocol: "", chainId: "", tokenAddress: "" };
    public reserveData: any;
    public needCallReserveData: boolean;
    public tokensList: any[] = [];
    public needCallTokensList: boolean;

    constructor() {
        this.needCallReserveData = true;
        this.needCallTokensList = true;
    }

    public async setInfo(info: any) {
        this.needCallReserveData = true;
        this.info = info;
    }

    public async getSupplyAPR() {
        if (this.needCallReserveData) {
            this.reserveData = await get_reserve_data(
                chain_to_rpc[this.info["chainId"] as any],
                protocol_to_addresses[this.info["protocol"]][this.info["chainId"]]["lendingpool"],
                this.info["tokenAddress"],
                this.info["protocol"]
            );
            this.needCallReserveData = false;
        }
        return BigNumber(this.reserveData[(reserve_data_index as any)[this.info["protocol"]]["currentLiquidityRate"]]).div(BigNumber(10).pow(25)).div(100).toString();
    }

    public async getBorrowAPR() {
        if (this.needCallReserveData) {
            this.reserveData = await get_reserve_data(
                chain_to_rpc[this.info["chainId"] as any],
                protocol_to_addresses[this.info["protocol"]][this.info["chainId"]]["lendingpool"],
                this.info["tokenAddress"],
                this.info["protocol"]
            );
            this.needCallReserveData = false;
        }
        return BigNumber(this.reserveData[(reserve_data_index as any)[this.info["protocol"]]["currentVariableBorrowRate"]]).div(BigNumber(10).pow(25)).div(100).toString();
    }

    public async getLtv() {
        if (this.needCallReserveData) {
            this.reserveData = await get_reserve_data(
                chain_to_rpc[this.info["chainId"] as any],
                protocol_to_addresses[this.info["protocol"]][this.info["chainId"]]["lendingpool"],
                this.info["tokenAddress"],
                this.info["protocol"]
            );
            this.needCallReserveData = false;
        }
        let hex = BigNumber(this.reserveData[(reserve_data_index as any)[this.info["protocol"]]["configuration"]][0]).toString(16);
        let ltv: any = "";
        for (let i = hex.length - 1; i >= hex.length - 4; i--) {
            ltv = hex[i] + ltv;
        }
        ltv = BigNumber("0x" + ltv).dividedBy(10000).toString(10);
        return ltv;
    }

    public async getTokensList() {
        if (this.needCallTokensList) {
            this.tokensList = await get_tokens_of_pool(
                chain_to_rpc[this.info["chainId"] as any],
                protocol_to_addresses[this.info["protocol"]][this.info["chainId"]]["lendingpool"],
                this.info["protocol"]
            );
            this.needCallTokensList = false;
        }
        return this.tokensList;
    }
}

async function test() {
    let aaveV3 = new forkAaveV3();

    // await aaveV3.setInfo({
    //     "protocol": "radiant",
    //     "chainId": "0xa4b1",
    //     "tokenAddress": "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    // });
    // await aaveV3.getSupplyAPR().then((res) => {
    //     console.log("supplyAPR", res);
    // });
    // await aaveV3.getBorrowAPR().then((res) => {
    //     console.log("borrowAPR", res);
    // });
    // await aaveV3.getLtv().then((res) => {
    //     console.log("ltv", res);
    // });

    await aaveV3.setInfo({
        "protocol": "aavev3",
        "chainId": "0x1",
        "tokenAddress": "0xba100000625a3754423978a60c9317c58a424e3D",
    });
    await aaveV3.getSupplyAPR().then((res) => {
        console.log("supplyAPR", res);
    });
    // await aaveV3.getBorrowAPR().then((res) => {
    //     console.log("borrowAPR", res);
    // });
    // await aaveV3.getLtv().then((res) => {
    //     console.log("ltv", res);
    // });
}

// test();