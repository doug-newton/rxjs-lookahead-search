const express = require('express')
const cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/api/searchByWord/:word', (req, res) => {
    req.app.locals.MongoClient.db('cool_data').collection('dictionary').aggregate([
        {
            '$match': {
                'word': new RegExp(req.params.word)
            }
        }, {
            '$limit': 50
        }
    ]).toArray((err, result) => {
        res.json(result)
    })
})

app.listen(8080, () => {
    MongoClient.connect('mongodb://127.0.0.1:27017/?compressors=zlib&directConnection=true&ssl=false').then((client) => {
        app.locals.MongoClient = client
    }).catch((reason) => {
        throw reason
    })
})