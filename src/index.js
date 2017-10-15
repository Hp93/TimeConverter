"use strict";

(function () {
    console.log("index.js");

    // browser.runtime.onMessage.addListener(function () {
    //     console.log(arguments);
    // });

    window.addEventListener("mouseup", function () {
        var selection = window.getSelection().toString();

        if (typeof selection !== "string" || !selection) {
            return;
        }

        Execute("textSelected", { text: selection }, function (response) {
            // console.log("response:");
            // console.log(response);
        });
    }, false);


    //#region Private

    function Execute(action, dataOrCallback, callback) {
        var sending = browser.runtime.sendMessage({
            action: action,
            data: typeof dataOrCallback !== "function" ? dataOrCallback : {}
        });

        sending.then(
            function (response) {
                // success
                if (typeof callback === "function") {
                    callback(response);
                } else if (typeof dataOrCallback === "function") {
                    dataOrCallback(response);
                }
            },
            function () {
                // error
                console.log("error:");
                console.log(arguments);
            });
    }

    //#endregion
})();