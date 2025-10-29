import * as path from "path";
import * as fs from "fs";
import * as https from "https";

import { app } from "./app";

let server: https.Server;

// Set port here:
const port = process.env.PORT || 8080;

if (process.env.NODE_ENV === "development") {
  const sslDir = path.join(path.resolve(), "src/main/resources/localhost-ssl");
  const sslOptions = {
    key: fs.readFileSync(path.join(sslDir, "localhost.key")),
    cert: fs.readFileSync(path.join(sslDir, "localhost.crt")),
  };

  // Start server
  server = https.createServer(sslOptions, app);

  server.listen(port, () => {
      console.log(`✅  Server running at https://localhost:${port}`)
    });
} else {
  app.listen(port, () => {
    console.log(`✅  Server running at https://localhost:${port}`)
  })
}

function gracefulShutdown(signal: string) {
  console.log(`⚠️ Caught ${signal}, gracefully shutting down.`);
  app.locals.shutdown = true;

  setTimeout(() => {
    console.log("⚠️ Shutting down application.")
    // Close server
    server?.close(() => {
    console.log("⚠️ HTTPS server closed.")
    });
  }, 4000)
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
