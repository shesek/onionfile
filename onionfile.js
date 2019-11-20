#!/usr/bin/env node
const fs   = require('fs')
    , path = require('path')
    , hsv3 = require('@deadcanaries/hsv3')
    , app  = require('express')()
    , cli  = require('meow')('Usage: onionfile <path>')
    , tdir = cli.flags.tordir || path.join(require('os').tmpdir(), 'onionfile-' + Math.random().toString(36).substr(2))

cli.input[0] || cli.showHelp()

const file = path.resolve(cli.input[0])
    , stat = fs.statSync(file)

app.disable('x-powered-by')
app.use(require('morgan')('dev'))

if (stat.isDirectory()) {
  app.use(require('express').static(file))
  app.use(require('serve-index')(file))
} else {
  app.get('/', (req, res) => res.sendFile(file))
}

const server = app.listen(0, '127.0.0.1', _ =>
  hsv3([ { dataDirectory: tdir, virtualPort: 80, localMapping: '127.0.0.1:' + server.address().port } ])
  .on('error', console.error)
  .on('ready', () => console.info('http://' + fs.readFileSync(path.join(tdir, 'hostname')).toString().trim()))
)
