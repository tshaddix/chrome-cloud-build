#!/usr/bin/env bash

rm -r build/
mkdir build

webpack --config event/webpack.config.js
# webpack --config content-script/webpack.config.js

cp config/manifest.json build/manifest.json