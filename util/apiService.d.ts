/**
 * Created by enixjin on 5/18/16.
 */
import { Subject } from "rxjs/Rx";
export declare class apiService {
    apiSteam: Subject<api>;
    private static _instance;
    static getInstance(): apiService;
    constructor();
    push(info: api): void;
}
export interface api {
    method: string;
    url: string;
}
