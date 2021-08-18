const config = {
    production: {
        // Storing secret password inside heroku instead of github
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        SECRET: 'holuwateemeeleyin24',
        DATABASE: 'mongodb://localhost:27017/visitorsManagmentSystem'
    }
}
exports.get = function get(env){
    // IF we are in production return the first one
    return config[env] || config.default
}