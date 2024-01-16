const express = require('express')
const dataRoutes = require('./src/data/routes')
const app = express()
const cors = require('cors')
const port = 3010

app.use(cors())

app.use('/api/KP', dataRoutes)

app.listen(port, () => {
  console.log(`Server listen to port ${port}`);
})