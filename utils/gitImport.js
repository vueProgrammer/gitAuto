const { spawn } = require('child_process')

async function pull () {
    return new Promise((resolve) => {
        let _spawn = spawn('sh', ['-c', `git pull ${this.push_main} ${this.branch}`])
        _spawn.stdout.on('data', (data) => {
            console.log(`pull-begin: ${data}`);
        });
        
        _spawn.stderr.on('data', (data) => {
            console.error(`pull-error: ${data}`);
        });
        
        _spawn.on('close', (code) => {
            resolve()
            console.log(`pull-end`);
        });
    })
}
async function add () {
    return new Promise((resolve) => {
        let _spawn = spawn('sh', ['-c', `git add .`])
        _spawn.stdout.on('data', (data) => {
            console.log(`add-begin: ${data}`);
        });
        
        _spawn.stderr.on('data', (data) => {
            console.error(`add-error: ${data}`);
        });
        
        _spawn.on('close', (code) => {
            resolve()
            console.log(`add-end`);
        });
    })
}
async function commit () {
    return new Promise((resolve) => {
        let _spawn = spawn('sh', ['-c', `git commit -m "zcl"`])
        _spawn.stdout.on('data', (data) => {
            console.log(`commit-begin: ${data}`);
        });
        
        _spawn.stderr.on('data', (data) => {
            console.error(`commit-error: ${data}`);
        });
        
        _spawn.on('close', (code) => {
            resolve()
            console.log(`commit-end`);
        });
    })
}
async function push () {
    return new Promise((resolve) => {
        let _spawn = spawn('sh', ['-c', `git push`])
        _spawn.stdout.on('data', (data) => {
            console.log(`push-begin: ${data}`);
        });
        
        _spawn.stderr.on('data', (data) => {
            console.error(`push-error: ${data}`);
        });
        
        _spawn.on('close', (code) => {
            resolve()
            console.log(`push-end`);
        });
    })
}

module.exports = {
    pull,
    add,
    commit,
    push
}