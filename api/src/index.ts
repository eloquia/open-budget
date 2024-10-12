import { Hono } from 'hono'
import { readConfig, updateConfig } from './spreadsheet';
import { Config } from './models';

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/config', (c) => {
  const config = readConfig();
  return c.json(config);
});

app.put('/config', async (c) => {
  const requestBody: Config = await c.req.json();
  const updatedConfig = updateConfig(requestBody);
  return c.json(updatedConfig);
})

export default { 
  port: 3000, 
  fetch: app.fetch, 
}
