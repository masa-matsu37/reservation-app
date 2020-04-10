const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/index')
const SampleDb = require('./take-db')

const productRoutes = require('./routes/products')
const path = require('path')

mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(
    () => {
        if (process.env.NODE_ENV !== 'production') {
            // heroku production add (本番のみ)
            const sampleDb = new SampleDb()
            // sampleDb.initDb()
        }
    }
)

const app = express()

app.use('/api/v1/products', productRoutes)

if (process.env.NODE_ENV === 'production') {
    // heroku production add (本番のみ)
    // node index.js のみで動作するように修正「http://localhost:3001/」※フロントエンド側の起動は不要となる
    const appPath = path.join( __dirname, '..', 'dist', 'reservation-app' )
    app.use(express.static(appPath))
    app.get("*", function(req, res) {
        res.sendfile(path.resolve(appPath, 'index.html'))
    })
} 

const PORT = process.env.PORT || '3001'

app.listen(PORT, function() {
    console.log('I am running!')
})


