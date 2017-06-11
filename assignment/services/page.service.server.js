var app = require('../../express');
var pageModel = require('../model/page/page.model.server');

app.get('/api/website/:websiteId/page', findPageByWebsiteId);
app.get('/api/page/:pageId', findPageById);
app.post('/api/website/:websiteId/page', createPage);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

function findPageByWebsiteId(req, res) {
    var websiteId = req.params['websiteId'];
    pageModel
        .findPageByWebsiteId(websiteId)
        .then(function (pages) {
            res.json(pages);
        });
}

function findPageById(req, res) {
    var pageId = req.params['pageId'];
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        }, function (err) {
            res.sendStatus(404);
        });
}

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params['websiteId'];

    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        });

}

function updatePage(req, res) {
    var page = req.body;
    var pageId = req.params.pageId;

    pageModel
        .updatePage(pageId, page)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function deletePage(req, res) {
    var pageId = req.params['pageId'];

    pageModel
        .deletePage(pageId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}