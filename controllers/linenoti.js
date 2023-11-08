const axios = require('axios');
const qs = require('qs')
const token = process.env.LINETOKEN
const request = require('request') 
module.exports = {
    lineNoti: async(data) => {
        try {
          let msg = {
            message: `\n####----####\n\nName: ${data?.name} \n\nblessing: ${data?.blessing}\n\n####----####`
          }
          if(data?.image){
            msg = {
              ...msg,
              imageThumbnail: data?.image,
              imageFullsize: data?.image
            }
          }
          request({
            method: 'POST',
            uri: `https://notify-api.line.me/api/notify`,
            header: {
                'Content-Type': 'multipart/form-data',
            },
            auth: {
                bearer: `${token}`,
            },
            form: msg,
        }, (err, httpResponse, body) => {
            if (err) {
                console.log(err)
            } else {
                console.log(body)
            }
        });
          // await axios({
          //     method: "post",
          //     url: "https://notify-api.line.me/api/notify",
          //     headers: {
          //       'Content-Type': 'multipart/form-data',
          //       "Authorization": `Bearer ${token}`,
          //     },
          //     form: msg
          //   })
          //   .then((response) => {
          //     //--//
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
        } catch (error) {
            console.log(error)
        }
    }
}