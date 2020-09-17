// @ts-nocheck
// const process = require("process");
const fs = require("fs");
const path = require("path");
const {spawnSync} = require("child_process");

const gitUrl = "https://gitee.com/LiZhiW/clever-hinny-js.git";
const gitBranch = "master";

// 当前路径
const currentDir = path.resolve();
const tmpGitDir = path.resolve(currentDir, "./@hinny-types");
const targetGitDir = path.resolve(currentDir, "./node_modules/@types/hinny");

function deepDelDir(dirPath) {
    // 获取目录所有子目录
    const fileList = fs.readdirSync(dirPath);
    // 遍历所有子目录
    fileList.forEach(childName => {
        // 获取子目录信息
        const childPath = path.resolve(dirPath, childName);
        const fileInfo = fs.statSync(childPath);
        if (fileInfo.isFile()) {
            // 删除文件
            fs.unlinkSync(childPath);
        } else if (fileInfo.isDirectory()) {
            // 递归删除文件夹
            deepDelDir(childPath);
        }
    });
    // 删除空文件夹
    fs.rmdirSync(dirPath);
}

function deepCopyFile(srcPath, tarPath) {
    // 目标文件夹不存在则创建
    if (!fs.existsSync(tarPath)) {
        fs.mkdirSync(tarPath);
    }
    // 获取目录所有子目录
    const fileList = fs.readdirSync(srcPath);
    // 遍历所有子目录
    fileList.forEach(childName => {
        // 获取子目录信息
        const childPath = path.join(srcPath, childName);
        const fileInfo = fs.statSync(childPath);
        if (fileInfo.isFile()) {
            // 复制文件
            const destPath = path.join(tarPath, childName);
            fs.copyFileSync(childPath, destPath)
        } else {
            // 递归复制文件夹
            const tarFileDir = path.join(tarPath, childName);
            deepCopyFile(childPath, tarFileDir);
        }
    });
}

function initHinnyTypes() {
    // clone文件到本地
    console.log("\n### 1.开始clone @types/hinny");
    if (fs.existsSync(tmpGitDir)) {
        // console.error("临时文件已存在，请先删除，path=", tmpGitDir);
        // return;
        deepDelDir(tmpGitDir);
    }
    fs.mkdirSync(tmpGitDir, {recursive: true});
    console.log("git clone -b", gitBranch, gitUrl, tmpGitDir);
    spawnSync(`git`, ['clone', '-b', gitBranch, gitUrl, tmpGitDir], {cwd: currentDir, stdio: [0, 1, 2]});
    console.log("### ---> clone完成!\n");

    // 复制文件到目标位置
    console.log("### 2.复制 @types/hinny 到 node_modules/@types/hinny");
    if (fs.existsSync(targetGitDir)) {
        deepDelDir(targetGitDir);
    }
    fs.mkdirSync(targetGitDir, {recursive: true});
    deepCopyFile(path.join(tmpGitDir, "types"), targetGitDir);
    console.log("### ---> 复制完成!\n");

    // 删除临时文件
    console.log("### 3.删除临时文件");
    deepDelDir(tmpGitDir);
    console.log("### ---> 删除临时文件完成!");
}

initHinnyTypes();
