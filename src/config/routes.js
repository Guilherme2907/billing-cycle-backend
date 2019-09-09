const express = require("express");

module.exports = server => {
    // Definir url base para todas as rotas
    const router = express.Router();
    server.use("/api", router);

    // Definir rotas do ciclo de pagamento
    const billingCycle = require("../api/billingCycle/billingCycleService");
    billingCycle.register(router, "/billingCycles");
};