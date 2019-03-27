const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello from SPECTRE!'));

app.listen(process.env.PORT || 3000, () => console.log(`SPECTRE listening on port ${port}!`));
