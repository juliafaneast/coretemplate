/// <reference types="node" />
/**
 * Created by enixjin on 6/15/16.
 */
export declare namespace encryption {
    function encryptMd5(s: string): any;
    function encryptRC4(content: Buffer | string): any;
    function decryptRC4(content: Buffer | string): any;
    function encryptAES128(key: Buffer | string, content: Buffer | string): any;
    function decryptAES128(key: Buffer | string, content: Buffer | string): any;
}
