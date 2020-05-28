#!/bin/zsh
npx nodemon --exec "RUST_BACKTRACE=1 deno run --unstable --allow-env --allow-net --allow-read --allow-write --allow-plugin" ./src/server.ts
