"use strict";

(function () {
    require("../src/icon.png");
    require("../src/manifest.json");

    var _contextMenuId = "timeConverter--ContextMenu";

    browser.contextMenus.create({
        id: _contextMenuId,
        title: "Test context menu",
        contexts: ["selection"],
        onclick: function () {
            Notify("clicked!");
        }
    });

    browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        var result = Execute(request.action, request.data);

        sendResponse({
            message: result
        });
    });


    //#region Private

    function UpdateContextMenu(options) {
        browser.contextMenus.update(_contextMenuId, options);
    }

    function Execute(action, data) {
        var result = "";

        switch (action) {
            case "textSelected":
                UpdateContextMenu({ title: data.text });
                break;

            default:
                result = "Unsupported action: " + action;
                break;
        }
        return result;
    }

    function Notify(message, title) {
        browser.notifications.create({
            type: "basic",
            iconUrl: browser.extension.getURL("link.png"),
            title: title ? title : "Time Converter",
            message: message
        });
    }

    function GetCurrentTimeZoneOffset() {
        return new Date().getTimezoneOffset();
    }

    var timeZonePatterns = [];

    function GetTime(input) {
        var timePatterns = /(\d{1,2}:\d{1,2}(?::\d{1,2})*) *((?:am|a.m|pm|p.m))*/ig;     // ex: 5:37 a.m or 15:33:44 pm
        var result = "";
        var matches = timePatterns.exec(input);

        if (!Array.isArray(matches) || matches.length <= 0) {
            return;
        }
        var time = matches[1];
        var timePeriod = matches[2];

        var hour = time.split(":")[0];
        var minute = time.split(":")[1];
        //var second = time.split(":")[2];

        if (timePeriod) {
            hour = Number(hour);

            if (["PM", "P.M", "pm", "p.m"].indexOf(timePeriod) >= 0 && hour < 12) {
                hour += 12;
            }
        } else {
            hour = hour[1] ? "0" + hour[0] : hour;
        }
        minute = minute[1] ? "0" + minute[1] : minute;
        return hour + ":" + minute;
    }

    function AnalyzeText(input) {
        // detect time

        // detect time zone

        // detect date

        // desired output format: YYYY-MM-DDTHH:mm:ss.sssZ

        // convert to current time zone
    }

    //#endregion
})();