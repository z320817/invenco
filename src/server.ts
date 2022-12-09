import * as express from "express";
import * as bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.send(request.body);
});

app.listen(5000);
