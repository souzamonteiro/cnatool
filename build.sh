#!/bin/sh

rm -rf doc/*

chmod 755 bin/*

bin/maiascript.js -c -o build/cna.js ./maia/cna/cna.maia
cp build/cna.js js/

jsdoc -c ./jsdoc.json -d ./doc ./maia/cna/package.json ./maia/cna
