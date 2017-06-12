var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var pageModel = require('../page/page.model.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsByPageId = findAllWidgetsByPageId;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then( function (widget) {
            pageModel
                .findPageById(pageId)
                .then(function (page) {
                    page.widgets.push(widget._id);
                    page.save();
                });
            return widget;
        });
}



function findAllWidgetsByPageId(pageId) {
    return widgetModel.find({_page : pageId});
}

function findWidgetById(widgetId) {
    return widgetModel.findOne({_id: widgetId});
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId}, {
        $set: {
            name: widget.name,
            text: widget.text,
            placeholder: widget.placeholder,
            description: widget.description,
            url: widget.url,
            width: widget.width,
            height: widget.height,
            rows: widget.rows,
            size: widget.size,
            deleteTable: widget.deleteTable,
            formatted: widget.formatted
        }
    });
}

function reorderWidget(pageId, initial, final) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var widgets = page.widgets;

            var index = widgets.splice(initial,1)[0];
            widgets.splice(final,0, index);
            page.widgets = widgets;
            return pageModel.updatePage(pageId, page);
        })
}

function deleteWidget(widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function () {
            pageModel
                .findOne({widgets: widgetId})
                .then(function (page) {
                        var index = page.widgets.indexOf(widgetId);
                        page.widgets.splice(index, 1);
                        page.save();
                    }
                );
        });
}