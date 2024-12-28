import { IMapEntity } from "../types/map/map-entity";
import { BaseService } from "./BaseService";

class MapService extends BaseService<IMapEntity> {
    constructor() {
        super('maps');
    }
}

export const mapService = new MapService();
