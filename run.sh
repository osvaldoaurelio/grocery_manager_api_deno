#!/bin/zsh
deno run\
  --unstable\
  --allow-env\
  --allow-net\
  --allow-read\
  --allow-write\
  --allow-plugin\
  ./src/server.ts
