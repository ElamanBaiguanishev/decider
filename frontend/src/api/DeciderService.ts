import { IDecider } from "../types/decider/decider";
import { BaseService } from "./BaseService";

class DeciderService extends BaseService<IDecider> {
    constructor() {
        super('decider');
    }
}

export const deciderService = new DeciderService();