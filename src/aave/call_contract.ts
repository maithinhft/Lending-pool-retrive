// aavev3

// ReserveConfigurationMap configuration;
// uint128 liquidityIndex;
// uint128 currentLiquidityRate;
// uint128 variableBorrowIndex;
// uint128 currentVariableBorrowRate;
// uint128 currentStableBorrowRate;
// uint40 lastUpdateTimestamp;
// uint16 id;
// address aTokenAddress;
// address stableDebtTokenAddress;
// address variableDebtTokenAddress;
// address interestRateStrategyAddress;
// uint128 accruedToTreasury;
// uint128 unbacked;
// uint128 isolationModeTotalDebt;

//bit 0-15: LTV
//bit 16-31: Liq. threshold
//bit 32-47: Liq. bonus
//bit 48-55: Decimals
//bit 56: reserve is active
//bit 57: reserve is frozen
//bit 58: borrowing is enabled
//bit 59: DEPRECATED: stable rate borrowing enabled
//bit 60: asset is paused
//bit 61: borrowing in isolation mode is enabled
//bit 62: siloed borrowing enabled
//bit 63: flashloaning enabled
//bit 64-79: reserve factor
//bit 80-115: borrow cap in whole tokens, borrowCap == 0 => no cap
//bit 116-151: supply cap in whole tokens, supplyCap == 0 => no cap
//bit 152-167: liquidation protocol fee
//bit 168-175: DEPRECATED: eMode category
//bit 176-211: unbacked mint cap in whole tokens, unbackedMintCap == 0 => minting disabled
//bit 212-251: debt ceiling for isolation mode with (ReserveConfiguration::DEBT_CEILING_DECIMALS) decimals
//bit 252: virtual accounting is enabled for the reserve
//bit 253-255 unused

// radiant

// ReserveConfigurationMap configuration;
// uint128 liquidityIndex;
// uint128 variableBorrowIndex;
// uint128 currentLiquidityRate;
// uint128 currentVariableBorrowRate;
// uint128 currentStableBorrowRate;
// uint40 lastUpdateTimestamp;
// address aTokenAddress;
// address stableDebtTokenAddress;
// address variableDebtTokenAddress;
// address interestRateStrategyAddress;
// uint8 id;

//bit 0-15: LTV
//bit 16-31: Liq. threshold
//bit 32-47: Liq. bonus
//bit 48-55: Decimals
//bit 56: Reserve is active
//bit 57: reserve is frozen
//bit 58: borrowing is enabled
//bit 59: stable rate borrowing enabled
//bit 60-63: reserved
//bit 64-79: reserve factor

import { ethers } from 'ethers';
import abi_pools from "../../json/abi_pools.json";
import { chain_to_rpc } from '../config/config';

export async function get_reserve_data(rpc_url: string, pool_address: string, token_address: string, protocol: string = "aavev3") {
    try {
        const provider = new ethers.JsonRpcProvider(rpc_url);
        const Con = new ethers.Contract(pool_address, (abi_pools as any)[protocol], provider);

        let tx: any;

        tx = await Con.getReserveData(token_address);

        return tx;
    } catch (err) {
        console.log(err);
        return {};
    }
}

export async function get_tokens_of_pool(rpc_url: string, pool_address: string, protocol: string = "aavev3") {
    try {
        const provider = new ethers.JsonRpcProvider(rpc_url);
        const Con = new ethers.Contract(pool_address, (abi_pools as any)[protocol], provider);

        let tx: any;

        tx = await Con.getReservesList();

        return tx;
    } catch (err) {
        console.log(err);
        return [];
    }
}

// get_tokens_of_pool(chain_to_rpc['0x38'], "0x6807dc923806fE8Fd134338EABCA509979a7e0cB")
//     .then((res) => { console.log(res) });

// get_reserve_data("https://eth.llamarpc.com", "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2")
//     .then((res) => { console.log(res) });

// get_reserve_data("https://arb1.arbitrum.io/rpc", "0xE23B4AE3624fB6f7cDEF29bC8EAD912f1Ede6886", "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", "radiant")
//     .then((res) => { console.log(res) });
