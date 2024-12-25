"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monorepoDirpath = void 0;
var get_monorepo_root_1 = require("get-monorepo-root");
var nullthrows_es_1 = require("nullthrows-es");
exports.monorepoDirpath = (0, nullthrows_es_1.default)((0, get_monorepo_root_1.getMonorepoDirpath)(import.meta.url));
