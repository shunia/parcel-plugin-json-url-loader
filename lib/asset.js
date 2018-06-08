const RawAsset = require('parcel-bundler/src/assets/RawAsset');
const urlJoin = require('parcel-bundler/src/utils/urlJoin');

/**
 * RawAsset has almost everything we need, except tow things to notice:
 *  1. the `type` property should be specified to `json` in order to output the right file extension.
 *  2. `generate` function inside RawAsset tries to handle mapped file type to the builtin Asset, 
 *     just remove that, and then a correct url will be generated.
 */
class JSONURLLoader extends RawAsset {

    constructor(...props) {
        super(...props);

        // to generate right extension
        this.type = 'json';
    }

    async generate() {
        // ------>
        // this is what I remove from the original RawAsset

        // // Don't return a URL to the JS bundle if there is a bundle loader defined for this asset type.
        // // This will cause the actual asset to be automatically preloaded prior to the JS bundle running.
        // if (this.options.bundleLoaders[this.type]) {
        //     return {};
        // }


        // the left remain untouched
        const pathToAsset = urlJoin(
            this.options.publicURL,
            this.generateBundleName()
        );

        // output is just something like `module.exports=\"/34b9e2353b819c1b00acf3303a855491.json\";`
        return {
            js: `module.exports=${JSON.stringify(pathToAsset)};`
        };
    }

}

module.exports = JSONURLLoader;
