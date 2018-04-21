"use strict";
var bpmn = require("bpmn");
/**
 * Created by zwscm on 2/19/17.
 */
var workFlowEngineImpl = (function () {
    function workFlowEngineImpl() {
    }
    workFlowEngineImpl.prototype.getInstance = function () {
        return workFlowEngineImpl._instance;
    };
    workFlowEngineImpl.prototype.setBpmnFile = function (filePath) {
        workFlowEngineImpl.manager.addBpmnFilePath(filePath);
    };
    workFlowEngineImpl.prototype.createProcess = function (processId) {
        workFlowEngineImpl.manager.createProcess(processId, function (err, myProcess) {
            myProcess.triggerEvent("MyStart");
        });
    };
    workFlowEngineImpl._instance = new workFlowEngineImpl();
    workFlowEngineImpl.manager = new bpmn.ProcessManager();
    return workFlowEngineImpl;
}());
exports.workFlowEngineImpl = workFlowEngineImpl;
