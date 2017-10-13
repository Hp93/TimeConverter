"use strict";

(function () {
    console.log("index.js");

    // browser.runtime.onMessage.addListener(function () {
    //     console.log(arguments);
    // });

    window.addEventListener("click", function () {
        Execute("do something background script!", function (response) {
            console.log("response:");
            console.log(response);
        });
    });

    function Execute(action, callback) {
        var sending = browser.runtime.sendMessage({
            action: action
        });

        sending.then(
            function (response) {
                // success
                if (typeof callback === "function") {
                    callback(response);
                }
            },
            function () {
                // error
                console.log("error:");
                console.log(arguments);
            });
    }
})();