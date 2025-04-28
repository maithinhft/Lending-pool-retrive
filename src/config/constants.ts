import dotenv from "dotenv";
dotenv.config();

export const RPC: any = {
    "ARBITRUM": process.env.RPC_ARBITRUM ?? "https://endpoints.omniatech.io/v1/arbitrum/one/public",
    "ETHEREUM": "https://eth.llamarpc.com",
    'BNB': process.env.RPC_BNB ?? "https://bsc-dataseed2.binance.org",
}

export const SECOND_PER_BLOCK: any = {
    'ARBITRUM': 4,
    'ETHEREUM': 12,
    'BNB': 3,
}