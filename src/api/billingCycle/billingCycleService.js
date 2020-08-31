const BillingCycle = require('./billingCycle');
const errorHandler = require('../common/errorHandler');

// Mapping methods
BillingCycle.methods(['get', 'post', 'put', 'delete']);

// Intercepting the methods
BillingCycle.after('post', errorHandler).after('put', errorHandler)


BillingCycle.updateOptions({ 
    new: true, // Returns the new updated value
    runValidators: true // Set the usable rules for update methods
});

BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if(error) {
            res.status(500).json({ erros: [error] });
        } else {
            res.status(200).json({ quantity: value });
        }
    })
});

BillingCycle.route('get', (req, res, next) => {
    BillingCycle.find({}, (err, docs) => {
        if(!err) {
            res.json(docs);
        } else {
            res.status(500).json({ errors: [error] });
        }
    })
});

BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate([
        { 
            $project: { // Designs an attribute called credit
                credit: { 
                    $sum: "$credits.value" // Sum each of the values located in credits.value
                }, 
                debt: { 
                    $sum: "$debts.value" 
                }
            } 
        },
        {
            $group: {
                _id: null,
                credit: { // Contains the sum of credit that outputed from the '$credit'
                    $sum: "$credit"
                },
                debt: { // Contains the sum of debt that outputed from the '$debt'
                    $sum: "$debt"
                }
            }
        },
        {
            $project: { // Project the rules bellow
                _id: 0, // Not returns ID
                credit: 1, // Return credits
                debt: 1 // Return debt
            }
        }
    ]).exec((error, result) => { // if case have an error
        if(error) {
            res.status(500).json({ errors: [error] }); // Return Error
        } else {
            res.json(result[0] || { credit: 0, debt: 0 }); // 
        }
    })
})

module.exports = BillingCycle;