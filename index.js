#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const path = require('path');
//method # 2
// const lstat = util.promisify(fs.lstat);
//const lstat = fs.promises.lstat;
//Method # 3
const {lstat} = fs.promises;
const targetDir = process.argv[2] || process.cwd();
// method 1 for wrapping lstat in a promise
// const lstat = (filename) => {
//     return new Promise((resolve, reject) => {
//         fs.lstat(filename, (err, stats)=> {
//             if(err){
//                 reject(err);
//             }
//             resolve(stats);
//         });
//     });
// }

fs.readdir(targetDir, async (err, filenames) => {
    
    if(err){
        console.log(err);
    }
    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDir, filename));
    });
    const allStats = await Promise.all(statPromises);
    for(let stats of allStats){
        const index = allStats.indexOf(stats);
        
        if(stats.isFile()){
            console.log(chalk.blueBright(filenames[index]));
        }   else {
            console.log(chalk.redBright(filenames[index]));
        }
    }
});



