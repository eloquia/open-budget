import { Hono } from 'hono'
import { readConfig } from './spreadsheet';

const app = new Hono()

app.get('/', (c) => {
  readConfig();
  return c.text('Hello Hono!')
})

export default { 
  port: 3000, 
  fetch: app.fetch, 
}
