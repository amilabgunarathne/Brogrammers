require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Brogrammers',
            description: "https://github.com/SOCSSabaragamuwa/Brogrammers",
            contact: {
                name: 'https://github.com/SOCSSabaragamuwa/Brogrammers'
            },
            host: 'http://localhost:9090',
            basePath: '/api'
        }
    },
    apis: ['./routes/**/**.yaml']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,x-access-token");
    res.setHeader('Access-Control-Expose-Headers', '*');
    //Access-Control-Expose-Headers: *
    next();
});


// //serving static files from public folder
// app.use('/public', express.static(path.resolve(__dirname, './public')));


// support parsing of application/json type post data
app.use(bodyParser.json());

//routes
routes(app);

//server
const port = process.env.PORT || 9090;
app.listen(port, () => {
    console.log("Server is listening to port " + port);
});

module.exports = app;
