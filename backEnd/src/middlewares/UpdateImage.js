const middleWereUpdateImage = async (req, res, next) => {
    console.log("hahahahhahaha");
    console.log(req.file, req.body);
    next();
};
module.exports = { middleWereUpdateImage };
