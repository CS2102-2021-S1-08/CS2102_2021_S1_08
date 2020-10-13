module.exports = {
    port: process.env.PORT || 8081, 
    db: {
        database: process.env.DB_NAME || 'postgres', // defaults to postgres
        user: process.env.DB_USER || 'person', // this is cowsaysbaa's local user, default is postgres
        password: process.env.DB_PASS || '1234', // this is also the above mentioned's local password
        options: {
            dialect: process.env.DIALECT = "postgres", // the kind of database connected to
            host: process.env.HOST || 'localhost'
        }
    }
}