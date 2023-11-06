module.exports = {
    async index(req, res) {
        try {
            res.render('pages/blessing');
            return;
        } catch (err) {
            console.error(err);
            return
        }
    },
    async store(req, res) {
        try {
            console.log(req.body);
            console.log(req.files);
            return;
        } catch (err) {
            console.error(err);
            return
        }
    },
    async view(req, res) {
        try {
            
        } catch (err) {
            console.error(err);
            return
        }
    }
}