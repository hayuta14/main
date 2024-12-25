#!/usr/bin/env tsx
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ora_1 = require("ora");
var pathe_1 = require("pathe");
var sharp_1 = require("sharp");
var image_ts_1 = require("../utils/image.ts");
var paths_ts_1 = require("../utils/paths.ts");
var readme_ts_1 = require("../utils/readme.ts");
var lightModeImageFilepath = pathe_1.default.join(paths_ts_1.monorepoDirpath, 'data/figma-exports/READMELIGHT.png');
var darkModeImageFilepath = pathe_1.default.join(paths_ts_1.monorepoDirpath, 'data/figma-exports/READMEDARK.png');
var image = (0, sharp_1.default)(lightModeImageFilepath);
var _a = await image.metadata(), imageWidth = _a.width, imageHeight = _a.height;
if (!imageWidth || !imageHeight) {
    throw new Error('Could not get image dimensions');
}
var spinner = (0, ora_1.default)('Generating README images...').start();
var _b = await Promise
    .all([
    (0, image_ts_1.generateImagePieces)({ imageFilepath: lightModeImageFilepath }),
    (0, image_ts_1.generateImagePieces)({ imageFilepath: darkModeImageFilepath }),
    (0, readme_ts_1.convertReadmeMdToImage)({ imageWidth: imageWidth, imageHeight: imageHeight, theme: 'light' }),
    (0, readme_ts_1.convertReadmeMdToImage)({ imageWidth: imageWidth, imageHeight: imageHeight, theme: 'dark' }),
]), lightModeImagePieces = _b[0], darkModeImagePieces = _b[1], lightModeReadmeMdImageFilepath = _b[2], darkModeReadmeMdImageFilepath = _b[3];
spinner.text = 'Generating README...';
await (0, readme_ts_1.generateReadmeMarkdownFile)({
    lightModeImagePieces: lightModeImagePieces,
    darkModeImagePieces: darkModeImagePieces,
    imageWidth: imageWidth,
    lightModeReadmeMdImageFilepath: lightModeReadmeMdImageFilepath,
    darkModeReadmeMdImageFilepath: darkModeReadmeMdImageFilepath,
});
spinner.succeed('README generated!');
