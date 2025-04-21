import { CompoundV2 } from "./compound/compoundV2";
import { CompoundV3 } from "./compound/compoundV3";
import { SiloV1, Token } from "./silo/siloV1";
import { sleep } from "./services/util";
import { writeFileSync } from 'fs';

const main = async () => {
    // const compoundV3 = new CompoundV3("WETH");
    // console.log(`Compound v3 supply apr: ${await compoundV3.getBorrowAPR()}, borrow apr: ${await compoundV3.getSupplyAPR()}`);
    // await compoundV3.rewardAPR();
    // await compoundV3.thresholdAndLTV();

    // const siloV1 = new SiloV1();
    // await siloV1.getRewardAPR("0x26Dd60f1B3B6c784e1e2bd767D1F31ABFEb2f04E");
    // await siloV1.getInterestAPR("0x7e38a9d2c99caef533e5d692ed8a2ce4b478e585", "0x6C2C06790b3E3E3c38e12Ee22F8183b37a13EE55");
    // await siloV1.thresholdAndLTV();
    // await siloV1.liquidity("0xc0ab69fffeb5375235d8caa4f7218097bbcc0a0a", "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8");

    // const compoundV2 = new CompoundV2("USDT");
    // console.log(`Compound v2 supply apr: ${await compoundV2.getSupplyAPR()}, borrow apr: ${await compoundV2.getBorrowAPR()}`);
    // await compoundV2.thresholdAndLTV();

    const compoundV2Tokens: any = {
        AAVE: "cAAVE",
        BAT: "cBAT",
        DAI: "cDAI",
        ETH: "cETH",
        LINK: "cLINK",
        MKR: "cMKR",
        REP: "cREP",
        SUSHI: "cSUSHI",
        TUSD: "cTUSD",
        UNI: "cUNI",
        USDC: "cUSDC",
        USDP: "cUSDP",
        USDT: "cUSDT",
        WBTC2: "cWBTC2",
        YFI: "cYFI",
        ZRX: "cZRX",
    }

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

    let result: any = {
        loop: {

        },
        arbitrage: []
    }

    for (let token1 of Object.keys(compoundV2Tokens))
        for (let token2 of Object.keys(compoundV2Tokens)) {
            let token1CompoundV2 = new CompoundV2(compoundV2Tokens[token1], 'ETHEREUM');
            let token2CompoundV2 = new CompoundV2(compoundV2Tokens[token2], 'ETHEREUM');

            const APR_D_X = Number(await token1CompoundV2.getSupplyAPR());
            const APR_B_Y = Number(await token2CompoundV2.getBorrowAPR());
            const LTV_X = Number(await token1CompoundV2.thresholdAndLTV());

            if (APR_B_Y > 0 && APR_D_X > 0 && APR_D_X > APR_B_Y && LTV_X > 0) {
                console.log(`COMPOUNDv2 --> Supply token: ${token1} and deposit token: ${token2}`);
                let data: any = {
                    pairToken: [token1, token2],
                    apr: {
                        [token1]: {
                            DepositAPR: APR_D_X,
                            LTV: LTV_X
                        },
                        [token2]: {
                            BorrowAPR: APR_B_Y
                        }
                    }
                }
                if (!result.loop.compoundV2) {
                    result.loop.compoundV2 = [];
                }
                result.loop.compoundV2.push(data);
            }
            await sleep(100);
        }
    console.log("Done compound!");

    const siloV1 = new SiloV1('ARBITRUM');
    const token = new Token('ARBITRUM');
    for (let marketAddress of Object.keys(siloV1Markets)) {
        let market = siloV1Markets[marketAddress];
        let poolAddress = market.pool;
        for (let asset1 of market.assets)
            for (let asset2 of market.assets) {
                const APR_D_X = Number(await siloV1.getSupplyAPR(poolAddress, asset1));
                const APR_B_Y = Number(await siloV1.getBorrowAPR(poolAddress, asset2));
                const LTV_X = Number(await siloV1.getLTV(poolAddress, asset2));
                const symbol1 = await token.getSymbol(asset1);
                const symbol2 = await token.getSymbol(asset2);
                if (APR_D_X > 0 && APR_B_Y > 0 && APR_D_X > APR_B_Y && LTV_X > 0) {
                    console.log(`SILOv1 --> Market: ${poolAddress}, Supply token: ${symbol1} and deposit token: ${symbol2}`);

                    let data: any = {
                        market: poolAddress,
                        pairToken: [symbol1, symbol2],
                        apr: {
                            [symbol1]: {
                                DepositAPR: APR_D_X,
                                LTV: LTV_X
                            },
                            [symbol2]: {
                                BorrowAPR: APR_B_Y
                            }
                        }
                    }
                    if (!result.loop.SILOv1) {
                        result.loop.SILOv1 = [];
                    }
                    result.loop.SILOv1.push(data);
                }
                await sleep(200);
            }
    }
    console.log("Done silo!");

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
                                pairProtocol: [`SILOv1.${poolAddress1}`, `SILOv1.${poolAddress2}`],
                                pairToken: [symbol1,symbol2],
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
                            result.arbitrage.push(data);
                        }
                        await sleep(100);
                    }
        }
    console.log("Done arbitrage!");
    writeFileSync("data.json", JSON.stringify(result, null, 2));
}

main();