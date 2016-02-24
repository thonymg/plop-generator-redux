const path = require('path')

module.exports = (plop, config) => {
  plop.setGenerator(`${config.prefix}selectors`, {
    description: 'generate selectors file',
    prompts: [{
      type: 'directory',
      message: 'Reducer name',
      name: 'reducerNameInput',
      basePath: config.basePath
    }],
    actions: [{
      type: 'add',
      path: path.resolve(config.basePath, '{{> reducerName }}', 'selectors.js'),
      templateFile: path.resolve(__dirname, 'selectors.hbs')
    }, {
      type: 'add',
      path: path.resolve(config.basePath, '{{> reducerName }}', 'selectors.spec.js'),
      templateFile: path.resolve(__dirname, 'selectors.spec.hbs')
    }]
  })

  plop.setGenerator(`${config.prefix}selectors:selector`, {
    description: 'generate a selector',
    prompts: [{
      type: 'directory',
      message: 'Reducer name',
      name: 'reducerNameInput',
      basePath: config.basePath
    }, {
      type: 'input',
      message: 'Selector name',
      name: 'selectorName',
      validate: (value) => {
        const result = !!value.length || 'this field is required'
        return result
      }
    }],
    actions: [{
      type: 'modify',
      path: path.resolve(config.basePath, '{{> reducerName }}', 'selectors.js'),
      pattern: /($)/,
      templateFile: path.resolve(__dirname, 'selector.hbs')
    }, {
      type: 'modify',
      path: path.resolve(config.basePath, '{{> reducerName }}', 'selectors.spec.js'),
      pattern: /(\}\)\n$)/,
      templateFile: path.resolve(__dirname, 'selector.spec.hbs')
    }]
  })
}
