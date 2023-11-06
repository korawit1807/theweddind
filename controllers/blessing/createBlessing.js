const moment = require("moment")
const { blessingModel } = require('../../models')
const { error } = require("jquery")
module.exports = class createBlessing {
    constructor() {
      this.date = new Date()
    }
    async create(req, res) {
        try {
            const body = req.body

            const data = {
                name:  (body?.name && body?.name != '') ? body?.name : `testName_${moment(this.date).format("YYYY-MM-DD hh:mm:ss")}` ,
                blessing: body?.blessing ?? null,
                image: body?.image ?? null,
                date: moment(this.date).format("YYYY-MM-DD")
            }
            await blessingModel.create(data).then(() => {
                return res.status(200).json({ data: data, date: data?.date })
            }).catch((error) => {
                //
                console.error('[CREATE] blessing error: ', error)
                return res.status(400).json({ msg: error})
            })
        } catch (error) {
            console.error('[CREATE] blessing error: ', error)
            res.status(400).json({msg: 'someting went wrong!' })
        }
    }
}
 