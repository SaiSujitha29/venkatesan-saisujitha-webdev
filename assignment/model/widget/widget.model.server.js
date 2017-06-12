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
        .create(widget);
        // .then(function (widget) {
        //     pageModel
        //         .findWebsiteById(pageId)
        //         .then(function (page) {
        //             website.pages.push(page._id);
        //             website.save();
        //             return widget;
        //         });
        // });
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
            description: widget.description,
            text : widget.text,
            size: widget.size,
            url: widget.url,
            width: widget.width,
            rows: widget.rows,
            placeholder: widget.placeholder,
            formatted: widget.formatted
        }
    });
}

function reorderWidget(pageId, initial, final) {
    return widgetModel
        .find({_page: pageId})
        .then(function (widgets) {
            var widget = widgets[initial];
            widgets.splice(initial, 1);
            widgets.splice(final, 0 , widget);
            widgetModel
                .remove({_page: pageId})
                .then(function () {
                    widgetModel.insertMany(widgets);
                });
        })
}

function deleteWidget(widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function () {
            pageModel
                .findOne({widgets: widgetId})
                .then(function (widget) {
                        var index = widget.widgets.indexOf(widgetId);
                        widget.widgets.splice(index, 1);
                        widget.save();
                    }
                );
        });
}