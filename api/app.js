const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const server = restify.createServer();

const port = 3000;

const cors = corsMiddleware({
  origins: ['http://localhost:4200']
});

server.pre(cors.preflight);
server.use(cors.actual);

server.get('/api/test', (req, res) => {
  res.json({ message: 'Hello World!' });
});

server.listen(port, () => console.info(`Server is up on port ${port}`));