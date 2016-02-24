const path = require('path')

module.exports = (plop, config) => {
  plop.setGenerator(`${config.prefix}init`, {
    description: 'init the redux folder',
    prompts: [{
      type: 'confirm',
      message: 'Do you want to include react-router-redux?',
      name: 'reduxRouter'
    }],
    actions: (answers) => {
      if (answers.reduxRouter) {
        console.log('add that router!')
      }

      return [{
        type: 'add',
        path: path.resolve(config.basePath, 'index.js'),
        templateFile: path.resolve(__dirname, 'index.hbs')
      }]
    }
  })
}
