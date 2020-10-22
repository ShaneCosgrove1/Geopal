module.exports = {
    // files: "css/*, *.html",
    files: '*',
    // host: "192.168.1.1",
    ghostMode: {
        links: true,
        forms: true,
        scroll: true,
    },
    server: {
        baseDir: 'Site-Main/Utility/NameLookup_AD-LocalFile/',
    },
};

// browser-sync --config bSyncConfig.js

// x@WBED00016 MINGW64 /d/xW+B/GeoPal/GeopalScripts (master)
// $ cd Site-Main/Utility/NameLookup_AD-LocalFile/

// x@WBED00016 MINGW64 /d/xW+B/GeoPal/GeopalScripts/Site-Main/Utility/NameLookup_AD-LocalFile (master)
// $ browser-sync start --index"index.html"  --server --files "./*.*"
