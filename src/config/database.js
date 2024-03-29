const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

console.log(process.env);

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório.";
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'.";
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'.";
mongoose.Error.messages.String.enum = "'{VALUE}' não é valido para o atributo '{PATH}'.";

module.exports = mongoose.connect(process.env.CONNECTION_STRING ? process.env.CONNECTION_STRING : 'mongodb//localhost:27017/mymoney', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    //  useMongoClient: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));