import { ethers } from "ethers";
import { initDriver, quitDriver } from "../services/selenium";
import { sleep } from "../services/util";
import BigNumber from "bignumber.js";
import { By } from "selenium-webdriver";
import { RPC } from "../config/constants";

const ABI = [
    "function borrowAPY(address _silo, address _asset) external view returns (uint256)",
    "function depositAPY(address _silo, address _asset) external view returns (uint256)",
    "function protocolFees(address _silo, address _asset) external view returns (uint256)",
    "function getLiquidationThreshold(address _silo, address _asset) external view override returns (uint256)",
    "function getMaximumLTV(address _silo, address _asset) external view override returns (uint256)",
    "function symbol() public view returns(string)",
    "function totalDeposits(address _silo, address _asset) external view returns (uint256)",
]

const siloLensAddress = '0xBDb843c7a7e48Dc543424474d7Aa63b61B5D9536';
const siloRespositoryAddress = "0x8658047e48CC09161f4152c79155Dac1d710Ff0a";

export class SiloV1 {
    private provider = new ethers.JsonRpcProvider(RPC.ARBITRUM);
    constructor(chain = 'ARBITRUM') {
        this.provider = new ethers.JsonRpcProvider(RPC[chain]);
    }

    public async getSupplyAPR(marketAddress: string, tokenAddress: string) {
        const siloLensContract = new ethers.Contract(siloLensAddress, ABI, this.provider);
        return BigNumber(await siloLensContract.depositAPY(marketAddress, tokenAddress)).multipliedBy(0.75).div(10 ** 18).toFixed(4).toString();
    }

    public async getBorrowAPR(marketAddress: string, tokenAddress: string) {
        const siloLensContract = new ethers.Contract(siloLensAddress, ABI, this.provider);
        return BigNumber(await siloLensContract.borrowAPY(marketAddress, tokenAddress)).div(10 ** 18).toFixed(4).toString();
    }

    public async getLTV(marketAddress: string, tokenAddress: string) {
        const siloRespositoryContract = new ethers.Contract(siloRespositoryAddress, ABI, this.provider);
        return BigNumber(await siloRespositoryContract.getMaximumLTV(marketAddress, tokenAddress)).div(10 ** 18).toString();
    }

    public async getThreshold(marketAddress: string, tokenAddress: string) {
        const siloRespositoryContract = new ethers.Contract(siloRespositoryAddress, ABI, this.provider);
        return BigNumber(await siloRespositoryContract.getLiquidationThreshold(marketAddress, tokenAddress)).div(10 ** 18).toString();
    }

    // public async getInterestAPR(marketAddress: string, tokenAddress: string) {
    //     const siloLensContract = new ethers.Contract(siloLensAddress, ABI, this.provider);
    //     console.log("Interest deposit apr: " + BigNumber(await siloLensContract.depositAPY(marketAddress, tokenAddress)).multipliedBy(0.75).div(10 ** 18).toFixed(4)); // -25 % protocol
    //     console.log("Interest borrow apr: " + BigNumber(await siloLensContract.borrowAPY(marketAddress, tokenAddress)).div(10 ** 18).toFixed(4));
    //     console.log("Protocol fee: " + BigNumber(await siloLensContract.protocolFees(marketAddress, tokenAddress)));
    // }

    public async getRewardAPR(marketAddress: string) {
        let driver = await initDriver();
        try {
            let list = [];
            if (driver) {
                const url = `https://v1.silo.finance/silo/${marketAddress}`;
                await driver.get(url);
                await sleep(20000);
                const elements = await driver.findElements(By.xpath("//*[contains(text(), 'Total deposit APR')]"));
                for (let element of elements) {
                    let text = "0%";
                    const parentElement = await element.findElement(By.xpath("./.."));
                    const nextSiblings = await parentElement.findElements(By.xpath("following-sibling::*[1]"));
                    if (nextSiblings.length > 0) {
                        const nextSibling = nextSiblings[0];
                        // const rewardAPRElements = await nextSibling.findElements(By.xpath(".//*[contains(text(), 'rewards APR in ')]/preceding-sibling::*[1]"));
                        // if (rewardAPRElements.length > 0) {
                        //     const rewardAPRElement = rewardAPRElements[0];
                        //     text = await rewardAPRElement.getAttribute('innerText');
                        // }

                        const rewardAPRElements = await nextSibling.findElements(By.xpath(".//*[contains(text(), 'rewards APR in ')]/.."));
                        if (rewardAPRElements.length > 0) {
                            const rewardAPRElement = rewardAPRElements[0];
                            text = await rewardAPRElement.getAttribute('innerText');
                        }
                    }
                    list.push(text);
                }
            }

            console.log(list);
        } catch (err: any) {
            console.log(err);
        }
        await quitDriver(driver);
    }

    public async thresholdAndLTV() {
        const ABI = [
            "function getLiquidationThreshold(address _silo, address _asset) external view override returns (uint256)",
            "function getMaximumLTV(address _silo, address _asset) external view override returns (uint256)",
        ]
        const siloRespositoryContract = new ethers.Contract(siloRespositoryAddress, ABI, this.provider);
        console.log("LTV: " + BigNumber(await siloRespositoryContract.getMaximumLTV("0x7bec832FF8060cD396645Ccd51E9E9B0E5d8c6e4", "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1")).div(10 ** 18)); // (market, token)
        console.log("Threshold: " + BigNumber(await siloRespositoryContract.getLiquidationThreshold("0x7bec832FF8060cD396645Ccd51E9E9B0E5d8c6e4", "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1")).div(10 ** 18));
    }

    public async liquidity(marketAddress: string, tokenAddress: string) {
        const siloLensContract = new ethers.Contract(siloLensAddress, ABI, this.provider);
        console.log(await siloLensContract.totalDeposits(marketAddress, tokenAddress));
    }
}

export class wrapSiloV1 {
    private marketAddress: string = "";
    private tokenAddress: string = "";
    private silo = new SiloV1();
    private chain = "";
    constructor(marketAddress: string, tokenAddress: string, chain: string) {
        this.marketAddress = marketAddress;
        this.tokenAddress = tokenAddress;
        this.chain;
        this.silo = new SiloV1(chain);
    }

    public async getSupplyAPR() {
        return this.silo.getSupplyAPR(this.marketAddress, this.tokenAddress);
    }

    public async getBorrowAPR() {
        return this.silo.getBorrowAPR(this.marketAddress, this.tokenAddress);
    }

    public async getLtv() {
        return this.silo.getLTV(this.marketAddress, this.tokenAddress);
    }
}

export class Token {
    private provider = new ethers.JsonRpcProvider(RPC.ARBITRUM);
    constructor(chain = 'ARBITRUM') {
        this.provider = new ethers.JsonRpcProvider(RPC[chain]);
    }

    public async getSymbol(address: string) {
        const tokenContract = new ethers.Contract(address, ABI, this.provider);
        return await tokenContract.symbol();
    }
}