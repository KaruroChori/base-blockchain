#!/bin/bash
rm -r ./docs/content/schemas/* 2>/dev/null
rm -r ./docs/static/schemas/* 2>/dev/null
rm -r ./docs/dist/docs/* 2>/dev/null


jsonschema2md -d ./src/auto-schemas/ -o ./docs/content/schemas -x ./docs/static/schemas -m archetype=SchemaPage --mx archetype=Chapter --mx weight=40


cd ./docs && hugo --destination ../dist/docs