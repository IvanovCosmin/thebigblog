const mongoose = require("mongoose");
const config = require("./config");

const DBObject = {
    dbInstance: mongoose.connect(config.CONNECTION_STRING, {useNewUrlParser: true}),
    
    _postareInternals: {
        schema: undefined,
        model: undefined
    },

    _loginInternals: {
        schema: undefined,
        model: undefined
    },
    
    _getPostareSchema: function () {
        if(this._postareInternals.schema === undefined) {
            this._postareInternals.schema = new mongoose.Schema({ titlu: 'string', continut: 'string', autori: 'array', tags: 'array'});
        }
        return this._postareInternals.schema;
    },

    getPostareModel: function () {
        if(this._postareInternals.model === undefined) {
            this._postareInternals.model = mongoose.model('Postare', this._getPostareSchema());
        }
        return this._postareInternals.model;
    },

    _getLoginSchema: function () {
        if(this._loginInternals.schema === undefined) {
            this._loginInternals.schema = new mongoose.Schema({numeUtilizator: 'string', parola: 'string', autor: 'bool'});
        }
        return this._loginInternals.schema;
    },

    getLoginModel: function () {
        if(this._loginInternals.model === undefined) {
            this._loginInternals.model = mongoose.model('Login', this._getLoginSchema());
        }
        return this._loginInternals.model;
    }
    
}


module.exports = DBObject;