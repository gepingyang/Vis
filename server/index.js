const Koa = require('koa')
const Router = require('@koa/router')

const KoaStatic = require('koa-static')

const path = require('path')
const fs = require('fs')

const app = new Koa()

const router = new Router({ prefix: '/vis' })

router.get('/hallo-world', async (ctx) => {
  ctx.body = "Hallo World!!! I'am vis-server"
})

router.get('/brige-json', async (ctx) => {
  console.time('read json')
  const brigeJson = fs.readFileSync(path.join(__dirname, '../static/brige.json'), 'utf8')
  console.timeEnd('read json')

  ctx.body = JSON.parse(brigeJson)
})

app.use(router.routes()).use(router.allowedMethods())

app.use(KoaStatic(path.resolve(__dirname, '../static')))

// app.use(async (ctx) => {
//   ctx.body = 'Hello World'
// })

app.listen(3333)

console.log('app running at: ', 'http://127.0.0.1:3333')
