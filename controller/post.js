const db = require('../model');
const { postSchema } = require('../validation/post');
module.exports = {
    get: async (req, res) => {
        try {
            const _id = req.params.id;
            const { latitude, longitude } = req.query
            const filterQuery = { isDeleted: false,createdBy:req.user._id };
            if (longitude) filterQuery['geoLocation.longitude'] = parseInt(longitude);
            if(latitude) filterQuery['geoLocation.latitude'] = parseInt(latitude);
            // console.log('req.user-----', req.user);
            if (_id) {
                filterQuery._id = _id;
                const data = await db.post.findOne(filterQuery).populate('createdBy', 'username');
                return res.status(200).json({
                    msg: 'data fetched successfully',
                    result: data
                })
            }
            const data = await db.post.find(filterQuery).populate('createdBy', 'username');
            if (!data.length) {
                return res.status(200).json({
                    msg: 'no data found',
                })
            }
            return res.status(200).json({
                msg: 'data fetched successfully',
                result: data
            })
        } catch (error) {
            console.log('error', error);
            return res.status(400).json({
                error
            })
        }
    },
    post: async (req, res) => {
        try {
            //  const  { title,body,status,geoLocation } = req.body;
            const { error, value } = postSchema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    msg: 'Validation error',
                    error: error.details[0].message
                });
            };
            req.body.createdBy = req.user._id;
            const data = await db.post.create(req.body);
            if (data) {
                return res.status(201).json({
                    msg: 'post data created',
                    result: data
                })
            };
            return res.status(400).json({
                msg: 'something went wrong'
            })
        } catch (error) {
            console.log('error');
            return res.status(400).json({
                error
            });
        }
    },
    update: async (req, res) => {
        try {
            const _id = req.params.id;
            const filterQuery = { isDeleted: false, _id,createdBy:req.user._id };
            const { error, value } = postSchema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    msg: 'Validation error',
                    error: error.details[0].message
                });
            };
            const checkExist = await db.post.findOne(filterQuery);
            if (!checkExist) {
                return res.status(400).json({
                    msg: 'No data found'
                })
            };
            const data = await db.post.updateOne(filterQuery, req.body);
            if (data.modifiedCount) {
                return res.status(200).json({
                    msg: 'post data updated',
                    result: data
                });
            };
            return res.status(400).json({
                msg: 'something went wrong'
            });
        } catch (error) {
            console.log('error---', error);
            return res.status(400).json({
                error
            });
        }
    },
    delete: async (req, res) => {
        try {
            const _id = req.params.id;
            const filterQuery = { isDeleted: false, _id,createdBy:req.user._id }
            const checkExist = await db.post.findOne(filterQuery);
            if (!checkExist) {
                return res.status(400).json({
                    msg: 'No data found'
                })
            };
            checkExist.isDeleted = true;
            console.log('checkExist------', checkExist);
            await checkExist.save();
            return res.status(200).json({
                msg: 'post data deleted successfully',
            });
        } catch (error) {
            console.log('error--', error);
            return res.status(400).json({
                error
            });
        }
    },
    dashboard: async(req, res) => {
        try{
            const filterQuery = {isDeleted: false,createdBy:req.user._id}
            const data = await db.post.find(filterQuery);
            let active=0;
            let inactive =0;
            if(data.length){
                data.map((val) => {
                    if(val.status ==='active'){
                        active++
                    }else {
                        inactive++
                    }
                })
            };
            return res.status(200).json({
                msg:'data fetched successfully',
                result:{active,inactive}
            })
        } catch (error) {
            console.log('error--',error);
        }
    }
}