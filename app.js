const express = require('express');
const app = express();
// const port = 8000;
const cors = require('cors')
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yaml')
const router = require('./routes');
const fs = require('fs')
const data = fs.readFileSync('./api.yaml', 'utf-8');
const file = yaml.parse(data); 
const Sentry = require("@sentry/node")

const {
    SENTRY_DSN,
    ENVIRONMENT
} = process.env

Sentry.init({
    environment: ENVIRONMENT,
    dsn: SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
    ],
    tracesSampleRate: 1.0,
  });

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(file))
app.use(express.json());
app.use(morgan('dev'));
app.use(router);

// Sentry error handler
app.use(Sentry.Handlers.errorHandler());

// 404 
app.use((req, res, next) => {
    return res.status(404).json({
        message: "404 Not Found!"
    });
});


// 500
app.use((err, req, res, next) => {
    return res.status(500).json({
        message: err.message
    });
});

// app.listen(port, () => console.log('listening on port ', port));
module.exports = app
