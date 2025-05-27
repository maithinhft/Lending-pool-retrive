import { forkAaveV3 } from "./src/aave/aave";
import { Venus } from "./src/compound/venus";
import { chain_to_rpc } from "./src/config/config";
import { RPC } from "./src/config/constants";
import { Token } from "./src/silo/siloV1";

const main = async () => {
    console.log(RPC['ETHEREUM']);
    console.log(chain_to_rpc['0x1']);
    let token = new Token('ETHEREUM');
    console.log(await token.getSymbol('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'))
    // let tokenVenus = new Venus('0xf508fCD89b8bd15579dc79A6827cB4686A3592c8', 'BNB');
    // console.log(await tokenVenus.getBorrowAPR());
    // console.log(await tokenVenus.getSupplyAPR());
    // console.log(await tokenVenus.getLtv());

    // let aaveV3 = new forkAaveV3();

    // await aaveV3.setInfo({
    //     "protocol": "aavev3",
    //     "chainId": "0xa4b1",
    //     "tokenAddress": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
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

    // await aaveV3.setInfo({
    //     "protocol": "aavev3",
    //     "chainId": "0x1",
    //     "tokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
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

    // console.log(chain_to_rpc['0x38']);
}
main();

// s --> 