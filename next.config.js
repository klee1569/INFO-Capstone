const path = require("path");
const fs = require("fs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: fs.realpathSync.native(path.resolve(__dirname)),
  },
};
module.exports = nextConfig;
