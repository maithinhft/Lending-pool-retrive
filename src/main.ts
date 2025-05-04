import { CompoundV2 } from "./compound/compoundV2";
import { CompoundV3 } from "./compound/compoundV3";
import { SiloV1, Token, wrapSiloV1 } from "./silo/siloV1";
import { sleep } from "./services/util";
import { writeFileSync } from 'fs';
import { Venus } from "./compound/venus";
import { chain_to_rpc, chain_to_scan, COMP_cTOKEN_ADDRESS, COMP_TOKEN_ADDRESS, protocol_to_addresses, SILOV1_MARKET_ADDRESS, SILOV1_TOKEN_ADDRESS, VENUS_TOKEN_ADDRESS, VENUS_vTOKEN_ADDRESS } from "./config/config";
import { get_tokens_of_pool } from "./aave/call_contract";
import { forkAaveV3 } from "./aave/aave";
import { RPC } from "./config/constants";

const main = async () => {
    let result: any = {}
    let chains: any = {
        'ARBITRUM': '0xa4b1',
        'BNB': '0x38',
        'ETHEREUM': '0x1',
        // 'BASE': '0x2105',
    }

    let protocols = ['silov1', 'compoundv2', 'venus', 'aavev3', 'radiant'];
    // let protocols = ['compoundv2'];
    let isolated: any = {
        'aavev3': {
            'ETHEREUM': ['USDe', 'MKR', 'CRV', 'BAL', 'UNI', '1INCH', 'LDO', 'SNX', 'ENS'],
            'BNB': ['Cake'],
            'ARBITRUM': ['FRAX'],
            'BASE': [],
        },
        'radiant': {
            'ETHEREUM': [],
            'BNB': [],
            'ARBITRUM': [],
            'BASE': [],
        },
        'venus': {
            'ETHEREUM': [],
            'BNB': [],
            'ARBITRUM': [],
            'BASE': [],
        },
        'silov1': {
            'ETHEREUM': [],
            'BNB': [],
            'ARBITRUM': [],
            'BASE': [],
        },
        'compoundv2': {
            'ETHEREUM': [],
            'BNB': [],
            'ARBITRUM': [],
            'BASE': [],
        }
    }
    // try {
    //     for (let chain in chains) {
    //         let chainID = chains[chain];
    //         const rpc = chain_to_rpc[chainID];
    //         let token = new Token(chain);

    //         for (let protocol of protocols) {
    //             try {
    //                 let listTokenAddress: Array<any> = [];
    //                 if (protocol == 'compoundv2') {
    //                     if (COMP_TOKEN_ADDRESS[chain])
    //                         listTokenAddress = Object.values(COMP_TOKEN_ADDRESS[chain]);
    //                 } else
    //                     if (protocol == 'silov1') {
    //                         if (SILOV1_TOKEN_ADDRESS[chain])
    //                             listTokenAddress = Object.values(SILOV1_TOKEN_ADDRESS[chain]);
    //                     } else
    //                         if (protocol == 'venus') {
    //                             if (VENUS_TOKEN_ADDRESS[chain])
    //                                 listTokenAddress = Object.values(VENUS_TOKEN_ADDRESS[chain]);
    //                         } else
    //                             if (protocol == 'aavev3' || protocol == 'radiant') {
    //                                 listTokenAddress = await get_tokens_of_pool(rpc, protocol_to_addresses[protocol][chainID].lendingpool);
    //                             }

    //                 for (let token1Address of listTokenAddress)
    //                     for (let token2Address of listTokenAddress)
    //                         if (token1Address != token2Address) {
    //                             try {
    //                                 let symbol1 = await token.getSymbol(token1Address);
    //                                 let symbol2 = await token.getSymbol(token2Address);
    //                                 await sleep(200);
    //                                 let listMarket = [];
    //                                 if (protocol == 'silov1') listMarket = SILOV1_MARKET_ADDRESS; else
    //                                     listMarket = ['load 1 lan'];
    //                                 for (let market of listMarket) {
    //                                     let tokenX, tokenY;
    //                                     let tmpProtocol = protocol;
    //                                     if (protocol == 'silov1') {
    //                                         tokenX = new wrapSiloV1(market, token1Address, chain);

    //                                         tokenY = new wrapSiloV1(market, token2Address, chain);
    //                                         tmpProtocol = protocol + '.' + market;
    //                                     } else
    //                                         if (protocol == 'compoundv2') {
    //                                             let vSymbolX1 = 'c' + symbol1;
    //                                             let vTokenX1Address = COMP_cTOKEN_ADDRESS[chain][vSymbolX1];
    //                                             tokenX = new CompoundV2(vTokenX1Address, chain);

    //                                             let vSymbolY1 = 'c' + symbol2;
    //                                             let vTokenY1Address = COMP_cTOKEN_ADDRESS[chain][vSymbolY1];
    //                                             tokenY = new CompoundV2(vTokenY1Address, chain);
    //                                         } else
    //                                             if (protocol == 'venus') {
    //                                                 let tmpSymbol1 = symbol1, tmpSymbol2 = symbol2;
    //                                                 for (let tokenName in VENUS_TOKEN_ADDRESS[chain]) {
    //                                                     if (VENUS_TOKEN_ADDRESS[chain][tokenName] == token1Address) tmpSymbol1 = tokenName;
    //                                                 }

    //                                                 for (let tokenName in VENUS_TOKEN_ADDRESS[chain]) {
    //                                                     if (VENUS_TOKEN_ADDRESS[chain][tokenName] == token2Address) tmpSymbol2 = tokenName;
    //                                                 }

    //                                                 let vSymbolX1 = 'v' + tmpSymbol1;
    //                                                 let vTokenX1Address = VENUS_vTOKEN_ADDRESS[chain][vSymbolX1];
    //                                                 tokenX = new Venus(vTokenX1Address, chain);

    //                                                 let vSymbolY1 = 'v' + tmpSymbol2;
    //                                                 let vTokenY1Address = VENUS_vTOKEN_ADDRESS[chain][vSymbolY1];
    //                                                 tokenY = new Venus(vTokenY1Address, chain);
    //                                             } else {
    //                                                 tokenX = new forkAaveV3();
    //                                                 tokenX.setInfo({
    //                                                     "protocol": protocol,
    //                                                     "chainId": chainID,
    //                                                     "tokenAddress": token1Address,
    //                                                 });

    //                                                 tokenY = new forkAaveV3();
    //                                                 tokenY.setInfo({
    //                                                     "protocol": protocol,
    //                                                     "chainId": chainID,
    //                                                     "tokenAddress": token2Address,
    //                                                 });
    //                                             }

    //                                     const APR_D_X = Number(await tokenX.getSupplyAPR());
    //                                     const APR_B_Y = Number(await tokenY.getBorrowAPR());
    //                                     const LTV_X = Number(await tokenX.getLtv());

    //                                     console.log(`Strategy 1: chain ${chain}, ${protocol} --> Supply token: ${symbol1} and deposit token: ${symbol2}, apr supply ${APR_D_X}, apr borrow ${APR_B_Y}`);
    //                                     if (APR_B_Y > 0 && APR_D_X > 0 && APR_D_X > APR_B_Y && LTV_X > 0) {
    //                                         let data: any = {
    //                                             chain: chain,
    //                                             protocol: protocol,
    //                                             pairToken: [symbol1, symbol2],
    //                                             pairTokenAddress: [token1Address, token2Address],
    //                                             estimate_apr: APR_D_X - APR_B_Y,
    //                                             apr: {
    //                                                 [symbol1]: {
    //                                                     DepositAPR: APR_D_X,
    //                                                     LTV: LTV_X
    //                                                 },
    //                                                 [symbol2]: {
    //                                                     BorrowAPR: APR_B_Y
    //                                                 }
    //                                             }
    //                                         }
    //                                         if (!result[chain]) result[chain] = {};
    //                                         if (!result[chain]['strategy 1']) result[chain]['strategy 1'] = [];
    //                                         result[chain]['strategy 1'].push(data);
    //                                     }
    //                                     await sleep(1000);
    //                                 }
    //                             } catch (error) {
    //                                 console.log(error);
    //                                 await sleep(10000);
    //                             }

    //                         }
    //             } catch (error) {
    //                 console.log(`Error strategy 1, chain ${chain}, protocol ${protocol}: ${error}`);
    //             }
    //         }
    //     }
    //     console.log('Done strategy 1');
    // } catch (err: any) {
    //     console.log('error strategy 1');
    //     console.log(err);
    // } finally {
    //     writeFileSync("data1.json", JSON.stringify(result, null, 2));
    //     result = {};
    // }

    // try {
    //     for (let chain in chains) {
    //         let chainID = chains[chain];
    //         const rpc = chain_to_rpc[chainID];
    //         let token = new Token(chain);
    //         for (let protocol1 of protocols) {
    //             for (let protocol2 of protocols)
    //                 if (protocol1 != protocol2) {
    //                     try {
    //                         let listToken1Address: Array<any> = [];
    //                         if (protocol1 == 'compoundv2') {
    //                             if (COMP_TOKEN_ADDRESS[chain])
    //                                 listToken1Address = Object.values(COMP_TOKEN_ADDRESS[chain]);
    //                         } else
    //                             if (protocol1 == 'silov1') {
    //                                 if (SILOV1_TOKEN_ADDRESS[chain])
    //                                     listToken1Address = Object.values(SILOV1_TOKEN_ADDRESS[chain]);
    //                             } else
    //                                 if (protocol1 == 'venus') {
    //                                     if (VENUS_TOKEN_ADDRESS[chain])
    //                                         listToken1Address = Object.values(VENUS_TOKEN_ADDRESS[chain]);
    //                                 } else
    //                                     if (protocol1 == 'aavev3' || protocol1 == 'radiant') {
    //                                         listToken1Address = await get_tokens_of_pool(rpc, protocol_to_addresses[protocol1][chainID].lendingpool);
    //                                     }

    //                         let listToken2Address: Array<any> = [];
    //                         if (protocol2 == 'compoundv2') {
    //                             if (COMP_TOKEN_ADDRESS[chain])
    //                                 listToken2Address = Object.values(COMP_TOKEN_ADDRESS[chain]);
    //                         } else
    //                             if (protocol2 == 'silov1') {
    //                                 if (SILOV1_TOKEN_ADDRESS[chain])
    //                                     listToken2Address = Object.values(SILOV1_TOKEN_ADDRESS[chain]);
    //                             } else
    //                                 if (protocol2 == 'venus') {
    //                                     if (VENUS_TOKEN_ADDRESS[chain])
    //                                         listToken2Address = Object.values(VENUS_TOKEN_ADDRESS[chain]);
    //                                 } else
    //                                     if (protocol2 == 'aavev3' || protocol2 == 'radiant') {
    //                                         listToken2Address = await get_tokens_of_pool(rpc, protocol_to_addresses[protocol2][chainID].lendingpool);
    //                                     }
    //                         await sleep(200);

    //                         const intersection = listToken1Address.filter((value: any) => listToken2Address.includes(value));

    //                         for (let token1Address of intersection)
    //                             for (let token2Address of intersection)
    //                                 if (token1Address != token2Address) {
    //                                     try {
    //                                         let symbol1 = await token.getSymbol(token1Address);
    //                                         let symbol2 = await token.getSymbol(token2Address);

    //                                         await sleep(200);
    //                                         let listMarket = [];
    //                                         if (protocol1 == 'silov1' || protocol2 == 'silov1') listMarket = SILOV1_MARKET_ADDRESS; else
    //                                             listMarket = ['load 1 lan'];
    //                                         for (let market of listMarket) {
    //                                             let tmpProtocol1 = protocol1;
    //                                             let tmpProtocol2 = protocol2;
    //                                             if (!isolated[protocol1][chain].includes(symbol1) &&
    //                                                 !isolated[protocol1][chain].includes(symbol2) &&
    //                                                 !isolated[protocol2][chain].includes(symbol1) &&
    //                                                 !isolated[protocol2][chain].includes(symbol2)) {
    //                                                 let tokenX1: any, tokenY1: any, tokenX2: any, tokenY2: any;
    //                                                 if (protocol1 == 'silov1') {
    //                                                     tokenX1 = new wrapSiloV1(market, token1Address, chain);

    //                                                     tokenY1 = new wrapSiloV1(market, token2Address, chain);
    //                                                     tmpProtocol1 = protocol1 + '.' + market;
    //                                                 } else
    //                                                     if (protocol1 == 'compoundv2') {
    //                                                         let vSymbolX1 = 'c' + symbol1;
    //                                                         let vTokenX1Address = COMP_cTOKEN_ADDRESS[chain][vSymbolX1];
    //                                                         tokenX1 = new CompoundV2(vTokenX1Address, chain);

    //                                                         let vSymbolY1 = 'c' + symbol2;
    //                                                         let vTokenY1Address = COMP_cTOKEN_ADDRESS[chain][vSymbolY1];
    //                                                         tokenY1 = new CompoundV2(vTokenY1Address, chain);
    //                                                     } else
    //                                                         if (protocol1 == 'venus') {
    //                                                             let tmpSymbol1 = symbol1, tmpSymbol2 = symbol2;
    //                                                             for (let tokenName in VENUS_TOKEN_ADDRESS[chain])
    //                                                                 if (VENUS_TOKEN_ADDRESS[chain][tokenName] == token1Address) tmpSymbol1 = tokenName;

    //                                                             for (let tokenName in VENUS_TOKEN_ADDRESS[chain])
    //                                                                 if (VENUS_TOKEN_ADDRESS[chain][tokenName] == token2Address) tmpSymbol2 = tokenName;

    //                                                             let vSymbolX1 = 'v' + tmpSymbol1;
    //                                                             let vTokenX1Address = VENUS_vTOKEN_ADDRESS[chain][vSymbolX1];
    //                                                             tokenX1 = new Venus(vTokenX1Address, chain);

    //                                                             let vSymbolY1 = 'v' + tmpSymbol2;
    //                                                             let vTokenY1Address = VENUS_vTOKEN_ADDRESS[chain][vSymbolY1];
    //                                                             tokenY1 = new Venus(vTokenY1Address, chain);
    //                                                         } else {
    //                                                             tokenX1 = new forkAaveV3();
    //                                                             tokenX1.setInfo({
    //                                                                 "protocol": protocol1,
    //                                                                 "chainId": chainID,
    //                                                                 "tokenAddress": token1Address,
    //                                                             });

    //                                                             tokenY1 = new forkAaveV3();
    //                                                             tokenY1.setInfo({
    //                                                                 "protocol": protocol1,
    //                                                                 "chainId": chainID,
    //                                                                 "tokenAddress": token2Address,
    //                                                             });
    //                                                         }

    //                                                 if (protocol2 == 'silov1') {
    //                                                     tokenX2 = new wrapSiloV1(market, token1Address, chain);

    //                                                     tokenY2 = new wrapSiloV1(market, token2Address, chain);
    //                                                     tmpProtocol2 = protocol2 + '.' + market;
    //                                                 } else
    //                                                     if (protocol2 == 'compoundv2') {
    //                                                         let vSymbolX2 = 'c' + symbol1;
    //                                                         let vTokenX2Address = COMP_cTOKEN_ADDRESS[chain][vSymbolX2];
    //                                                         tokenX2 = new CompoundV2(vTokenX2Address, chain);

    //                                                         let vSymbolY2 = 'c' + symbol2;
    //                                                         let vTokenY2Address = COMP_cTOKEN_ADDRESS[chain][vSymbolY2];
    //                                                         tokenY2 = new CompoundV2(vTokenY2Address, chain);
    //                                                     } else
    //                                                         if (protocol2 == 'venus') {
    //                                                             let tmpSymbol1 = symbol1, tmpSymbol2 = symbol2;
    //                                                             for (let tokenName in VENUS_TOKEN_ADDRESS[chain])
    //                                                                 if (VENUS_TOKEN_ADDRESS[chain][tokenName] == token1Address) tmpSymbol1 = tokenName;

    //                                                             for (let tokenName in VENUS_TOKEN_ADDRESS[chain])
    //                                                                 if (VENUS_TOKEN_ADDRESS[chain][tokenName] == token2Address) tmpSymbol2 = tokenName;

    //                                                             let vSymbolX2 = 'v' + tmpSymbol1;
    //                                                             let vTokenX2Address = VENUS_vTOKEN_ADDRESS[chain][vSymbolX2];
    //                                                             tokenX2 = new Venus(vTokenX2Address, chain);

    //                                                             let vSymbolY2 = 'v' + tmpSymbol2;
    //                                                             let vTokenY2Address = VENUS_vTOKEN_ADDRESS[chain][vSymbolY2];
    //                                                             tokenY2 = new Venus(vTokenY2Address, chain);
    //                                                         } else {
    //                                                             tokenX2 = new forkAaveV3();
    //                                                             tokenX2.setInfo({
    //                                                                 "protocol": protocol2,
    //                                                                 "chainId": chainID,
    //                                                                 "tokenAddress": token1Address,
    //                                                             });

    //                                                             tokenY2 = new forkAaveV3();
    //                                                             tokenY2.setInfo({
    //                                                                 "protocol": protocol2,
    //                                                                 "chainId": chainID,
    //                                                                 "tokenAddress": token2Address,
    //                                                             });
    //                                                         }

    //                                                 const APR_D_X_1 = Number(await tokenX1.getSupplyAPR());
    //                                                 const APR_B_X_2 = Number(await tokenX2.getBorrowAPR());
    //                                                 await sleep(200);

    //                                                 const APR_B_Y_1 = Number(await tokenY1.getBorrowAPR());
    //                                                 const APR_D_Y_2 = Number(await tokenY2.getSupplyAPR());
    //                                                 await sleep(200);

    //                                                 const LTV_X_1 = Number(await tokenX1.getLtv());
    //                                                 const LTV_Y_2 = Number(await tokenY2.getLtv());
    //                                                 await sleep(200);

    //                                                 console.log(chain, tmpProtocol1, symbol1, tmpProtocol2, symbol2, APR_D_X_1, APR_B_X_2, APR_B_Y_1, APR_D_Y_2, -LTV_X_1 * APR_B_Y_1 + LTV_X_1 * APR_D_Y_2 - LTV_X_1 * LTV_Y_2 * APR_B_X_2 + LTV_X_1 * LTV_Y_2 * APR_D_X_1);

    //                                                 if (APR_D_X_1 > 0 && APR_B_X_2 > 0 && APR_B_Y_1 > 0 && APR_D_Y_2 > 0 && LTV_X_1 > 0 && LTV_Y_2 > 0 &&
    //                                                     -LTV_X_1 * APR_B_Y_1 + LTV_X_1 * APR_D_Y_2 - LTV_X_1 * LTV_Y_2 * APR_B_X_2 + LTV_X_1 * LTV_Y_2 * APR_D_X_1 > 0
    //                                                     // APR_D_X_1 > APR_B_X_2 && APR_D_Y_2 > APR_B_Y_1
    //                                                 ) {
    //                                                     console.log(`Strategy 2 chain ${chain}, ${tmpProtocol1}-${tmpProtocol2}, chain: ${chain} --> Market1: ${tmpProtocol1}, token 1: ${symbol1}, market2: ${tmpProtocol2}, token2: ${symbol2}, estimate apr: ${-LTV_X_1 * APR_B_Y_1 + LTV_X_1 * APR_D_Y_2 - LTV_X_1 * LTV_Y_2 * APR_B_X_2 + LTV_X_1 * LTV_Y_2 * APR_D_X_1}`);
    //                                                     let data: any = {
    //                                                         chain: chain,
    //                                                         pairProtocol: [tmpProtocol1, tmpProtocol2],
    //                                                         pairToken: [symbol1, symbol2],
    //                                                         pairTokenAddress: [token1Address, token2Address],
    //                                                         estimate_apr: -LTV_X_1 * APR_B_Y_1 + LTV_X_1 * APR_D_Y_2 - LTV_X_1 * LTV_Y_2 * APR_B_X_2 + LTV_X_1 * LTV_Y_2 * APR_D_X_1,
    //                                                         apr: {
    //                                                             [symbol1]: {
    //                                                                 [tmpProtocol1]: {
    //                                                                     DepositAPR: APR_D_X_1,
    //                                                                     LTV: LTV_X_1,
    //                                                                 },
    //                                                                 [tmpProtocol2]: {
    //                                                                     BorrowAPR: APR_B_X_2,
    //                                                                 }
    //                                                             },
    //                                                             [symbol2]: {
    //                                                                 [tmpProtocol1]: {
    //                                                                     BorrowAPR: APR_B_Y_1,

    //                                                                 },
    //                                                                 [tmpProtocol2]: {
    //                                                                     DepositAPR: APR_D_Y_2,
    //                                                                     LTV: LTV_Y_2,
    //                                                                 }
    //                                                             }
    //                                                         }
    //                                                     }
    //                                                     if (!result[chain]) result[chain] = {};
    //                                                     if (!result[chain]['strategy 2']) result[chain]['strategy 2'] = [];
    //                                                     result[chain]['strategy 2'].push(data);
    //                                                 }
    //                                             }
    //                                         }
    //                                     } catch (err: any) {
    //                                         console.log(protocol1, protocol2, token1Address, token2Address);
    //                                         console.log(err);
    //                                         await sleep(10000);
    //                                     }
    //                                 }
    //                     } catch (error) {
    //                         console.log(`Error strategy 2, chain ${chain} protocol 1 ${protocol1}, protocol 2 ${protocol2}, ${error}`);
    //                     }
    //                 }
    //         }
    //     }
    //     console.log("Done strategy 2");
    // } catch (error) {
    //     console.log('error strategy 2');
    //     console.log(error);
    // } finally {
    //     writeFileSync("data2.json", JSON.stringify(result, null, 2));
    //     result = {};
    // }

    // try {
    //     for (let chain in chains) {
    //         let chainID = chains[chain];
    //         const rpc = chain_to_rpc[chainID];
    //         let token = new Token(chain);
    //         for (let protocol1 of protocols) {
    //             for (let protocol2 of protocols)
    //                 if (protocol1 != protocol2) {
    //                     try {
    //                         let listToken1Address: Array<any> = [];
    //                         if (protocol1 == 'compoundv2') {
    //                             if (COMP_TOKEN_ADDRESS[chain])
    //                                 listToken1Address = Object.values(COMP_TOKEN_ADDRESS[chain]);
    //                         } else
    //                             if (protocol1 == 'silov1') {
    //                                 if (SILOV1_TOKEN_ADDRESS[chain])
    //                                     listToken1Address = Object.values(SILOV1_TOKEN_ADDRESS[chain]);
    //                             } else
    //                                 if (protocol1 == 'venus') {
    //                                     if (VENUS_TOKEN_ADDRESS[chain])
    //                                         listToken1Address = Object.values(VENUS_TOKEN_ADDRESS[chain]);
    //                                 } else
    //                                     if (protocol1 == 'aavev3' || protocol1 == 'radiant') {
    //                                         listToken1Address = await get_tokens_of_pool(rpc, protocol_to_addresses[protocol1][chainID].lendingpool);
    //                                     }

    //                         let listToken2Address: Array<any> = [];
    //                         if (protocol2 == 'compoundv2') {
    //                             if (COMP_TOKEN_ADDRESS[chain])
    //                                 listToken2Address = Object.values(COMP_TOKEN_ADDRESS[chain]);
    //                         } else
    //                             if (protocol2 == 'silov1') {
    //                                 if (SILOV1_TOKEN_ADDRESS[chain])
    //                                     listToken2Address = Object.values(SILOV1_TOKEN_ADDRESS[chain]);
    //                             } else
    //                                 if (protocol2 == 'venus') {
    //                                     if (VENUS_TOKEN_ADDRESS[chain])
    //                                         listToken2Address = Object.values(VENUS_TOKEN_ADDRESS[chain]);
    //                                 } else
    //                                     if (protocol2 == 'aavev3' || protocol2 == 'radiant') {
    //                                         listToken2Address = await get_tokens_of_pool(rpc, protocol_to_addresses[protocol2][chainID].lendingpool);
    //                                     }
    //                         await sleep(200);

    //                         const intersection = listToken1Address.filter((value: any) => listToken2Address.includes(value));

    //                         for (let token1Address of intersection)
    //                             for (let token2Address of intersection)
    //                                 if (token1Address != token2Address)
    //                                     try {
    //                                         let symbol1 = await token.getSymbol(token1Address);
    //                                         let symbol2 = await token.getSymbol(token2Address);

    //                                         await sleep(200);
    //                                         let listMarket = [];
    //                                         if (protocol1 == 'silov1' || protocol2 == 'silov1') listMarket = SILOV1_MARKET_ADDRESS; else
    //                                             listMarket = ['load 1 lan'];
    //                                         for (let market of listMarket) {
    //                                             let tmpProtocol1 = protocol1;
    //                                             let tmpProtocol2 = protocol2;
    //                                             if (!isolated[protocol1][chain].includes(symbol1) &&
    //                                                 !isolated[protocol1][chain].includes(symbol2) &&
    //                                                 !isolated[protocol2][chain].includes(symbol1) &&
    //                                                 !isolated[protocol2][chain].includes(symbol2)) {
    //                                                 let tokenX1: any, tokenY1: any, tokenX2: any, tokenY2: any;
    //                                                 if (protocol1 == 'silov1') {
    //                                                     tokenX1 = new wrapSiloV1(market, token1Address, chain);

    //                                                     tokenY1 = new wrapSiloV1(market, token2Address, chain);
    //                                                     tmpProtocol1 = protocol1 + '.' + market;
    //                                                 } else
    //                                                     if (protocol1 == 'compoundv2') {
    //                                                         let vSymbolX1 = 'c' + symbol1;
    //                                                         let vTokenX1Address = COMP_cTOKEN_ADDRESS[chain][vSymbolX1];
    //                                                         tokenX1 = new CompoundV2(vTokenX1Address, chain);

    //                                                         let vSymbolY1 = 'c' + symbol2;
    //                                                         let vTokenY1Address = COMP_cTOKEN_ADDRESS[chain][vSymbolY1];
    //                                                         tokenY1 = new CompoundV2(vTokenY1Address, chain);
    //                                                     } else
    //                                                         if (protocol1 == 'venus') {
    //                                                             let tmpSymbol1 = symbol1, tmpSymbol2 = symbol2;
    //                                                             for (let tokenName in VENUS_TOKEN_ADDRESS[chain])
    //                                                                 if (VENUS_TOKEN_ADDRESS[chain][tokenName] == token1Address) tmpSymbol1 = tokenName;

    //                                                             for (let tokenName in VENUS_TOKEN_ADDRESS[chain])
    //                                                                 if (VENUS_TOKEN_ADDRESS[chain][tokenName] == token2Address) tmpSymbol2 = tokenName;

    //                                                             let vSymbolX1 = 'v' + tmpSymbol1;
    //                                                             let vTokenX1Address = VENUS_vTOKEN_ADDRESS[chain][vSymbolX1];
    //                                                             tokenX1 = new Venus(vTokenX1Address, chain);

    //                                                             let vSymbolY1 = 'v' + tmpSymbol2;
    //                                                             let vTokenY1Address = VENUS_vTOKEN_ADDRESS[chain][vSymbolY1];
    //                                                             tokenY1 = new Venus(vTokenY1Address, chain);
    //                                                         } else {
    //                                                             tokenX1 = new forkAaveV3();
    //                                                             tokenX1.setInfo({
    //                                                                 "protocol": protocol1,
    //                                                                 "chainId": chainID,
    //                                                                 "tokenAddress": token1Address,
    //                                                             });

    //                                                             tokenY1 = new forkAaveV3();
    //                                                             tokenY1.setInfo({
    //                                                                 "protocol": protocol1,
    //                                                                 "chainId": chainID,
    //                                                                 "tokenAddress": token2Address,
    //                                                             });
    //                                                         }

    //                                                 if (protocol2 == 'silov1') {
    //                                                     tokenX2 = new wrapSiloV1(market, token1Address, chain);

    //                                                     tokenY2 = new wrapSiloV1(market, token2Address, chain);
    //                                                     tmpProtocol2 = protocol2 + '.' + market;
    //                                                 } else
    //                                                     if (protocol2 == 'compoundv2') {
    //                                                         let vSymbolX2 = 'c' + symbol1;
    //                                                         let vTokenX2Address = COMP_cTOKEN_ADDRESS[chain][vSymbolX2];
    //                                                         tokenX2 = new CompoundV2(vTokenX2Address, chain);

    //                                                         let vSymbolY2 = 'c' + symbol2;
    //                                                         let vTokenY2Address = COMP_cTOKEN_ADDRESS[chain][vSymbolY2];
    //                                                         tokenY2 = new CompoundV2(vTokenY2Address, chain);
    //                                                     } else
    //                                                         if (protocol2 == 'venus') {
    //                                                             let tmpSymbol1 = symbol1, tmpSymbol2 = symbol2;
    //                                                             for (let tokenName in VENUS_TOKEN_ADDRESS[chain])
    //                                                                 if (VENUS_TOKEN_ADDRESS[chain][tokenName] == token1Address) tmpSymbol1 = tokenName;

    //                                                             for (let tokenName in VENUS_TOKEN_ADDRESS[chain])
    //                                                                 if (VENUS_TOKEN_ADDRESS[chain][tokenName] == token2Address) tmpSymbol2 = tokenName;

    //                                                             let vSymbolX2 = 'v' + tmpSymbol1;
    //                                                             let vTokenX2Address = VENUS_vTOKEN_ADDRESS[chain][vSymbolX2];
    //                                                             tokenX2 = new Venus(vTokenX2Address, chain);

    //                                                             let vSymbolY2 = 'v' + tmpSymbol2;
    //                                                             let vTokenY2Address = VENUS_vTOKEN_ADDRESS[chain][vSymbolY2];
    //                                                             tokenY2 = new Venus(vTokenY2Address, chain);
    //                                                         } else {
    //                                                             tokenX2 = new forkAaveV3();
    //                                                             tokenX2.setInfo({
    //                                                                 "protocol": protocol2,
    //                                                                 "chainId": chainID,
    //                                                                 "tokenAddress": token1Address,
    //                                                             });

    //                                                             tokenY2 = new forkAaveV3();
    //                                                             tokenY2.setInfo({
    //                                                                 "protocol": protocol2,
    //                                                                 "chainId": chainID,
    //                                                                 "tokenAddress": token2Address,
    //                                                             });
    //                                                         }

    //                                                 const APR_D_X_1 = Number(await tokenX1.getSupplyAPR());
    //                                                 const APR_B_X_2 = Number(await tokenX2.getBorrowAPR());
    //                                                 await sleep(200);

    //                                                 const APR_B_Y_1 = Number(await tokenY1.getBorrowAPR());
    //                                                 const APR_D_Y_2 = Number(await tokenY2.getSupplyAPR());
    //                                                 await sleep(200);

    //                                                 const LTV_X_1 = Number(await tokenX1.getLtv());
    //                                                 const LTV_Y_2 = Number(await tokenY2.getLtv());
    //                                                 await sleep(200);

    //                                                 console.log(chain, tmpProtocol1, symbol1, tmpProtocol2, symbol2, APR_D_X_1, APR_B_X_2, APR_B_Y_1, APR_D_Y_2, -LTV_X_1 * APR_B_Y_1 + LTV_X_1 * APR_D_Y_2 - LTV_X_1 * LTV_Y_2 * APR_B_X_2 + LTV_X_1 * LTV_Y_2 * APR_D_X_1);

    //                                                 if (APR_D_X_1 > 0 && APR_B_X_2 > 0 && APR_B_Y_1 > 0 && APR_D_Y_2 > 0 && LTV_X_1 > 0 && LTV_Y_2 > 0 &&
    //                                                     // -LTV_X_1 * APR_B_Y_1 + LTV_X_1 * APR_D_Y_2 - LTV_X_1 * LTV_Y_2 * APR_B_X_2 + LTV_X_1 * LTV_Y_2 * APR_D_X_1 > 0
    //                                                     APR_D_X_1 > APR_B_X_2 && APR_D_Y_2 > APR_B_Y_1
    //                                                 ) {
    //                                                     console.log(`Strategy 3 chain ${chain}, ${tmpProtocol1}-${tmpProtocol2}, chain: ${chain} --> Market1: ${tmpProtocol1}, token 1: ${symbol1}, market2: ${tmpProtocol2}, token2: ${symbol2}, estimate apr: ${-LTV_X_1 * APR_B_Y_1 + LTV_X_1 * APR_D_Y_2 - LTV_X_1 * LTV_Y_2 * APR_B_X_2 + LTV_X_1 * LTV_Y_2 * APR_D_X_1}`);
    //                                                     let data: any = {
    //                                                         chain: chain,
    //                                                         pairProtocol: [tmpProtocol1, tmpProtocol2],
    //                                                         pairToken: [symbol1, symbol2],
    //                                                         pairTokenAddress: [token1Address, token2Address],
    //                                                         estimate_apr: -LTV_X_1 * APR_B_Y_1 + LTV_X_1 * APR_D_Y_2 - LTV_X_1 * LTV_Y_2 * APR_B_X_2 + LTV_X_1 * LTV_Y_2 * APR_D_X_1,
    //                                                         apr: {
    //                                                             [symbol1]: {
    //                                                                 [tmpProtocol1]: {
    //                                                                     DepositAPR: APR_D_X_1,
    //                                                                     LTV: LTV_X_1,
    //                                                                 },
    //                                                                 [tmpProtocol2]: {
    //                                                                     BorrowAPR: APR_B_X_2,
    //                                                                 }
    //                                                             },
    //                                                             [symbol2]: {
    //                                                                 [tmpProtocol1]: {
    //                                                                     BorrowAPR: APR_B_Y_1,

    //                                                                 },
    //                                                                 [tmpProtocol2]: {
    //                                                                     DepositAPR: APR_D_Y_2,
    //                                                                     LTV: LTV_Y_2,
    //                                                                 }
    //                                                             }
    //                                                         }
    //                                                     }
    //                                                     if (!result[chain]) result[chain] = {};
    //                                                     if (!result[chain]['strategy 3']) result[chain]['strategy 3'] = [];
    //                                                     result[chain]['strategy 3'].push(data);
    //                                                 }
    //                                             }
    //                                         }
    //                                     } catch (err: any) {
    //                                         console.log(protocol1, protocol2, token1Address, token2Address);
    //                                         console.log(err);
    //                                         await sleep(10000);
    //                                     }
    //                     } catch (error) {
    //                         console.log(`Error strategy 3, chain ${chain}, protocol 1 ${protocol1}, protocol 2 ${protocol2}: ${error}`);
    //                     }
    //                 }
    //         }
    //     }
    //     console.log("Done strategy 3!");
    // } catch (error) {
    //     console.log('error strategy 3');
    //     console.log(error);
    // } finally {
    //     writeFileSync("data3.json", JSON.stringify(result, null, 2));
    //     result = {};
    // }

    const siloV1Markets: any = {
        "0x912ce59144191c1204e64559fe8253a0e49e6548": {
            "pool": "0x0696e6808ee11a5750733a3d821f9bb847e584fb",
            "assets": [
                "0x912ce59144191c1204e64559fe8253a0e49e6548",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        },
        "0x5979d7b546e38e414f7e9822514be443a4800529": {
            "pool": "0xa8897b4552c075e884bdb8e7b704eb10db29bf0d",
            "assets": [
                "0x5979d7b546e38e414f7e9822514be443a4800529",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        },
        "0xf0cb2dc0db5e6c66b9a70ac27b06b878da017028": {
            "pool": "0x862da0a25e3dfe46df2cd4c14d79e1e4684dea4a",
            "assets": [
                "0xf0cb2dc0db5e6c66b9a70ac27b06b878da017028",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        },
        "0xec70dcb4a1efa46b8f2d97c310c9c4790ba5ffa8": {
            "pool": "0x170a90981843461295a6ce0e0a631ee440222e29",
            "assets": [
                "0xec70dcb4a1efa46b8f2d97c310c9c4790ba5ffa8",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        },
        "0x6c2c06790b3e3e3c38e12ee22f8183b37a13ee55": {
            "pool": "0x7e38a9d2c99caef533e5d692ed8a2ce4b478e585",
            "assets": [
                "0x6c2c06790b3e3e3c38e12ee22f8183b37a13ee55",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        },
        "0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a": {
            "pool": "0xde998e5eef06dd09ff467086610b175f179a66a0",
            "assets": [
                "0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        },
        "0x32eb7902d4134bf98a28b963d26de779af92a212": {
            "pool": "0x950aaeda8c6e806a8c889b4dbcc0361760b86249",
            "assets": [
                "0x32eb7902d4134bf98a28b963d26de779af92a212",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        },
        "0x539bde0d7dbd336b79148aa742883198bbf60342": {
            "pool": "0x30c4aa967f68705ab5677ebe17b3affd0c59e71c",
            "assets": [
                "0x539bde0d7dbd336b79148aa742883198bbf60342",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        },
        "0x18c11fd286c5ec11c3b683caa813b77f5163a122": {
            "pool": "0xfc6778a6955e1cecac448051de967f9b5ff4d647",
            "assets": [
                "0x18c11fd286c5ec11c3b683caa813b77f5163a122",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        },
        "0x10393c20975cf177a3513071bc110f7962cd67da": {
            "pool": "0x82622a6bdd2f1fa757a08837633971d42c17241a",
            "assets": [
                "0x10393c20975cf177a3513071bc110f7962cd67da",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        },
        "0x51fc0f6660482ea73330e414efd7808811a57fa2": {
            "pool": "0x5eda4bee7ba556e65bc4fb9eed5d74e61bc1f2a9",
            "assets": [
                "0x51fc0f6660482ea73330e414efd7808811a57fa2",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        },
        "0x1622bf67e6e5747b81866fe0b85178a93c7f86e3": {
            "pool": "0xc0ab69fffeb5375235d8caa4f7218097bbcc0a0a",
            "assets": [
                "0x1622bf67e6e5747b81866fe0b85178a93c7f86e3",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        },
        "0x0341c0c0ec423328621788d4854119b97f44e391": {
            "pool": "0xae1eb69e880670ca47c50c9ce712ec2b48fac3b6",
            "assets": [
                "0x0341c0c0ec423328621788d4854119b97f44e391",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        },
        "0x65c936f008bc34fe819bce9fa5afd9dc2d49977f": {
            "pool": "0xa0cf37273068b461df43f1cfb58e2b2cecb56706",
            "assets": [
                "0x65c936f008bc34fe819bce9fa5afd9dc2d49977f",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        },
        "0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0": {
            "pool": "0x033f86120c101b0480b5c70327a8e90c4ae35041",
            "assets": [
                "0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        },
        "0x11cdb42b0eb46d95f990bedd4695a6e3fa034978": {
            "pool": "0xd713ef310351055af26c6d3e20c4e629090c39a5",
            "assets": [
                "0x11cdb42b0eb46d95f990bedd4695a6e3fa034978",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        },
        "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f": {
            "pool": "0x69ec552be56e6505703f0c861c40039e5702037a",
            "assets": [
                "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
                "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
                "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"
            ]
        }
    }

    const siloV1 = new SiloV1('ARBITRUM');
    const token = new Token('ARBITRUM');

    for (let marketAddress1 of Object.keys(siloV1Markets))
        for (let marketAddress2 of Object.keys(siloV1Markets)) {
            const market1 = siloV1Markets[marketAddress1];
            const poolAddress1 = market1.pool;

            const market2 = siloV1Markets[marketAddress2];
            const poolAddress2 = market2.pool;

            for (let asset1 of market1.assets)
                for (let asset2 of market2.assets)
                    if (asset1 != asset2 && market1.assets.includes(asset2) && market2.assets.includes(asset1)) {
                        const APR_D_X_1 = Number(await siloV1.getSupplyAPR(poolAddress1, asset1));
                        const APR_B_X_2 = Number(await siloV1.getBorrowAPR(poolAddress2, asset1));

                        const APR_B_Y_1 = Number(await siloV1.getBorrowAPR(poolAddress1, asset2));
                        const APR_D_Y_2 = Number(await siloV1.getSupplyAPR(poolAddress2, asset2));

                        const LTV_X_1 = Number(await siloV1.getLTV(poolAddress1, asset1));
                        const LTV_Y_2 = Number(await siloV1.getLTV(poolAddress2, asset2));
                        const symbol1 = await token.getSymbol(asset1);
                        const symbol2 = await token.getSymbol(asset2);

                        if (APR_D_X_1 > 0 && APR_B_X_2 > 0 && APR_B_Y_1 > 0 && APR_D_Y_2 > 0 && 
                            -LTV_X_1 * APR_B_Y_1 + LTV_X_1 * APR_D_Y_2 - LTV_X_1 * LTV_Y_2 * APR_B_X_2 + LTV_X_1 * LTV_Y_2 * APR_D_X_1 > 0
                        ) {
                            console.log(`Arbitrage market Silo v1 --> Market1: ${poolAddress1}, token 1: ${symbol1}, market2: ${poolAddress2}, token2: ${symbol2}`);
                            let data: any = {
                                chain: 'ARBITRUM',
                                pairProtocol: [`SILOv1.${poolAddress1}`, `SILOv1.${poolAddress2}`],
                                pairToken: [symbol1,symbol2],
                                pairTokenAddress: [asset1, asset2],
                                estimateAPR: -LTV_X_1 * APR_B_Y_1 + LTV_X_1 * APR_D_Y_2 - LTV_X_1 * LTV_Y_2 * APR_B_X_2 + LTV_X_1 * LTV_Y_2 * APR_D_X_1,
                                apr: {
                                    [symbol1]: {
                                        [poolAddress1]: {
                                            DepositAPR: APR_D_X_1,
                                            LTV: LTV_X_1,
                                        },
                                        [poolAddress2]: {
                                            BorrowAPR: APR_B_X_2,
                                        }   
                                    },
                                    [symbol2]: {
                                        [poolAddress1]: {
                                            BorrowAPR: APR_B_Y_1,

                                        },
                                        [poolAddress2]: {
                                            DepositAPR: APR_D_Y_2,
                                            LTV: LTV_Y_2,
                                        }
                                    }
                                }
                            }
                            if (!result.ARBITRUM) result.ARBITRUM = {};
                            if (!result.ARBITRUM['strategy 2']) result.ARBITRUM['strategy 2'] = [];
                            result.ARBITRUM['strategy 2'].push(data);
                        }
                        await sleep(100);
                    }
        }
    console.log("Done arbitrage!");
    writeFileSync("silo1.json", JSON.stringify(result, null, 2));

    result = {};
    for (let marketAddress1 of Object.keys(siloV1Markets))
        for (let marketAddress2 of Object.keys(siloV1Markets)) {
            const market1 = siloV1Markets[marketAddress1];
            const poolAddress1 = market1.pool;

            const market2 = siloV1Markets[marketAddress2];
            const poolAddress2 = market2.pool;

            for (let asset1 of market1.assets)
                for (let asset2 of market2.assets)
                    if (asset1 != asset2 && market1.assets.includes(asset2) && market2.assets.includes(asset1)) {
                        const APR_D_X_1 = Number(await siloV1.getSupplyAPR(poolAddress1, asset1));
                        const APR_B_X_2 = Number(await siloV1.getBorrowAPR(poolAddress2, asset1));

                        const APR_B_Y_1 = Number(await siloV1.getBorrowAPR(poolAddress1, asset2));
                        const APR_D_Y_2 = Number(await siloV1.getSupplyAPR(poolAddress2, asset2));

                        const LTV_X_1 = Number(await siloV1.getLTV(poolAddress1, asset1));
                        const LTV_Y_2 = Number(await siloV1.getLTV(poolAddress2, asset2));
                        const symbol1 = await token.getSymbol(asset1);
                        const symbol2 = await token.getSymbol(asset2);

                        if (APR_D_X_1 > 0 && APR_B_X_2 > 0 && APR_B_Y_1 > 0 && APR_D_Y_2 > 0 && 
                            APR_D_X_1 > APR_B_X_2 && APR_D_Y_2 > APR_B_Y_1
                        ) {
                            console.log(`Arbitrage market Silo v1 --> Market1: ${poolAddress1}, token 1: ${symbol1}, market2: ${poolAddress2}, token2: ${symbol2}`);
                            let data: any = {
                                chain: 'ARBITRUM',
                                pairProtocol: [`SILOv1.${poolAddress1}`, `SILOv1.${poolAddress2}`],
                                pairToken: [symbol1,symbol2],
                                pairTokenAddress: [asset1, asset2],
                                estimateAPR: -LTV_X_1 * APR_B_Y_1 + LTV_X_1 * APR_D_Y_2 - LTV_X_1 * LTV_Y_2 * APR_B_X_2 + LTV_X_1 * LTV_Y_2 * APR_D_X_1,
                                apr: {
                                    [symbol1]: {
                                        [poolAddress1]: {
                                            DepositAPR: APR_D_X_1,
                                            LTV: LTV_X_1,
                                        },
                                        [poolAddress2]: {
                                            BorrowAPR: APR_B_X_2,
                                        }   
                                    },
                                    [symbol2]: {
                                        [poolAddress1]: {
                                            BorrowAPR: APR_B_Y_1,

                                        },
                                        [poolAddress2]: {
                                            DepositAPR: APR_D_Y_2,
                                            LTV: LTV_Y_2,
                                        }
                                    }
                                }
                            }
                            if (!result.ARBITRUM) result.ARBITRUM = {};
                            if (!result.ARBITRUM['strategy 3']) result.ARBITRUM['strategy 3'] = [];
                            result.ARBITRUM['strategy 3'].push(data);
                        }
                        await sleep(100);
                    }
        }
    console.log("Done arbitrage!");
    writeFileSync("silo2.json", JSON.stringify(result, null, 2));

}

main();