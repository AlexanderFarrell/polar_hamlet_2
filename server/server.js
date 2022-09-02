const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 54875;

app.use(morgan("tiny"))
app.use(express.static("../public"));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}!`);
})
