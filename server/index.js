const express = require('express')
const { MongoClient } = require('mongodb')
const path = require('path')

const app = express()
app.use(express.json())

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

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public_html/index.html');
});

app.use(express.static(path.join(__dirname, 'public_html')))

function gracefulShutdown() {
    app.locals.MongoClient.close(() => {
        process.exit()
    })
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGKILL', gracefulShutdown);

app.listen(8080, () => {
    MongoClient.connect('mongodb://127.0.0.1:27017/?compressors=zlib&directConnection=true&ssl=false').then((client) => {
        app.locals.MongoClient = client
    }).catch((reason) => {
        throw reason
    })
})