var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesByUser = findAllWebsitesByUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updateWebsite = updateWebsite;

module.exports = websiteModel;

function createWebsite(userId, website) {
    website._user = userId;
    return websiteModel.create(website);
}

function findAllWebsitesByUser(userId) {
    console.log(websiteModel.find({_user: userId}));
    return websiteModel
        .find({_user: userId})
        .populate('_user', 'username')
        .exec();
}

function findWebsiteById(websiteId) {
    return websiteModel.findOne({_id: websiteId});
}

function deleteWebsite(websiteId) {
    return websiteModel.remove({_id: websiteId});
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId}, {
        $set: {
            name: website.name,
            description: website.description
        }
    });
}


