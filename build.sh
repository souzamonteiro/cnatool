#!/bin/sh

rm -rf doc/*

jsdoc -c ./jsdoc.json -d ./doc ./package.json ./maia
