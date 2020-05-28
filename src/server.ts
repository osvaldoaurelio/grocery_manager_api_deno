import { Application, ListenOptions } from './deps.ts';
import { oakCors } from './deps.ts';

import router from './routes.ts';

const server = new Application();
const listenOptions: ListenOptions = { port: 8080 };

server.use(async ({ request: { method, url } }, next) => {
  const time = `\n${method} at '${url.href}' 👀 | time`;
  console.time(time);
  await next();
  console.timeEnd(time);
});

server.use(oakCors());
server.use(router.routes());

console.table({ server: 'is running 🏃', port: listenOptions.port });
await server.listen(listenOptions);
