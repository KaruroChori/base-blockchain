#/bin/bash

rm -rf .src.old
mkdir src.old
cp -r src/api.auto .src.old/api.auto

#Perform destructive changes on the original code base
