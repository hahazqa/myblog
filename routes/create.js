const express = require('express')
const router = express.Router()


router.get('/', function (req, res, next) {
    res.send('创建哈哈哈')
})

module.exports = router
