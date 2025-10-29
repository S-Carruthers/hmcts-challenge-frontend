import express, { Request, Response } from 'express';
import path from "node:path";
import nunjucks from 'nunjucks';

export const app = express();
app.locals.env = process.env.NODE_ENV;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

nunjucks.configure(path.join(__dirname, "views"), {
  autoescape: true,
  express: app,
  watch: process.env.NODE_ENV === "development",
});

app.use((req, res, next) => {
  res.locals.currentYear = new Date().getFullYear();
  next();
})

app.set("view engine", "njk");
app.set("views", path.join(__dirname, "../views"));

app.get("/", (req: Request, res: Response) => {
  // res.status(200).sendFile(path.resolve(__dirname, "views/home.html"));
  res.status(200).render("index", {
    title: "My Website",
    heading: "Welcome to the test website!",
    description: "This is a basic website made with express, typescript and nunjucks",
    features: [
      "Fast and responsive",
      "Easy to use",
      "Built with typescript, express and nunjucks"
    ],
    date: new Date().toISOString(),
  });
})

app.get("/about", (req: Request, res: Response) => {
  // res.status(200).send("About Me!");
  res.status(200).render("about", {title: "About Us!"});
})

app.get("/contact", (req: Request, res: Response) => {
  // res.status(200).sendFile(path.resolve(__dirname, "views/contact.html"));
  res.status(200).render("contact", {title: "Contact Us!"});
})

// Form submission
app.post("/submit-form", (req: Request, res: Response) => {
  const { name, message } = req.body;
  console.log("Entered data: name: " + name + " message: " + message);

  // Handle database submission here etc.
  // res.status(201).send(`<h1>Thank you, ${name}!</h1><p>We have received your message</p><a href="/">Back to home</a>`);
  res.status(201).render("thank-you", {
    title: "Thank You",
    name: name
  })
})

