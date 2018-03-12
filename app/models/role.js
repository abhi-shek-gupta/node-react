'use strict';

const mongoose = require('mongoose'),
    path = require('path'),
    config = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
    schema = mongoose.Schema;

var roleSchema = new schema({
    title: String,
    permissions: {
        type: Array,
        default: []
    },
    status: {
        type: Boolean,
        default: true
    },

}, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });


module.exports = mongoose.model('role', roleSchema);