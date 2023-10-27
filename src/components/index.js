const requireComponents = require.context('./', true, /\.vue$/)

const toLower = name => {
  return name[0] + name[1].toLowerCase() + name.slice(2)
}

const install = Vue => {
  requireComponents.keys().forEach(fileName => {
    const config = requireComponents(fileName)
    const componentName = toLower(config.default.name)
    Vue.component(componentName, config.default)
  })
}

export default {
  install
}
