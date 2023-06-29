export default function sortArray(index, arr) {
  const sortedArr = [...arr];

  switch (index) {
    case 0:
      sortedArr.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
    case 1:
      sortedArr.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      break;
    case 2:
      sortedArr.sort((a, b) => b.status - a.status);
      break;
    case 3:
      sortedArr.sort((a, b) => a.status - b.status);
      break;
  }

  return sortedArr;
}