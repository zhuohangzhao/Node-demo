'use strict';
const tr = require('through2');
const fs = require('fs');
const split = require('split');

fs.createReadStream('transform1.js')
  .pipe(split())
  .pipe(tr(function(buf, _, next){
      if(buf.toString().length > 15){
          console.log(buf.toString().length);
          this.push(buf.toString().toUpperCase());
          this.push('\n');
      }
      next();
  }))
  .pipe(fs.createWriteStream('files/transform.js'));
