import express,{Express,Request,Response} from "express";

const app:Express = express();

const port = 3300;

app.get("/", (req:Request, res:Response) => {
  res.send("Hello World");
});

app.listen(port)
