#!/bin/bash

echo "$(date) Compiling Tests"
tsc --outDir test_output tests/*.ts
tsc --outDir test_output tests/*/*.ts

echo "$(date) Running All Tests"
for test_file in test_output/tests/*.js test_output/tests/*/*.js
do
  echo "$(date) Running ${test_file}"
  node ${test_file}
done
echo "$(date) Tests Done"