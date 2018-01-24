#!/usr/bin/env node
const fs   = require('fs')
    , path = require('path')
    , app  = require('express')()
    , cli  = require('meow')('Usage: onionfile <path>')
    , dir  = cli.flags.tordir || path.join(require('os').tmpdir(), 'onionfile-' + Math.random().toString(36).substr(2))

cli.input[0] || cli.showHelp()

app.disable('x-powered-by')
app.use(require('morgan')('dev'))
app.get('/', (req, res) => res.sendFile(path.resolve(cli.input[0])))

const server = app.listen(0, '127.0.0.1', _ =>
  require('hsv3')([ { dataDirectory: dir, virtualPort: 80, localMapping: '127.0.0.1:' + server.address().port } ])
  .on('error', console.error)
  .on('ready', () => console.info('http://' + fs.readFileSync(path.join(dir, 'hostname')).toString().trim()))
)
