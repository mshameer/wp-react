const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: __dirname + "/admin" });
const handle = app.getRequestHandler();

var log = {
  server: function() {
    app.prepare().then(() => {
      const server = express();

      server.get("/a", (req, res) => {
        return app.render(req, res, "/b", req.query);
      });

      server.get("/b", (req, res) => {
        return app.render(req, res, "/a", req.query);
      });

      server.get("/posts/:id", (req, res) => {
        return app.render(req, res, "/posts", { id: req.params.id });
      });

      server.get("*", (req, res) => {
        return handle(req, res);
      });

      server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
      });
    });
  }
};

module.exports = log;
