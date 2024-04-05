#!/usr/bin/env node
const program = require("commander");
const pkg = require("./package");
const main = require("./startup");
let params = {
    config: "config-dev.js",
    db: "signage",
    args: [],
};
main(params);
