// import connect from 'connect';
// import fs from 'fs';
// import { join } from 'path';

// const app = connect();

// app.use(function readFile(req, resp, next) {
//   if (req.path === '/api/support') {
//     fs.readFile(
//       join(process.cwd(), '/dist/apps/sandbox/server/static/service-worker.js'),
//       (err, data) => {
//         console.log(`${err} + ${data}`);
//         if (err) {
//           resp.statusCode = 404;
//           resp.send(err);
//         } else {
//           resp.locals = data;
//           next();
//         }
//       }
//     );
//   }
// });

// app.use(function respond(req, resp, next) {
//   if (resp.locals) {
//     resp.send(resp.locals);
//   }
// });

// export default async function(req, resp) {
//   console.log('here');
//   app.handle(req, resp, () => {});
// }
