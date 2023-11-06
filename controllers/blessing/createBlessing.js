const moment = require("moment")
module.exports = class createBlessing {
    constructor() {
      this.date = new Date()
    }
    async create(req, res) {
        try {
            const { data } = req.body 
            const formatDate = moment(this.date).format("YYYY-MM-DD")
            
            return res.status(200).json({ data: data, date: formatDate })

        } catch (error) {
            console.error('[CHECK] covid error: ', error)
            res.status(400).json({msg: 'someting went wrong!' })
        }
    }
}
 