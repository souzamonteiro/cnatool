#!/bin/sh

rm -rf doc/*

jsdoc -c ./jsdoc.json -d ./doc ./maia/cna/package.json ./maia/cna
