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

// 0 1 1 2 3 5 8 13
var fibonacci = exports.fibonacci = function (n) {
  if (n === 1) {
    return 1;
  } else if (n === 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}