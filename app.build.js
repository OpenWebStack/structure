({
  appDir: "app/",
  baseUrl: "js/",
  dir: "app-build/",
  optimize: 'none',
  mainConfigFile: 'app/js/bootstrap.js',
  modules: [
    {name: "bootstrap"}
  ],
  removeCombined: true, //in the build delete files that get concatenated into others
  logLevel: 0, //output results as they happen
  findNestedDependencies: true, //add nested requires to the build
  optimizeCss: "standard",
  inlineText: true
})