import path from 'path'

module.exports = {
  client: 'pg',
  connection: {
    host : process.env.DB_URL,
    port: Number(process.env.DB_PORT),
    user : 'postgres',
    password : 'docker',
    database : 'ecoleta',
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')

  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds')

  }
}