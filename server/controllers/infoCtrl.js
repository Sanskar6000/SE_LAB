const Info = require('../models/infomodel')

const infoCtrl = {
    getInfo: async (req, res) => {
        try {
            const info = await Info.find()
            res.json(info)
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    getInfoSingle: async (req, res) => {
        try {
            const info = await Info.find({ user_id: req.user.id })
            res.json(info)
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    createInfo: async (req, res) => {
        try {
            const {title, content, date} = req.body;
            const newInfo = new Info({
                title,
                content, 
                date,
                user_id: req.user.id,
                name: req.user.name
            })
            await newInfo.save()
            res.json({msg: "Information Stored"})
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

module.exports = infoCtrl