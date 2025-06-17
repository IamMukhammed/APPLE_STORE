const { name } = require("ejs");

module.exports = {
  apps: [
    {
      name: "Apple Tech Store",
      cwq: "./",
      script: "./dist/server.js",
      watch: false,
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
      instances: 1,
      exec_mode: "cluster",
    },
  ],
};

/*
fork & cluster:


*/
