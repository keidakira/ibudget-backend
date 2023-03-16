import type { Request, Response } from 'express'
import * as express from 'express'

const app = express()
const port = 8080

app.get('/', (req: Request, res: Response) => {
  console.log(req.query)
  res.send('Hi, mom!')
})

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
