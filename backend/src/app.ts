import express from 'express'
import path from 'path'
import 'dotenv/config'

import routes from './routes'

const app = express()

app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

export default app;