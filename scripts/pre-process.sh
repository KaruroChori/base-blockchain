#!/bin/bash

# Compile json schemas into TS types, their post-processed variants, and their markdown documentation


# Resolve all yaml and json files (no fragments) with  emrichen

# Compile TS type from them

# Compile markdown from them


echo "=Processing schemas="
rm -r ./src/auto-schemas/* 2>/dev/null
rm -r ./src/auto-types/* 2>/dev/null

FILES=$(find ./specs/schemas -regex ".*\.\(json\|yaml\)");

for file in $FILES; do
  FILE=${file#./specs/schemas/}
  POS=$(dirname ${FILE})
  
  echo "- $FILE"
  mkdir -p "./src/auto-schemas/$POS" && touch "./src/auto-schemas/${FILE%.*}.json"

  emrichen ${file} --output-format json > "./src/auto-schemas/${FILE%.*}.json"
done

#json2ts -i ./src/auto-schemas -o ./src/auto-types   
echo "**done**"
