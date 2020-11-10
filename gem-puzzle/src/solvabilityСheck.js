function searchNumbers(arr, i, item) {
  let result = 0;
  for (let j = i + 1; j < arr.length; j += 1) {
    if (item > arr[j]) {
      result += 1;
    }
  }
  return result;
}

export default function isSolvability(arr, size) {
  let result = 0;
  for (let i = 0; i < arr.length; i += 1) {
    const item = arr[i];
    if (item === 0) {
      result += Math.ceil(i % size);
    } else {
      result += searchNumbers(arr, i, item);
    }
  }
  if (result % 2 === 0) {
    return true;
  }
  return false;
}
