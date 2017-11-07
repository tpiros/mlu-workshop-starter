const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const server = restify.createServer();

const marklogic = require('marklogic');
const config = require('./settings');
const db = marklogic.createDatabaseClient(config.settings);
const qb = marklogic.queryBuilder;

const port = 3000;

const cors = corsMiddleware({
  origins: ['http://localhost:4200']
});

server.pre(cors.preflight);
server.use(cors.actual);

server.get('/api/test', (req, res) => {
  res.json({ message: 'Hello World!' });
});

server.get('/api/characters', (req, res) => {
  db.documents.query(
    qb.where(
      qb.collection('characters')
    ).slice(0, 100)
  ).result()
  .then(characters => res.json(characters))
  .catch(error => console.error(error));
});

server.get('/api/characters/:uri', (req, res) => {
  const uri = req.params.uri;
  db.documents.read(uri).result()
  .then(character => res.json(character))
  .catch(error => console.error(error));
});


server.listen(port, () => console.info(`Server is up on port ${port}`));