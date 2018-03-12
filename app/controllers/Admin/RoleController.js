'use strict';
const path                     = require('path'),
      mongoose                 = require('mongoose'),
      async                    = require("async") ,

    /**collections */
      Role                    = require(path.resolve('./app/models/role')),

      env                     = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
      ObjectId                = mongoose.Types.ObjectId;


class RoleController {
    /** ============================ A ========================================== */
    /**Add/Edit Role */
    addEditRole(req, res) {
        let obj = req.body,
            message = "Role has been added.",
            match = { title: obj.title };

        if (obj._id) {
            match = { _id: obj._id }
            message = "Role updated succesfully"
        }

        // console.log("obj",obj);
        Role.findOneAndUpdate(match, obj,
            { upsert: true, new: true, setDefaultsOnInsert: true },
            (err, result) => {
                if (err) return res.status(412).json({ type: "error", message: "OOPS Something went wrong", errors: err });
                res.json({ type: "success", message: message, data:result });
                
            }
        );
    }

    /** ============================ D ========================================== */
    /** to delte a quality */
    deleteQuality(req, res) {
        /*delete a Quality*/
        Quality.findOne({
            _id: req.body._id
        }, (err, quality) => {
            /**to delete plant image on cloud */
            if (quality.image && quality.image.public_id) uploadFile.deleteFile(quality.image.public_id);
            /** to remove plant from DB  after removing it from cloudibary  */
            Quality.remove({
                _id: req.body._id
            }, (err, removed) => {
                if (err) res.status(412).json({ type: "error", message: "This action can not be performed." });
                if (removed) res.json({ type: "success", message: "Quality has been removed." });
            });
        })

    }

    /** ============================ G ========================================== */
    /**get list of qualities */
    getRoles(req, res) {
        /**match  */
        let obj         = req.query,
            projection = { title: 1, created_at: 1, permissions:1,_id:1},
            sortBy      = { "created_at": -1 };
        // console.log("obj", obj)
        var match = {};

        /**Serach */
        if (obj.searchQuery) {
            match.title = new RegExp(obj.searchQuery, 'i');
        }

        /** filter dropdown */
        if (obj.filter == 1) {
            match.status = true
        }
        else if (obj.filter == 0) {
            match.status = false
        }

        // console.log("match", match)
        async.parallel({
            roleCount: (_callback) => {
                Role.count(match).then(response => _callback(null, response))
                    .catch(err => _callback(err));
            },
            role: (_callback) => {
                /**pagination */
                var limit = obj.limit ? parseInt(obj.limit) : env.listing.limit;//results per page
                var page = (obj.page) ? parseInt(obj.page) : 1;//offset
                var offset = (page - 1) * limit;

                Role.aggregate([
                    {
                        $match: match
                    },
                    {
                        $project: projection
                    },
                    {
                        $sort: sortBy
                    },
                    {
                        $skip: offset
                    },
                    {
                        $limit: limit
                    }

                ]).then(response => _callback(null, response))
                    .catch(err => _callback(err));
            }
        }, (err, results) => {
            if (err) res.status(412).json({ type: "error", message: "Oops something went wrong!", error: err });
            return res.json({ type: "success", message: "Role list ", data: results });
        });
    }

    /**get qualities list for multiselect */
    getQualitiesMultiselect(req, res) {
        Quality.find({}, { _id: 1, title: 1 })
            .then((result) => {
                res.json({ type: "success", message: "Quality list for multiselect", data: result });
            })
            .catch((err) => {
                res.json({ type: "error", message: "Something went wrong", data: [] });
            })
    }

    /**get details of a single Role */
    getARole(req, res) {
        console.log("query", req.query);
        let obj = req.body,
            message = "Role found.",
            projection = { title: 1, created_at: 1, permissions: 1, _id: 1 },
            match = mongoose.Types.ObjectId(req.query.id)

        Role.findOne(match, projection, (err, result) => {
            if (err) res.json({ type: "error", message: err.message });
            res.json({ type: "success", message: message, data: result });

        });
    }


}
module.exports = RoleController;