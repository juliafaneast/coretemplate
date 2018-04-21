/**
 * Created by enixjin on 4/18/16.
 */
"use strict";
var paginationRequest = (function () {
    function paginationRequest() {
        this.searchAllColumn = "";
    }
    return paginationRequest;
}());
exports.paginationRequest = paginationRequest;
var column = (function () {
    function column() {
        this.order = "";
    }
    return column;
}());
exports.column = column;
