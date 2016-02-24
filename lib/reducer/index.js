const path = require('path')

module.exports = (plop, config) => {
  plop.setGenerator(`${config.prefix}reducer`, {
    description: 'generate reducer folder',
    prompts: [{
      type: 'input',
      message: 'Reducer name',
      name: 'reducerNameInput',
      validate: (value) => {
        const result = !!value.length || 'this field is required'
        return result
      }
    }, {
      type: 'checkbox',
      message: 'What do you want to include on the reducer folder?',
      name: 'Features',
      choices: [{
        name: 'Action Creators',
        value: 'actions'
      }, {
        name: 'Selectors (reselect)',
        value: 'selectors'
      }]
    }],
    actions: (answers) => {
      var actions = [{
        type: 'add',
        path: path.resolve(config.basePath, '{{> reducerName }}', 'reducer.js'),
        templateFile: path.resolve(__dirname, 'reducer.hbs')
      }, {
        type: 'add',
        path: path.resolve(config.basePath, '{{> reducerName }}', 'reducer.spec.js'),
        templateFile: path.resolve(__dirname, 'reducer.spec.hbs')
      }, {
        type: 'modify',
        path: path.resolve(config.basePath, 'index.js'),
        pattern: /(\nexport default combineReducers)/,
        template: "import {{> reducerName }} from './{{> reducerName }}/reducer'\n$1"
      }, {
        type: 'modify',
        path: path.resolve(config.basePath, 'index.js'),
        pattern: /(\n\}\))/,
        template: ',\n  {{> reducerName }}$1'
      }]

      answers.Features.forEach((feature) => {
        actions = actions.concat(plop.getGenerator(`${config.prefix}${feature}`).actions)
      })

      return actions
    }
  })

  plop.setGenerator(`${config.prefix}reducer:action`, {
    description: 'generate switch case for a reducer',
    prompts: [{
      type: 'directory',
      message: 'Reducer name',
      name: 'reducerNameInput',
      basePath: path.resolve(config.basePath)
    }, {
      type: 'input',
      message: 'Action name',
      name: 'actionName',
      validate: (value) => {
        const result = !!value.length || 'this field is required'
        return result
      }
    }, {
      type: 'confirm',
      message: 'Generate an action creator?',
      name: 'actionCreator'
    }],
    actions: (answers) => {
      var actions = [{
        type: 'modify',
        path: path.resolve(config.basePath, '{{> reducerName }}', 'reducer.js'),
        pattern: /(default:)/,
        templateFile: path.resolve(__dirname, 'action.hbs')
      }, {
        type: 'modify',
        path: path.resolve(config.basePath, '{{> reducerName }}', 'reducer.spec.js'),
        pattern: /(\}\)\n$)/,
        templateFile: path.resolve(__dirname, 'action.spec.hbs')
      }]

      if (answers.actionCreator) {
        actions = actions.concat(plop.getGenerator(`${config.prefix}actions:action`).actions)
      }

      return actions
    }
  })
}
