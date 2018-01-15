#!/usr/bin/env bash

rm -r build/
mkdir build

webpack --config event/webpack.config.js
webpack --config ui/webpack.config.js

cp config/manifest.json build/manifest.json
cp -r icons build/icons
cp ui/src/index.html build/ui.html