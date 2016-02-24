const path = require('path')

module.exports = (plop, config) => {
  plop.setGenerator(`${config.prefix}actions`, {
    description: 'generate actions file',
    prompts: [{
      type: 'directory',
      message: 'Reducer name',
      name: 'reducerNameInput',
      basePath: config.basePath
    }],
    actions: [{
      type: 'add',
      path: path.resolve(config.basePath, '{{> reducerName }}', 'actions.js'),
      templateFile: path.resolve(__dirname, 'actions.hbs')
    }, {
      type: 'add',
      path: path.resolve(config.basePath, '{{> reducerName }}', 'actions.spec.js'),
      templateFile: path.resolve(__dirname, 'actions.spec.hbs')
    }]
  })

  plop.setGenerator(`${config.prefix}actions:action`, {
    description: 'generate an action',
    prompts: [{
      type: 'directory',
      message: 'Reducer name',
      name: 'reducerNameInput',
      basePath: config.basePath
    }, {
      type: 'input',
      message: 'Action name',
      name: 'actionName',
      validate: (value) => {
        const result = !!value.length || 'this field is required'
        return result
      }
    }],
    actions: [{
      type: 'modify',
      path: path.resolve(config.basePath, '{{> reducerName }}', 'actions.js'),
      pattern: /($)/,
      templateFile: path.resolve(__dirname, 'action.hbs')
    }, {
      type: 'modify',
      path: path.resolve(config.basePath, '{{> reducerName }}', 'actions.spec.js'),
      pattern: /(\}\)\n$)/,
      templateFile: path.resolve(__dirname, 'action.spec.hbs')
    }]
  })
}
