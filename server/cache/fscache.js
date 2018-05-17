var fs = require('fs');
var path = require('path');

var watch = require('node-watch');
var diff = require('deep-diff').diff;

var config = require('../config/config'); 

var sizeOf = require('image-size');

var _filecache = null;


const getFilesSync = (dir, fileList = []) => {

    if (fs.existsSync(dir)) {
        fs.readdirSync(dir).forEach(file => {
            const filePath = path.join(dir, file)

            if (fs.statSync(filePath).isDirectory()) {
                fileList.push( {[file]: getFilesSync(filePath)} )
            } else {
                try {
                    var st = fs.statSync(path.join(dir, file));
                    var dims = sizeOf(path.join(dir, file))
                    fileList.push(
                        {
                            name: file,
                            path: dir.slice(config.iconfolder.length - 1),
                            size: st.size,
                            date: st.mtime,
                            width: dims.width,
                            height: dims.height
                        }
                    )
                } catch(e) {
                    //Probably frowned upon, but simply ignoring the exception makes fileList contain only image-files that sizeOf accepts
                }
            }
        })
    }
    return fileList;
}

const updateFileCache = async () => {
    console.time('Filecache update');
    var _fl = [];
    _fl = await getFilesSync(config.iconfolder, _fl);
    if (_fl) {
        var _changes = diff(_filecache, _fl); 
        if (_changes) {
            _filecache = _fl;
        }
    }
    console.timeEnd('Filecache update');
}

updateFileCache();

try {
    watch(config.iconfolder, { recursive: true, delay: 1000 }, function(evt, name) {
        updateFileCache();
    });
} catch(e) {
    console.log('Watch Error : ', e)
}


module.exports.getFiles = function() {
    return _filecache
    
}
