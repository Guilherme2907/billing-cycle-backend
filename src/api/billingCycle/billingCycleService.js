const BillingCycle = require("./billingCycle");
const handleError = require("../common/errorHandler");

BillingCycle.methods(["get", "post", "put", "delete"]);
BillingCycle.updateOptions({ new: true, runValidators: true });
BillingCycle.after("post", handleError).after("put", handleError);

BillingCycle.route("count", (req, resp, next) => {
    BillingCycle.countDocuments((error, value) => {
        if (error) {
            resp.status(500).json({ errors: [error] });
        } else {
            resp.json({ value });
        }
    });
});

BillingCycle.route("summary", (req, resp, next) => {
    BillingCycle.aggregate(
        // Retorna o total de credito e debito de cada ciclo de faturamento
        // [
        //     {
        //         $project: {
        //             name: "$name",
        //             credit: { $sum: "$credits.value" },
        //             debt: { $sum: "$debts.value" }
        //         }
        //     },
        //     {
        //         $group: {
        //             _id: "$name",
        //             credit: { $sum: "$credit" },
        //             debt: { $sum: "$debt" }
        //         }
        //     }
        // ],
        [{
                $project: {
                    credit: { $sum: "$credits.value" },
                    debt: { $sum: "$debts.value" }
                }
            },
            {
                $group: {
                    _id: null,
                    credit: { $sum: "$credit" },
                    debt: { $sum: "$debt" }
                }
            },
            {
                $project: { _id: 0, credit: 1, debt: 1 }
            }
        ],

        (error, result) => {
            if (error) {
                resp.status(500).json({ errors: [error] });
            } else {
                resp.json(result[0] || { credit: 0, debt: 0 });
            }
        }
    );
});

module.exports = BillingCycle;