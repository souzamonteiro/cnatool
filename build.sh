#!/bin/sh

rm -rf build/*
rm -rf docs/*

cp -rf node_modules/sigma/build/* js/

bin/maiascript.js -c -o build/cna.js ./maia/cna/cna.maia
bin/maiascript.js -c -o build/snet.js ./maia/snet/snet.maia
cp build/* src/
cp build/* js/

cat src/Shebang.js js/libmaia.js src/cna.js src/snet.js src/CNATool.js > build/cnatool.js

cp build/cnatool.js js/
cp build/cnatool.js bin/

chmod 755 bin/*

jsdoc -d ./docs ./package.json ./src
jsdoc -c ./jsdoc.json -d ./docs ./maia/cna/package.json ./maia/cna
jsdoc -c ./jsdoc.json -d ./docs ./maia/snet/package.json ./maia/snet

cp manual/* docs/
