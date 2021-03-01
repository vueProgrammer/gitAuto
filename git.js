const { spawn, exec } = require('child_process')
const { resolve } = require('path')
const PATH = require('path')
const { threadId } = require('worker_threads')

let arg = process.argv.splice(2)

class gitAuto {
    constructor(path, build = false, push_main = 'origin') {
        this.path = path
        this.build = build
        this.push_main = push_main
        
        // let _spawn = spawn('sh', ['-c', `git rev-parse --abbrev-ref HEAD`])
        // _spawn.stdout.on('data', (data) => {
        //     console.log(`pull_stdout: ${data}`);
        // });
    }
    async push () {}
    async build_push () {}
    async push_main () {}
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
            // await this.origin()
            this.getBranch()
            // console.log(`子进程退出，退出码 ${code}====${process.cwd()}`);
        });
    }
    getBranch () {
        console.log(process.cwd(), '1254654654654');
        let _branch = spawn('sh', ['-c', `git rev-parse --abbrev-ref HEAD`])
        _branch.stdout.on('data', (data) => {
            console.log('begin========code', data);
        });
        _branch.stderr.on('data', (data) => {
            console.error(`begin======: ${data}`);
        });
        
        _branch.on('close', (code) => {
            console.log(`begin ${code}====${process.cwd()}`);
        });
        this.branch = _branch
    }
    async origin () {
        await this.pull()
        await this.add()
        await this.commit()
        await this.push()
    }
    async pull () {
        return new Promise((resolve) => {
            // console.log('git -err---------', this.push_main, this.branch);
            let _spawn = spawn('sh', ['-c', `git pull ${this.push_main} ${this.branch}`])
            _spawn.stdout.on('data', (data) => {
                console.log(`pull======: ${data}`);
            });
            
            _spawn.stderr.on('data', (data) => {
                console.error(`pullerr======: ${data}`);
            });
            
            _spawn.on('close', (code) => {
                console.log(`pull ${code}====${process.cwd()}`);
            });
        })
    }
    async add () {
        return new Promise((resolve) => {
            let _spawn = spawn('sh', ['-c', `git add .`])
            _spawn.stdout.on('data', (data) => {
                console.log(`add======: ${data}`);
            });
            
            _spawn.stderr.on('data', (data) => {
                console.error(`add======: ${data}`);
            });
            
            _spawn.on('close', (code) => {
                console.log(`add ${code}====${process.cwd()}`);
            });
        })
    }
    async commit () {
        return new Promise((resolve) => {
            let _spawn = spawn('sh', ['-c', `git commit -m "zcl"`])
            _spawn.stdout.on('data', (data) => {
                console.log(`commit======: ${data}`);
            });
            
            _spawn.stderr.on('data', (data) => {
                console.error(`commit======: ${data}`);
            });
            
            _spawn.on('close', (code) => {
                console.log(`commit ${code}====${process.cwd()}`);
            });
        })
    }
    async push () {
        return new Promise((resolve) => {
            let _spawn = spawn('sh', ['-c', `git push`])
            _spawn.stdout.on('data', (data) => {
                console.log(`push======: ${data}`);
            });
            
            _spawn.stderr.on('data', (data) => {
                console.error(`push======: ${data}`);
            });
            
            _spawn.on('close', (code) => {
                console.log(`push ${code}====${process.cwd()}`);
            });
        })
    }
}
let news = new gitAuto(arg[0])
news.cdPath()