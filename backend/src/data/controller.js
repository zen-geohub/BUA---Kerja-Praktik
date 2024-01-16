const pool = require('../../db')
const queries = require('./queries')

// export let year

const getBoundaries = (req, res) => {
  pool.query(queries.getBoundaries, (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const getBoundariesName = (req, res) => {
  const city = req.params.city
  pool.query(queries.getBoundariesName, [city], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const getChartData = (req, res) => {
  pool.query(queries.getChartData, (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

const getCount2018 = (req, res) => {
  const cityCount = req.params.cityCount
  pool.query(queries.getCount2018, [cityCount], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}
const getCount2019 = (req, res) => {
  const cityCount = req.params.cityCount
  pool.query(queries.getCount2019, [cityCount], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}
const getCount2020 = (req, res) => {
  const cityCount = req.params.cityCount
  pool.query(queries.getCount2020, [cityCount], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}
const getCount2021 = (req, res) => {
  const cityCount = req.params.cityCount
  pool.query(queries.getCount2021, [cityCount], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}
const getCount2022 = (req, res) => {
  const cityCount = req.params.cityCount
  pool.query(queries.getCount2022, [cityCount], (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
}

module.exports = {
  getBoundaries,
  getBoundariesName,
  getChartData,
  getCount2018,
  getCount2019,
  getCount2020,
  getCount2021,
  getCount2022,
}