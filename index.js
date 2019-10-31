'use strict';

const Base = require('run-plugin-webpack');
const fs = require('fs');
const path = require('path');


const Plugin = Base.extends(function(options) {
  this.options = this.getOptions(options);
});


Plugin.prototype.getOptions = function(options) {
  const opts = Object(options);
  if(!opts.src || 'string' !== typeof opts.src) {
    throw new TypeError('`src` is invalid!');
  }
  if(!opts.dest || 'string' !== typeof opts.dest) {
    throw new TypeError('`dest` is invalid!');
  }
  const src = path.resolve(opts.src);
  const dest = path.resolve(opts.dest);
  return {
    src: src,
    dest: dest
  };
};

Plugin.prototype.main = function() {
  let icons = "";
  let path =this.options.src;
  let files = walker(path);
  files.forEach(file => {
    const iconName = file.replace(".svg", "");
    var icon = fs.readFileSync(path +'/'+ file) + "";
    //clean pre <svg 
    icon = icon.substr(icon.indexOf('<svg'));
    //remove version, class, width and height attributes
    icon = icon.replace(/(version|class|width|height)="(.*?)"/igm, "");
    icons += `'${iconName}': \`${icon}\`,\n\r`;
  });
  writeJavascript(this.options.dest, icons);
}

let walker = function(dir, filelist = [], prefix = "") {
  let files = fs.readdirSync(dir).filter(f => f.includes(".svg");
  files.forEach(file => {
   filelist.push(prefix + file);
  });
  return filelist;
}

let writeJavascript = function(file, collection = {}, defaultClass = "") {
  fs.writeFileSync(
    file,
    `
      const collection = {${collection}}
      const defaultClass = "${defaultClass}"
      module.exports = {
          collection: collection,
          svg: (name, attributes = '') => {
          var replacement = "<svg ";
          if (!collection[name]) {
            console.error('Failed to load SVG ' + name);
            return;
          }
          if (typeof attributes === "object") {
              for (let property in attributes) {
                  if (attributes.hasOwnProperty(property)) {
                      let value = typeof attributes[property] == 'string'
                          ? attributes[property]
                          : JSON.stringify(attributes[property]);

                      replacement += property + "='" + value + "' ";
                  }
              }
          } else {
              replacement += 'class="' + defaultClass + " " + attributes + '" ';
          }
          return collection[name].replace('<svg ', replacement);
        }
      };
    `
  );
}

module.exports = Plugin;
