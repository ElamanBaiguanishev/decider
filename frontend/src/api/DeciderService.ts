import { IDecider } from "../types/decider/Decider";
import { BaseService } from "./BaseService";

class DeciderService extends BaseService<IDecider> {
    constructor() {
        super('decider');
    }
}

export const deciderService = new DeciderService();