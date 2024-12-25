"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImagePieces = generateImagePieces;
var image_config_json_1 = require("#data/image-config.json");
var hasha_1 = require("hasha");
var node_fs_1 = require("node:fs");
var pathe_1 = require("pathe");
var sharp_1 = require("sharp");
var paths_ts_1 = require("./paths.ts");
function generateImagePieces(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var generatedDirpath, lineHeight, currentY, image, _c, imageWidth, imageHeight, crops, _i, _d, row, currentX, _e, _f, link, leftX, rightX, unparsedHref, imgSrc, href, imagePieces;
        var _this = this;
        var imageFilepath = _b.imageFilepath;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    generatedDirpath = pathe_1.default.join(paths_ts_1.monorepoDirpath, 'generated');
                    return [4 /*yield*/, node_fs_1.default.promises.rm(generatedDirpath, { recursive: true, force: true })];
                case 1:
                    _g.sent();
                    return [4 /*yield*/, node_fs_1.default.promises.mkdir(generatedDirpath, { recursive: true })];
                case 2:
                    _g.sent();
                    lineHeight = 6;
                    currentY = 0;
                    image = (0, sharp_1.default)(imageFilepath);
                    return [4 /*yield*/, image.metadata()];
                case 3:
                    _c = _g.sent(), imageWidth = _c.width, imageHeight = _c.height;
                    if (!imageWidth || !imageHeight) {
                        throw new Error('Could not get image dimensions');
                    }
                    crops = [];
                    for (_i = 0, _d = image_config_json_1.default.rows; _i < _d.length; _i++) {
                        row = _d[_i];
                        currentX = 0;
                        for (_e = 0, _f = row.links; _e < _f.length; _e++) {
                            link = _f[_e];
                            leftX = link.leftX, rightX = link.rightX, unparsedHref = link.href, imgSrc = link.imgSrc;
                            href = unparsedHref.replace('${LATEST_CONTENT_URL}', 'https://www.tiktok.com/@leonsilicon/video/7350626104736025862');
                            // If this image link is not directly next to the previous image link,
                            // we need to crop the image inbetween and create a non-link image
                            if (currentX < leftX) {
                                crops.push({
                                    left: currentX,
                                    top: currentY,
                                    width: leftX - currentX,
                                    height: row.bottomY - currentY,
                                    href: null,
                                    imgSrc: undefined,
                                });
                            }
                            crops.push({
                                left: leftX,
                                top: currentY,
                                width: rightX - leftX,
                                height: row.bottomY - currentY,
                                href: href,
                                imgSrc: imgSrc,
                            });
                            currentX = rightX;
                        }
                        if (currentX < imageWidth) {
                            crops.push({
                                left: currentX,
                                top: currentY,
                                width: imageWidth - currentX,
                                height: row.bottomY - currentY,
                                href: null,
                                imgSrc: undefined,
                            });
                        }
                        currentY = row.bottomY + lineHeight;
                    }
                    return [4 /*yield*/, Promise.all(crops.map(function (crop) { return __awaiter(_this, void 0, void 0, function () {
                            var href, dimensions, buffer, bufferHash, filepath;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        href = crop.href, dimensions = __rest(crop, ["href"]);
                                        return [4 /*yield*/, image.clone().extract(dimensions).toFormat('png')
                                                .toBuffer()];
                                    case 1:
                                        buffer = _a.sent();
                                        return [4 /*yield*/, (0, hasha_1.hash)(buffer)];
                                    case 2:
                                        bufferHash = _a.sent();
                                        filepath = pathe_1.default.join(paths_ts_1.monorepoDirpath, 'generated', "".concat(bufferHash, ".png"));
                                        return [4 /*yield*/, node_fs_1.default.promises.writeFile(filepath, buffer)];
                                    case 3:
                                        _a.sent();
                                        return [2 /*return*/, {
                                                filepath: filepath,
                                                href: href,
                                                width: dimensions.width,
                                                height: dimensions.height,
                                                imgSrc: crop.imgSrc,
                                            }];
                                }
                            });
                        }); }))];
                case 4:
                    imagePieces = _g.sent();
                    return [2 /*return*/, imagePieces];
            }
        });
    });
}
