"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReadmeMarkdownFile = generateReadmeMarkdownFile;
exports.convertReadmeMdToImage = convertReadmeMdToImage;
var hasha_1 = require("hasha");
var just_zip_it_1 = require("just-zip-it");
var node_fs_1 = require("node:fs");
var node_os_1 = require("node:os");
var outdent_1 = require("outdent");
var pathe_1 = require("pathe");
var sharp_1 = require("sharp");
var paths_ts_1 = require("./paths.ts");
// @ts-expect-error: bad typings
var mdimg_1 = require("mdimg");
function generateReadmeMarkdownFile(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var getImagePieceSrc, getImgWidth, readmeFooter, readme;
        var imageWidth = _b.imageWidth, darkModeImagePieces = _b.darkModeImagePieces, lightModeImagePieces = _b.lightModeImagePieces, lightModeReadmeMdImageFilepath = _b.lightModeReadmeMdImageFilepath, darkModeReadmeMdImageFilepath = _b.darkModeReadmeMdImageFilepath;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    getImagePieceSrc = function (_a) {
                        var filepath = _a.filepath, imgSrc = _a.imgSrc, theme = _a.theme;
                        return "https://leonsilicon.github.io/leonsilicon/generator/generated/".concat(imgSrc === undefined ?
                            pathe_1.default.basename(filepath) :
                            imgSrc.replace('${README_MD_SRC}', pathe_1.default.basename(theme === 'light' ?
                                lightModeReadmeMdImageFilepath :
                                darkModeReadmeMdImageFilepath)));
                    };
                    getImgWidth = function (width) { return "".concat((width / imageWidth) * 100, "%"); };
                    readmeFooter = (0, outdent_1.outdent)({ trimLeadingNewline: false })(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t\t###### \uD83D\uDC46 The above image is interactive! Try clicking on the tabs :)\n\t"], ["\n\t\t###### \uD83D\uDC46 The above image is interactive! Try clicking on the tabs :)\n\t"])));
                    readme = (0, just_zip_it_1.default)(lightModeImagePieces, darkModeImagePieces).map(function (_a) {
                        var lightModeImagePiece = _a[0], darkModeImagePiece = _a[1];
                        var href = lightModeImagePiece.href;
                        var imgWidth = getImgWidth(lightModeImagePiece.width);
                        var lightModeImgSrc = getImagePieceSrc(__assign(__assign({}, lightModeImagePiece), { theme: 'light' }));
                        var darkModeImgSrc = getImagePieceSrc(__assign(__assign({}, darkModeImagePiece), { theme: 'dark' }));
                        var pictureHtml = (0, outdent_1.outdent)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\t\t\t\t<picture><source media=\"(prefers-color-scheme: light)\" srcset=\"", "\"><source media=\"(prefers-color-scheme: dark)\" srcset=\"", "\"><img src=\"", "\" width=\"", "\" /></picture>\n\t\t\t"], ["\n\t\t\t\t<picture><source media=\"(prefers-color-scheme: light)\" srcset=\"", "\"><source media=\"(prefers-color-scheme: dark)\" srcset=\"", "\"><img src=\"", "\" width=\"", "\" /></picture>\n\t\t\t"])), lightModeImgSrc, darkModeImgSrc, lightModeImgSrc, imgWidth);
                        var markdown = href === null ?
                            pictureHtml :
                            "<a href=\"".concat(href, "\">").concat(pictureHtml, "</a>");
                        return markdown;
                    }).join('') + readmeFooter;
                    return [4 /*yield*/, node_fs_1.default.promises.writeFile(pathe_1.default.join(paths_ts_1.monorepoDirpath, '../readme.markdown'), readme)];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function convertReadmeMdToImage(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var img, _c, imgHash, image, _d, width, height, readmeMdImageFilepath;
        var _e;
        var imageWidth = _b.imageWidth, imageHeight = _b.imageHeight, theme = _b.theme;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _c = mdimg_1.convert2img;
                    _e = {
                        mdFile: pathe_1.default.join(paths_ts_1.monorepoDirpath, '../README.md')
                    };
                    return [4 /*yield*/, node_os_1.default.tmpdir()];
                case 1: return [4 /*yield*/, _c.apply(void 0, [(_e.outputFilename = _f.sent(),
                            _e.width = imageWidth,
                            _e.height = imageHeight,
                            _e.cssTemplate = theme === 'light' ? 'github' : 'githubdark',
                            _e)])];
                case 2:
                    img = _f.sent();
                    return [4 /*yield*/, (0, hasha_1.hash)(img.data)];
                case 3:
                    imgHash = _f.sent();
                    image = (0, sharp_1.default)(img.data);
                    return [4 /*yield*/, image.metadata()];
                case 4:
                    _d = _f.sent(), width = _d.width, height = _d.height;
                    if (!width || !height) {
                        throw new Error('Could not get image dimensions');
                    }
                    readmeMdImageFilepath = pathe_1.default.join(paths_ts_1.monorepoDirpath, "generated/readme-".concat(theme, ".").concat(imgHash, ".png"));
                    return [4 /*yield*/, image
                            .resize(369, 230)
                            .extract({
                            left: 1,
                            top: 1,
                            width: 369 - 2,
                            height: 230 - 2,
                        })
                            .extend({
                            top: 1,
                            bottom: 1,
                            left: 1,
                            right: 1,
                            background: theme === 'light' ? '#000000' : '#EEEEEE',
                        }).toFile(readmeMdImageFilepath)];
                case 5:
                    _f.sent();
                    return [2 /*return*/, readmeMdImageFilepath];
            }
        });
    });
}
var templateObject_1, templateObject_2;
