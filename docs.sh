#!/bin/bash

# Documentation generation script. Accepts directory as input, and uses bash tools to pull doc strings and generate a
# markdown file. Resulting file is a little rough, but I prefer this to using a large build system.
#
# Usage: ./doc.sh src/Formulas

SRC_DIRECTORY=$1
CURRENT_BLOCK=""
BLOCK_MARKER="\`\`\`"
CAPTURE_NEXT_FUNCTION_NAME=""
FINALIZED_BLOCK=""
DOCUMENTATION_FILE=DOCS.md

function start_block() {
  LINE="$1"
  CURRENT_BLOCK=""
  add_to_block "$LINE"
}


function add_to_block() {
  LINE="$1"
  LINE=$(echo "$LINE" | sed 's/\*\**//g' | sed 's/^\s*\/\s*//g' | sed 's/\s*\/\s*$//g' | sed "s/^[ \s]*//")
  CURRENT_BLOCK="${CURRENT_BLOCK}\n""$LINE"
}


function process_line() {
  LINE=$1
  if [[ $LINE =~ \s*\/\*\*$ ]]
  then
    # If this line matches the opening of a doc comment, start block
    start_block "$LINE"
  elif [[ $LINE =~ \s*\*\/$ ]]
  then
    # If this line matches the end of a doc comment, end block
    add_to_block "$LINE"
    CAPTURE_NEXT_FUNCTION_NAME="TRUE"
  elif [[ $LINE =~ \s*\*.*$ ]]
  then
    # If this line starts with a *, and ends with anything, it's inside a comment.
    add_to_block "$LINE"
  else
    if [[ -n "$CAPTURE_NEXT_FUNCTION_NAME" ]]
    then
      CAPTURE_NEXT_FUNCTION_NAME=""

      # Take the current block, strip line endings where necessary.
      CURRENT_BLOCK=$(printf "$CURRENT_BLOCK" | paste -sd " " - | sed -e $'s/@/\\\n@/g')

      # Grab the function name
      FUNCTION_NAME=$(echo "$LINE" | grep -oE '[A-Z0-9_\$]{1,14}\s')

      # Build the finalized block
      FINALIZED_BLOCK="\n### ${FUNCTION_NAME}\n${FINALIZED_BLOCK}"
      FINALIZED_BLOCK=$FINALIZED_BLOCK$(printf "\n$BLOCK_MARKER\n$CURRENT_BLOCK\n$BLOCK_MARKER")

      # Write block
      echo "Writing formula documentation for: $FUNCTION_NAME"
      printf "$FINALIZED_BLOCK\n" >> $DOCUMENTATION_FILE
      FINALIZED_BLOCK=""
    fi
  fi
}


function parse_file() {
  echo "Writing documentation for file: $FILE"
  FILE=$1

  # Write the file name to the documentation file
  FILE_TITLE=$(basename $FILE .ts)
  printf "## $FILE_TITLE\n\n" >> $DOCUMENTATION_FILE

  # Loop through every line in file.
  while IFS= read -r p; do
    process_line "$p"
  done < "$FILE"
}



# Write the header of the documentation
printf "# Documentation\n\n" > $DOCUMENTATION_FILE

for f in $(ls $SRC_DIRECTORY/*.ts | grep -v AllFormulas)
do
	parse_file "$f"
done


