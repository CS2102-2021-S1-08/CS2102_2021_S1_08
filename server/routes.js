module.exports = (app) => {
    app.get('/status', (req, res) => {
        res.send({
            message: 'hello world'
        })
    });
    
    app.post('/register', (req, res) => {
        res.send({
            message: 'User registered'
        })
    });
}