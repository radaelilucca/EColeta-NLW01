import express from 'express'
import cors from 'cors'
import path from 'path'
import 'dotenv/config'

import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use('/items-images', express.static(path.resolve(__dirname, '..', 'items-images')))

export default app