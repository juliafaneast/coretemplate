"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by enixjin on 02/22/17.
 */
var multer = require("multer");
var baseController_1 = require("./baseController");
var imageController = (function (_super) {
    __extends(imageController, _super);
    function imageController() {
        _super.call(this);
        /**
         * add following line to your app.js to view upload image
         * app.use('/upload', [new imageController().getRouter()]);
         * app.use('/image', express.static(global.config.imagePath));
         **/
        this.uploadFolder = global.config.imagePath;
        this.initRouters();
    }
    imageController.prototype.initRouters = function () {
        var storage = multer.diskStorage({
            destination: this.uploadFolder,
            filename: function (req, file, cb) {
                cb(null, file.originalname.split('.')[0] + '.' + Date.now() + '.' + file.originalname.split('.')[1]);
            }
        });
        var upload = multer({ storage: storage });
        //upload single image
        this.router.post('/', upload.single("imageFile"), function (req, res, next) {
            var file = req.file;
            if (file) {
                res.jsonp({ success: true, filename: file.filename });
            }
            else {
                res.status(400).jsonp({ message: "upload failed, file[imageFile] not found in request!" });
            }
        });
    };
    return imageController;
}(baseController_1.baseController));
exports.imageController = imageController;
