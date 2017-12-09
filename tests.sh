#!/bin/bash

echo "$(date) Compiling Tests"
tsc --outDir test_output tests/*.ts
tsc --outDir test_output tests/*/*.ts

node test_output/tests/Parser/ParseEngineTest.js
echo "$(date) Tests Done"