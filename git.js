const { spawn, exec } = require('child_process')
const { pull, add, commit, push } = require('./utils/gitImport')
let arg = process.argv.splice(2)

class gitAuto {
    constructor(path, build = false, push_main = 'origin') {
        this.path = path
        this.build = build
        this.push_main = push_main
    }
    async push () {}
    async build_push () {}
    async cdPath () {
        process.chdir(this.path)
        let _spawn = spawn('sh', ['-c', `cd ${this.path}`], {shell: true  })
        _spawn.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        
        _spawn.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        
        _spawn.on('close', async (code) => {
            this.getBranch()
            console.log(`切换目录进程结束`);
        });
    }
    getBranch () {
        let _branch = spawn('sh', ['-c', `git rev-parse --abbrev-ref HEAD`])
        _branch.stdout.on('data', (data) => {
            console.log('getBranch-begin', `${data}`);
            this.branch = `${data}`
        });
        _branch.stderr.on('data', (data) => {
            console.error(`getBranch-error: ${data}`);
        });
        
        _branch.on('close', (code) => {
            this.origin()
            console.log(`getBranch-end`);
        });
    }
    async origin () {
        await pull()
        await add()
        await commit()
        await push()
    }
}
let news = new gitAuto(arg[0])
news.cdPath()