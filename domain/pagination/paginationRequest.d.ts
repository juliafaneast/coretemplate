/**
 * Created by enixjin on 4/18/16.
 */
export declare class paginationRequest {
    start: number;
    length: number;
    searchAllColumn: string;
    columns: [column];
}
export declare class column {
    name: string;
    value: string;
    search: string;
    order: string;
}
