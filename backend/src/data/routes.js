const {Router} = require('express')
const controller = require('./controller')
const router = Router()

router.get(('/getBoundaries'), controller.getBoundaries)
router.get(('/getChartData'), controller.getChartData)
router.get(('/getBoundariesName/:city'), controller.getBoundariesName)
router.get(('/getCountbua_2018/:cityCount'), controller.getCount2018)
router.get(('/getCountbua_2019/:cityCount'), controller.getCount2019)
router.get(('/getCountbua_2020/:cityCount'), controller.getCount2020)
router.get(('/getCountbua_2021/:cityCount'), controller.getCount2021)
router.get(('/getCountbua_2022/:cityCount'), controller.getCount2022)

module.exports = router