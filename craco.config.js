const CracoEnvPlugin = require("craco-plugin-env")

module.exports = {
  plugins: [
    {
      plugin: CracoEnvPlugin,
      options: {
        envDir: "./src/config/",
      },
    },
  ],
}
