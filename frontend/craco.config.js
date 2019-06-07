const CracoAntDesignPlugin = require('craco-antd');
const emotion = require('babel-plugin-emotion');

process.env.BROWSER = "none";

module.exports = {
  plugins: [
    {
      plugin: emotion
    },
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