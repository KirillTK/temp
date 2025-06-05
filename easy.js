Function.prototype.bind = function (context, ...args) {
  return () => this.apply(context, args);
};

function myInstanceOf(obj, constructor) {
  if (obj == null || typeof obj !== 'object') return false;

  let proto = Object.getPrototypeOf(obj);
  const prototype = constructor.prototype;

  while (proto) {
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

function throttle(fn, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = performance.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

function quickSort(array) {
  if(!array.length) return array;

  const pivot = array.pop();
  const leftArray = array.filter((el) => el <= pivot);
  const rightArray = array.filter((el) => el > pivot);

  return [...quickSort(leftArray), pivot, ...quickSort(rightArray)];
}

function bubbleSort(arr) {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }
  return a;
}

console.log(quickSort([36, 5, 2, 1 , 100, 20 ]));




console.log(performance.now())