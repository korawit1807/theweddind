const axios = require('axios');
const qs = require('qs')
const token = process.env.LINETOKEN
module.exports = {
    lineNoti: async(data) => {
        try {
            await axios({
                method: "post",
                url: "https://notify-api.line.me/api/notify",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  "Authorization": `Bearer ${token}`,
                },
                data: qs.stringify({
                    message: `\n####----####\nname: ${data.name} \nblessing: ${data.blessing}\n####----####`,
                  })
                })
                .then((response) => {
                  //--//
                })
                .catch((err) => {
                  console.log(err);
                });
        } catch (error) {
            console.log(error)
        }
    }
}