const mongoose = require("mongoose");
const config = require("./config");

const DBObject = {
    dbInstance: mongoose.connect(config.CONNECTION_STRING),
    
    _postareInternals: {
        schema: undefined,
        model: undefined
    },
    
    _getPostareSchema: function () {
        if(this._postareInternals.schema === undefined) {
            this._postareInternals.schema = new mongoose.Schema({ titlu: 'string', continut: 'string', autor: 'string' });
        }
        return this._postareInternals.schema;
    },

    getPostareModel: function () {
        console.log(this);
        if(this._postareInternals.model === undefined) {
            this._postareInternals.model = mongoose.model('Postare', this._getPostareSchema());
        }
        return this._postareInternals.model;
    }
    
}



module.exports = DBObject;