module.exports = bundler => {
    // simply register the extended Asset to the extension of `json`
    bundler.addAssetType('json', require.resolve('./asset.js'));
};