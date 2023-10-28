// eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/no-var-requires
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
