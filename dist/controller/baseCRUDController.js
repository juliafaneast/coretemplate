"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var baseController_1 = require("./baseController");
var paginationResponse_1 = require("../domain/pagination/paginationResponse");
var Q = require("q");
var baseCRUDController = (function (_super) {
    __extends(baseCRUDController, _super);
    function baseCRUDController(_domainObject, _repository) {
        _super.call(this);
        this._domainObject = _domainObject;
        this._repository = _repository;
        this.repository = _repository.getInstance();
        this.initRouters();
        this.createCRUD();
    }
    baseCRUDController.prototype.createCRUD = function () {
        var _this = this;
        var domainObject = new this._domainObject();
        var RESTUrl = domainObject.getRESTUrl();
        this.get(RESTUrl, function (req, res, next) {
            _this.repository.listAll().then(function (rows) { return res.status(200).jsonp(rows); }, function (error) { return _this.handleError(error, res); });
        });
        this.get(RESTUrl + '/search', function (req, res, next) {
            _this.repository.search(req.query).then(function (rows) { return res.status(200).jsonp(rows); }, function (error) { return _this.handleError(error, res); });
        });
        this.get(RESTUrl + '/search/like', function (req, res, next) {
            _this.repository.searchLike(req.query).then(function (rows) { return res.status(200).jsonp(rows); }, function (error) { return _this.handleError(error, res); });
        });
        this.get(RESTUrl + '/incremental', function (req, res, next) {
            _this.repository
                .queryByCreateDate(req.query.startDate, req.query.endDate)
                .then(function (result) { return res.status(200).jsonp(result); }, function (error) { return _this.handleError(error, res); });
        });
        this.get(RESTUrl + '/:id', function (req, res, next) {
            _this.repository.queryByID(req.params.id).then(function (result) {
                if (result) {
                    res.status(200).jsonp(result);
                }
                else {
                    res.status(204).jsonp({});
                }
            }, function (error) { return _this.handleError(error, res); });
        });
        this.post(RESTUrl, function (req, res, next) {
            if (Array.isArray(req.body)) {
                _this.repository.batchInsert(req.body).then(function (insertID) { return res.status(201).jsonp({ affectedRows: insertID }); }, function (error) { return _this.handleError(error, res); });
            }
            else {
                req.body.create_date = new Date();
                _this.repository.insert(req.body)
                    .then(function (insertID) { return res.status(201).jsonp({ id: insertID }); }, function (error) { return _this.handleError(error, res); });
            }
        });
        this.put(RESTUrl + '/:id', function (req, res, next) {
            _this.repository.update(req.body, req.params.id).then(function (changedRows) { return res.status(200).jsonp({ affectedRows: changedRows }); }, function (error) { return _this.handleError(error, res); });
        });
        this.delete(RESTUrl + '/:id', function (req, res, next) {
            _this.repository.delete(req.params.id).then(function (changedRows) { return res.status(200).jsonp({ affectedRows: changedRows }); }, function (error) { return _this.handleError(error, res); });
        });
        this.post(RESTUrl + '/pagination', function (req, res, next) {
            var paginationRequest = req.body;
            var result = new paginationResponse_1.paginationResponse();
            Q.all([
                _this.repository.count(),
                _this.repository.countAllLike(paginationRequest),
                _this.repository.queryAllLike(paginationRequest)
            ])
                .spread(function (total, filtered, data) {
                result.recordsTotal = total.count;
                result.recordsFiltered = filtered.count;
                result.data = data;
                res.jsonp(result).end();
            });
        });
    };
    return baseCRUDController;
}(baseController_1.baseController));
exports.baseCRUDController = baseCRUDController;
//# sourceMappingURL=baseCRUDController.js.map