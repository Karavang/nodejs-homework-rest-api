const app = require("./app");
const { PORT } = process.env;
const { mongoConnect } = require("./forDb");
const startServer = async () => {
  await mongoConnect();
  app.listen(PORT, (err) => {
    if (err) {
      console.log(
        `We have the problem with connecting with server.Code of the error:${err}`
      );
      process.exit(1);
    }
    console.log("Database connection successful");
  });
};
startServer();
