import axios from "axios";

export const sleep = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getPrice = async (token: String) => {
    let id = 0;
    if (token == 'compound') id = 5692;
    if (token == 'eth') id = 1027
    const data = (await axios.get(`https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail/chart?id=${id}&range=1D`)).data.data.points;
    const keys = Object.keys(data);
    const length = keys.length;
    return data[keys[length-1]].v[0];
}