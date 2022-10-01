#!/bin/bash

echo "=Generating types="
echo "Automatic generation of TS types from schemas:"

rm -r ./src/types.auto/* 2>/dev/null
rm -r ./schemas/build/* 2>/dev/null

FILES=$(find ./schemas/src -regex ".*\.\(json\|yaml\)");

for file in $FILES; do
  FILE=${file#./schemas/src/}
  POS=$(dirname ${FILE})
  
  echo "- $FILE"
  mkdir -p "./schemas/build/$POS" && touch "./schemas/build/${FILE%.*}.json"
  echo "{\"\$ref\":\"${file}\"}">> "./schemas/build/${FILE%.*}.json"

  echo "export * from \"./${FILE%.*}\"" >> "./src/types.auto/index.d.ts"
done

json2ts -i ./schemas/build -o ./src/types.auto/ 
echo "**done**"
