import jsonServer from "json-server";
import auth from "json-server-auth";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.db = router.db;
server.use(middlewares);
server.use(auth);
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server đang chạy tại http://localhost:${PORT}`);
});