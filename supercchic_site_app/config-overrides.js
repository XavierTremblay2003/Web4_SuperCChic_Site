module.exports = function override (config, env) {
    console.log('override')
    let loaders = config.resolve
    loaders.fallback = {
        "buffer": require.resolve("buffer/"),
        "timers": require.resolve("timers-browserify")
    }
    
    return config
}