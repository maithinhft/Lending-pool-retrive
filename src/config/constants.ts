import dotenv from "dotenv";
dotenv.config();

export const RPC: any = {
    "ETHEREUM": "https://eth.llamarpc.com",
    "ARBITRUM": process.env.RPC_ARBITRUM ?? "https://endpoints.omniatech.io/v1/arbitrum/one/public",
}

