const arr = [2, 1, 3, 10];

// 인자 중 두번째 인자에서 첫번쨰 인자를 뺀 값을 return하면 내림차순 정렬이 된다.
arr.sort(function (a, b) {
  return b - a;
});

console.log(arr);
