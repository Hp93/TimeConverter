"use strict";

(function () {
    require("../src/icon.png");
    require("../src/manifest.json");

    var _contextMenuId = "";
    var _contextMenu = browser.contextMenus.create({
        id: _contextMenuId,
        title: "Test context menu",
        contexts: ["selection"],
        onclick: function () {
            Notify("clicked!");
        }
    });


    browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        var result = Execute(request.action);

        sendResponse({
            message: result
        });
    });

    function UpdateContextMenu() {
        // _contextMenu.update 
    }

    function Execute(action, settings) {
        var result = "";

        switch (action) {
            // case "createContext":
            //     var selection = window.getSelection();
            //     //
            //     break;

            default: result = "Unsupported action: " + action;
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
})();


// console.log("background script");
// console.log(browser.contextMenus);

// window.addEventListener("contextmenu", function (ev) {
//     debugger;
//     browser.contextMenus.create({
//         id: "wtf",
//         title: "test",
//         contexts: ["selection"]
//     });
// });

// browser.menus.onClicked.addListener(function (info, tab) {
//     if (info.menuItemId == "wtf") {
//         console.log(info.selectionText);
//     }
// });