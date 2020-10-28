#!/bin/sh

rm -rf build/*
rm -rf doc/*

bin/maiascript.js -c -o build/cna.js ./maia/cna/cna.maia
cp build/cna.js src/
cp build/cna.js js/

cat src/Shebang.js js/libmaia.js src/cna.js src/CNATool.js > build/cnatool.js

cp build/cnatool.js js/
cp build/cnatool.js bin/

chmod 755 bin/*

jsdoc -d ./doc ./package.json ./src
jsdoc -c ./jsdoc.json -d ./doc ./maia/cna/package.json ./maia/cna
