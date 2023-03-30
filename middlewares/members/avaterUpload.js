const { uploader } = require("../../utilities/singleUpload");

exports.avaterUpload = (req, res, next) => {
    const upload = uploader(
        'avaters',
        ['image/jpeg','image/jpg','image/png'],
        1000000,
        'Only .jpeg, .jpg and .png formets are allowed!'
    );

    upload.any()(req, res, (err) => {
        if(err){
            res.status(500).json({
                errors: {
                    avater: {
                        message: err.msg
                    }
                }
            })
        }
        else{
            next();
        }
    });
};