import knex from 'Knex'

const connection = knex({
  client: 'pg',
  connection: {
    host : process.env.DB_URL,
    port: Number(process.env.DB_PORT),
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  }
})

export default connection;