#!/bin/bash
rm -r ./docs/content/schemas/* 2>/dev/null


jsonschema2md -d ./src/auto-schemas/ -o ./docs/content/schemas -e 'json'
cd ./docs && hugo --destination ../dist/docs