module.exports = (env) => {
  const config = require(`./webpack.config.${env.file}`);
  return config(env);
}