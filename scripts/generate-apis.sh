#/bin/bash

rm -rf .src.old
mkdir .src.old
cp -r src/api.auto .src.old/api.auto
rm -rf src/api.auto/*

#Perform destructive changes on the original code base

openapi-generator-cli generate -i api/service.openapi.yaml -g typescript -o src/api.auto
