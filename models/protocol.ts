import mongoose from "mongoose";

export interface IProtocol {
    forked: string,
    name: string,
    poolToken: string,
    rewardToken: string,
    type: string,
    chainID: string,
    lensAddress: string,
    repositoryAddress: string,
    rewardAddress: string,
    reservesList: Object,
}

const Protocol = new mongoose.Schema<IProtocol>({
    forked: String,
    name: String,
    poolToken: String,
    rewardToken: String,
    type: String,
    chainID: String,
    lensAddress: String,
    repositoryAddress: String,
    rewardAddress: String,
    reservesList: Object,
});

export default mongoose.model<IProtocol>('protocol', Protocol, 'protocol');