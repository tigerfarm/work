#!/bin/bash

JQ_CHECK=$(which jq)
if [ -z "$JQ_CHECK" ]; then
  echo
  echo "This script requires the jq JSON processor. Please install for your OS from https://stedolan.github.io/jq/download/"
  echo
  exit 1
fi

if [ $# -ne 1 ]; then
  echo
  echo "usage: $0 <stream_name>"
  echo
  exit 1
fi

# Set the stream name
STREAM_NAME=$1

# Choose the iterator type:
# TRIM HORIZON is for starting at the begining of the Kinesis Stream.
# This can take a while if you have a lot of records.
# To use TRIM HORIZON, uncomment the following line:
# TYPE=TRIM_HORIZON

# AT_TIMESTAMP allows you to go back to a point in time. This is set for going back one hour
# To use AT_TIMESTAMP, uncomment the following two lines:
# TIMESTAMP=$(($(date +%s) - 3600)).000
# TYPE="AT_TIMESTAMP --timestamp $TIMESTAMP"

# LATEST means start at the most current point in the stream and read forward
TYPE=LATEST

# Get a list of shards
SHARDS=$(aws kinesis list-shards --stream-name $STREAM_NAME | jq -r .Shards[].ShardId)

# Get all the starting points
SHARD_ITERATOR=()
i=0
for shard in $SHARDS ; do
  SHARD_ITERATOR[$i]=$(aws kinesis get-shard-iterator --shard-id $shard --shard-iterator-type $TYPE --stream-name $STREAM_NAME --query 'ShardIterator')
  i=$((i+1))
done

# Start getting events from all shards and display them
while [ 1 ] ; do
  len=${#SHARD_ITERATOR[@]}
  for (( i=0; i < $len; i++ )); do
    DATA=$(aws kinesis get-records --limit 50 --shard-iterator ${SHARD_ITERATOR[$i]})
    SHARD_ITERATOR[$i]=$(echo $DATA | jq -r .NextShardIterator)
    ROWS=$(echo $DATA | jq -r .Records[].Data?)
    for row in $ROWS; do
      echo $row | base64 -d | jq .
    done
  done
done

