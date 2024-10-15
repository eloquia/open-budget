import { Hono } from "hono";
import { readConfig, updateConfig } from "./spreadsheet";
import { Config } from "./models";
import { getAllAccounts } from "./accounts";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/config", (c) => {
  const config = readConfig();
  return c.json(config);
});

app.put("/config", async (c) => {
  const requestBody: Config = await c.req.json();
  const updatedConfig = updateConfig(requestBody);
  return c.json(updatedConfig);
});

// app.get('/transactions', (c) => {
//   return
// });

app.post("/transactions", async (c) => {
  const requestyBody = await c.req.json();
});

app.get("/accounts", (c) => {
  const accounts = getAllAccounts();
  return c.json(accounts);
});

export default {
  port: 3000,
  fetch: app.fetch,
};
