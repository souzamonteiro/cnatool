#!/bin/sh

rm -rf build/*
rm -rf docs/*

#bin/maiascript.js -c -o build/cna.js ./maia/cna/cna.maia
cp ./maia/cna/cna.js build/
cp build/cna.js src/
cp build/cna.js js/

cat src/Shebang.js js/libmaia.js src/cna.js src/CNATool.js > build/cnatool.js

cp build/cnatool.js js/
cp build/cnatool.js bin/

chmod 755 bin/*

jsdoc -d ./docs ./package.json ./src
jsdoc -c ./jsdoc.json -d ./docs ./maia/cna/package.json ./maia/cna

cp manual/* docs/
