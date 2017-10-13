const path = require("path");

module.exports = {
    entry: {
        "contentscript": "./src/index.js",
        "backgroundscript": "./src/background.js"
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.(png|css|json)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]"
                        }
                    }
                ]
            }
        ]
    }
};
