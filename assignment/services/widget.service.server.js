var app = require('../../express');

app.get('/api/page/:pageId/widget', findAllWidgetsByPageId);
app.get('/api/widget/:widgetId', findWidgetById);
app.post('/api/page/:pageId/widget', createWidget);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);

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
    var resultSet = [];
    for( var w in widgets){
        if (widgets[w].pageId === pageId) {
            resultSet.push(widgets[w]);
        }
    }
    if(resultSet){
        res.json(resultSet);
        return;
    }
    res.sendStatus(404);

}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    if (widget){
        res.json(widget);
        return;
    }
    res.sendStatus(404);
}

function createWidget(req, res) {
    var pageId = req.params['pageId'];
    var widget = req.body;
    widget._id  = (new Date()).getTime() + "";
    widget.pageId = pageId;
    widgets.push(widget);
    res.send(widget);
}

function updateWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = req.body;
    for(var w in widgets){
        if (widgets[w]._id == widgetId){
            widgets[w] = widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWidget(req, res) {
    var widgetId = req.params['widgetId'];
    var widget = widgets.find(function (widget) {
        return widget._id === widgetId;
    });
    var index = widgets.indexOf(widget);
    widgets.splice(index, 1);
    res.sendStatus(200);
}
