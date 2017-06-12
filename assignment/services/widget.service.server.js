var app = require('../../express');
var widgetModel = require('../model/widget/widget.model.server');

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname + '/../../public/assignment/uploads'});

app.get('/api/page/:pageId/widget', findAllWidgetsByPageId);
app.get('/api/widget/:widgetId', findWidgetById);
app.post('/api/page/:pageId/widget', createWidget);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);
app.post("/api/upload", upload.single('myFile'), uploadImage);
app.put('/page/:pageId/widget', reorderWidget);

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

function findAllWidgetsByPageId(req, res) {
    var pageId = req.params['pageId'];

    widgetModel
        .findAllWidgetsByPageId(pageId)
        .then(function (widgets) {
           res.json(widgets);
        },function (err) {
            res.sendStatus(404);
        });
}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.sendStatus(404);
        });
}

function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var widget = req.body;
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget);
        });
}

function updateWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = req.body;

    widgetModel
        .updateWidget(widgetId, widget)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];

    widgetModel
        .deleteWidget(widgetId)
        .then(function () {
            res.sendStatus(200);
        });
}

function reorderWidget(req, res) {
    var initial = req.query['initial'];
    var final = req.query['final'];
    var pageId = req.query['pageId'];

    widgetModel
        .reorderWidget(pageId, initial, final)
        .then(function (status) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            widget.url = '/assignment/uploads/'+filename;

            widgetModel
                .updateWidget(widgetId, widget)
                .then(function () {
                    var callbackUrl   = "/assignment/index.html#!/user/" + userId + "/website/" + websiteId + "/page/"
                        + pageId + "/widget/" + widgetId;
                    res.redirect(callbackUrl);
                }, function (err) {
                    res.sendStatus(404);
                });
        });


}
