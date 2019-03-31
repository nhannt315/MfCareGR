const CracoAntDesignPlugin = require('craco-antd');

process.env.BROWSER = "none";

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#42A5F5',
          '@link-color': '#42A5F5'
        }
      }
    }
  ]
};