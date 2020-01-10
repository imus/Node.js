// 尾递归（函数尾调用）
var factorial = exports.factorial = function (n, result) {
  if (n === 1) {
    return result;
  } else {
    return factorial(n - 1, n * result)
  }
}

/* 
factorial(4, 1)
= factorial(3, 4*1)
= factorial(2, 3*4*1)
= factorial(1, 2*3*4*1)
=factorial(1, 24)
=24
*/

// 数据密集型运算， n = 50, 阻止node事件循环，阻塞node线程。
// 要么重构、要么创建一个后台服务
// 0 1 1 2 3 5 8 13
var fibonacci = exports.fibonacci = function (n) {
  if (n === 1) {
    return 1;
  } else if (n === 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 计算过程交给事件循环调度，node进程会占用所有CPU负载，
// 但是展示了通过  事件循环分派工作的技术  ,并不会阻塞服务器
var fibonacciAsync = exports.fibonacciAsync = function (n, done) {
  if (n === 1 || n === 2) {
    return done(1);
  } else {
    process.nextTick(() => {
      fibonacciAsync(n - 1, (val1) => {
        process.nextTick(() => {
          fibonacciAsync(n -2, (val2) => {
            done(val1 + val2);
          })
        });
      });
    });
  }
}