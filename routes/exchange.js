const getCrypto = require("../services/getCrypto");
const getUser = require("../services/getUser");
const buyOrder = require("../services/buyOrder");
const sellOrder = require("../services/sellOrder");
async function routes(fastify, options) {
  fastify.get("/test", async (request, reply) => {
    return { hello: "api tested" };
  });
  fastify.get("/getCrypto", getCrypto);
  fastify.get("/getUser", getUser);
  fastify.post("/buyOrder", buyOrder );
  fastify.post("/sellOrder", sellOrder );

}

module.exports = routes;
