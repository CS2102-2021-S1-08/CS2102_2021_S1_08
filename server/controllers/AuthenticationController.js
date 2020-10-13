const {User} = require('../models')

module.export = {
    async register(req, res) {
        try {
            const user = await User.create(req.body)
        } catch (err) {
            res.status(400).send({
                
            })
        }
        
    }
}