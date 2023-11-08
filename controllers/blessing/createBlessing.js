const moment = require("moment")
const { blessingModel } = require('../../models')
const {lineNoti} = require('../linenoti')
const { ref, uploadString } = require("firebase/storage");
const storage = require("../../lib/firebase")
const { v4: uuidV4 } = require('uuid');
const { urlencoded } = require("body-parser");
module.exports = class createBlessing {
    constructor() {
      this.date = new Date()
    }
    async create(req, res) {
        try {
            const body = req.body

            let data = {
                name:  (body?.name && body?.name != '') ? body?.name : `testName_${moment(this.date).format("YYYY-MM-DD hh:mm:ss")}` ,
                blessing: body?.blessing ?? null,
                date: moment(this.date).format("YYYY-MM-DD")
            }
            
            if(body?.image){
                const fileName = `${data.name}_${uuidV4()}`
                const imageRef = ref(storage, fileName)
                
                uploadString(imageRef, (body?.image), 'data_url').then((snapshot) => {
                    console.log(`Upload Success ${imageRef}`);
                });

                data = {
                    ...data,
                    image: encodeURI(`https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_BUCKET}/o/${fileName}?alt=media`)
                }
            }

            await blessingModel.create(data).then(() => {
                res.status(200).json({ data: data, date: data?.date })
                lineNoti(data)
                return
            }).catch((error) => {
                //
                console.error('[CREATE] blessing error: ', error)
                return res.status(400).json({ msg: error })
            })
        } catch (error) {
            console.error('[CREATE] blessing error: ', error)
            res.status(400).json({msg: 'someting went wrong!' })
        }
    }
}
 