const Hapi = require("@hapi/hapi");
const routes = require("./src/routes");
const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  try {
    server.route(routes);
    await server.start();
    console.log("Server running on %s", server.info.uri);
  } catch (error) {
    console.log(error.message);
  }
};

init();
