module.exports = function(api) {
  const presets = [
    '@babel/preset-react',
    '@babel/preset-typescript',
    ['@babel/env', { modules: false }],
  ]
  const plugins = [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
  ]

  api.cache(true)

  return {
    presets,
    plugins,
  }
}
