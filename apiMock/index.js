const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const main = require("./core/Main");

const app = new Koa();

app.use(bodyparser());

const loadController = async () => {
  const routers = await main.init();
  return routers;
};

loadController().then(res => {
  app.use(res);
  app.listen(4356);
  console.log("Service running on localhost:4356");
});
