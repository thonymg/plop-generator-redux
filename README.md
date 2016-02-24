# plop-generator-redux

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
[![build status](https://img.shields.io/travis/kevin-wolf/plop-generator-redux.svg?style=flat-square)](https://travis-ci.org/kevin-wolf/plop-generator-redux)
[![npm version](https://img.shields.io/npm/v/plop-generator-redux.svg?style=flat-square)](https://www.npmjs.com/package/plop-generator-redux)

> [Plop](http://github.com/amwmedia/plop) generator for opinionated [redux](http://github.com/reactjs/redux) scaffolding. Generates your reducer folders, action creators and [reselect](https://github.com/reactjs/reselect).

## Configuration
1. Install `plop` globally in your system.
```
npm install -g plop
```
2. Install `plop` and `plop-generator-redux` locally in your project.
```
npm install --save-dev plop plop-generator-redux
```
3. In your `plopfile.js`, require the `plop-generator-redux` module and pass the `plop` object and optionally some configuration.
```js
var path = require('path');
module.exports = (plop) => {
  require('plop-generator-redux', {
    basePath: path.resolve(__dirname, 'app', 'stores'),
    prefix: 'redux'
  });
}
```

## Configuration object
| Attribute | Default   | Description                                       |
| --------- | --------- |-------------------------------------------------- |
| basePath  | app/redux | Path in which the generator will put files        |
| prefix    |           | Adds a prefix to each generator followed by a `:` |

## Usage
Run `plop` to see the list of generators, or run `plop [generator]` to use that generator.

## Available generators
1. `init`: generates the initial folder and `index.js` to import all reducers and combine them.

  ```
  > plop init
  [CREATE] ./app/redux/index.js
  ```
  
2. `reducer`: generates a reducer folder within the initial folder. Optionally generates action creators and selectors file.
  
  ```
  > plop reducer
  > Reducer name: my initial reducer
  [CREATE] ./app/redux/myInitialReducer/reducer.js
  [CREATE] ./app/redux/myInitialReducer/reducer.spec.js
  [MODIFY] ./app/redux/index.js
  ```
  
3. `reducer:action`: generates an action for a given reducer. Optionally generates action creator.
  
  ```
  > plop reducer:action
  > Reducer name: myInitialReducer
  > Action name: my action
  > Generate action creator? No
  [MODIFY] ./app/redux/myInitialReducer/reducer.js
  [MODIFY] ./app/redux/myInitialReducer/reducer.spec.js
  ```
  
  ```
  > plop reducer:action
  > Reducer name: myInitialReducer
  > Action name: my action
  > Generate action creator? Yes
  [MODIFY] ./app/redux/myInitialReducer/reducer.js
  [MODIFY] ./app/redux/myInitialReducer/reducer.spec.js
  [MODIFY] ./app/redux/myInitialReducer/actions.js
  [MODIFY] ./app/redux/myInitialReducer/actions.spec.js
  ```
  
4. `actions`: generates the action creators file for a given reducer.
  
  ```
  > plop actions
  > Reducer name: myInitialReducer
  [CREATE] ./app/redux/myInitialReducer/actions.js
  [CREATE] ./app/redux/myInitialReducer/actions.spec.js
  ```
  
5. `actions:action`: generates an action within a given reducer folder (it does not add the action to the reducer.js file).
  
  ```
  > plop actions:action
  > Reducer name: myInitialReducer
  > Action name: my action
  [MODIFY] ./app/redux/myInitialReducer/actions.js
  [MODIFY] ./app/redux/myInitialReducer/actions.spec.js
  ```
  
6. `selectors`: generates selectors file for a given reducer.
  
  ```
  > plop selectors
  > Reducer name: myInitialReducer
  [CREATE] ./app/redux/myInitialReducer/selectors.js
  [CREATE] ./app/redux/myInitialReducer/selectors.spec.js
  ```
  
7. `selectors:selector`: generates a selector within a given reducer folder.
  
  ```
  > plop selectors:selector
  > Reducer name: myInitialReducer
  > Action name: my selector
  [MODIFY] ./app/redux/myInitialReducer/selectors.js
  [MODIFY] ./app/redux/myInitialReducer/selectors.spec.js
  ```

## License
MIT
