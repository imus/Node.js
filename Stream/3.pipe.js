// readable.pipe() 方法绑定可写流到可读流， 将可读流自动切换到流动模式， 并将可读流的所有数据推送到绑定的可写流。 
// 数据流会被自动管理， 所以即使可读流更快， 目标可写流也不会超负荷。

// process.stderr 和 process.stdout 可写流在 Node.js 进程退出之前永远不会关闭， 无论指定的选项如何。
const fs = require("fs");
const zlib = require("zlib");
const r = fs.createReadStream("names.txt");
const w = fs.createWriteStream("out.txt");

r.pipe(zlib.createGzip()).pipe(w);

