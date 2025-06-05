// 1
const apacheLogs = [
  '192.168.1.1 - - [01/Jan/2023:10:00:00 +0000] "GET / HTTP/1.1" 200 123',
  '10.0.0.1 - - [01/Jan/2023:10:00:01 +0000] "GET /about HTTP/1.1" 200 456',
  '192.168.1.1 - - [01/Jan/2023:10:00:02 +0000] "GET /contact HTTP/1.1" 200 789',
  '192.168.1.1 - - [01/Jan/2023:10:00:03 +0000] "GET /products HTTP/1.1" 200 1011',
  '10.0.0.1 - - [01/Jan/2023:10:00:04 +0000] "GET /services HTTP/1.1" 200 1213',
];

function findMostFrequenciesIp(logs: string[]) {
  const listOfIps = logs
    .map((log) => {
      const ip = log.split(' ')?.[0];

      const isIP = ip.match(/[\d*\.]+$/);

      return isIP ? ip : undefined;
    })
    .filter(Boolean) as string[];

  const ipAppears = new Map<string, number>();

  listOfIps.forEach((ip) => {
    ipAppears.set(ip, (ipAppears.get(ip) || 0) + 1);
  });

  let minCount = 0;
  let resultIP = '';

  ipAppears.forEach((count, ip) => {
    if (minCount < count) {
      resultIP = ip;
      minCount = count;
    }
  });

  return resultIP;
}

// 2
const scoresArr: [string, number][] = [
  ['Боб', 80],
  ['Чарли', 90],
  ['Боб', 85],
  ['Алиса', 90],
  ['Чарли', 80],
];

type Student = {
  totalScore: number;
  scoresCount: number;
};

function findHighestAverageScore(scores: [string, number][]) {
  const students = scores.reduce<Record<string, Student>>(
    (accum, [student, score]) => {
      return {
        ...accum,
        [student]: {
          totalScore: (accum[student]?.totalScore || 0) + score,
          scoresCount: (accum[student]?.scoresCount || 0) + 1,
        },
      };
    },
    {}
  );

  return (
    Object.entries(students)
      .map(([student, score]) => {
        return {
          name: student,
          averageScore: Math.floor(score.totalScore / score.scoresCount) || 0,
        };
      })
      .sort(
        ({ averageScore }, { averageScore: averageScore2 }) =>
          averageScore - averageScore2
      )[0].name ?? null
  );
}

// function findHighestAverageScoreOptimal(scores: [string, number]): string | null {
//   const studentScores = new Map<string, { sum: number; count: number }>();

//   for (const [name, score] of scores) {
//     const current = studentScores.get(name) |
// | { sum: 0, count: 0 };
//     studentScores.set(name, { sum: current.sum + score, count: current.count + 1 });
//   }

//   let highestAverage = -1;
//   let studentWithHighestAverage: string | null = null;

//   for (const [name, data] of studentScores) {
//     const average = Math.floor(data.sum / data.count);
//     if (average > highestAverage) {
//       highestAverage = average;
//       studentWithHighestAverage = name;
//     }
//   }

//   return studentWithHighestAverage;
// }

// 3
type NodeMetadata = { deep: number; rootValue: number };

const parentMap = { 1: 2, 2: 3, 4: 3, 5: 6 };

function findBiggestTree(tree: Record<string, number>) {
  const allParents = Object.keys(tree).map(Number);

  const getTreeLengthByNode = (
    root: number,
    { deep, rootValue }: NodeMetadata
  ): NodeMetadata => {
    const parentRoot = tree[root];
    return parentRoot
      ? getTreeLengthByNode(tree[root], {
          deep: deep + 1,
          rootValue: parentRoot,
        })
      : { deep: deep + 1, rootValue };
  };

  const allPossibleTrees: Record<string, NodeMetadata> = allParents.reduce(
    (accum, parent) => {
      const root = tree[parent];
      const deep = getTreeLengthByNode(root, { deep: 1, rootValue: root });

      return {
        ...accum,
        [parent]: deep,
      };
    },
    {}
  );

  let leafValue = +Infinity;
  let deeps = -1;

  Object.entries(allPossibleTrees).forEach(([, { deep, rootValue }]) => {
    if (leafValue > rootValue && deeps < deep) {
      leafValue = rootValue;
      deeps = deep;
    }
  });

  return deeps;
}

// function findLargestTreeRoot(parentMap: { [key: number]: number }): number | undefined {
//   const children = Object.keys(parentMap).map(Number);
//   const parents = Object.values(parentMap);
//   const allNodes = new Set([...children,...parents]);
//   const roots = new Set<number>();

//   for (const node of allNodes) {
//     if (!children.includes(node)) {
//       roots.add(node);
//     }
//   }

//   if (roots.size === 0 && Object.keys(parentMap).length > 0) {
//     // Handle the case where there's a cycle, and no clear root is found based on the definition above.
//     // In this simplified approach, we might consider any node not appearing as a child as a potential root.
//     for (const node of allNodes) {
//       if (!children.includes(node)) {
//         roots.add(node);
//       }
//     }
//     if (roots.size === 0 && allNodes.size > 0) {
//       // If still no roots, we might have a single cycle. Return the smallest node.
//       return Math.min(...allNodes);
//     }
//   } else if (roots.size === 0 && allNodes.size === 0) {
//     return undefined; // Empty forest
//   }

//   const adjacencyList: { [key: number]: number } = {};
//   for (const child in parentMap) {
//     const parent = parentMap[parseInt(child)];
//     if (!adjacencyList[parent]) {
//       adjacencyList[parent] =;
//     }
//     adjacencyList[parent].push(parseInt(child));
//   }

//   let largestTreeSize = 0;
//   let largestTreeRoot: number | undefined;

//   for (const root of roots) {
//     let currentTreeSize = 0;
//     const visited = new Set<number>();
//     const stack: number = [root];
//     visited.add(root);
//     currentTreeSize++;

//     while (stack.length > 0) {
//       const currentNode = stack.pop()!;
//       const neighbors = adjacencyList[currentNode] ||;
//       for (const neighbor of neighbors) {
//         if (!visited.has(neighbor)) {
//           visited.add(neighbor);
//           stack.push(neighbor);
//           currentTreeSize++;
//         }
//       }
//     }

//     if (currentTreeSize > largestTreeSize) {
//       largestTreeSize = currentTreeSize;
//       largestTreeRoot = root;
//     } else if (currentTreeSize === largestTreeSize) {
//       if (largestTreeRoot === undefined |
// | root < largestTreeRoot) {
//         largestTreeRoot = root;
//       }
//     }
//   }

//   return largestTreeRoot;
// }

// 4

const str = 'loveleetcode';

function findStringLetterMatch(s: string) {
  const SINGLE_MATCH = 1;

  const lettersMatch = s
    .split('')
    .reduce<Record<string, number>>((accum, letter) => {
      return {
        ...accum,
        [letter]: (accum[letter] || 0) + 1,
      };
    }, {});

  return (
    Object.entries(lettersMatch).find(
      ([, countMatch]) => countMatch === SINGLE_MATCH
    )?.[0] ?? ''
  );
}

// общая временная сложность вашего алгоритма составляет O(N + K), что в худшем случае (когда все символы уникальны) может быть O(N). Пространственная сложность составляет O(K) для хранения объекта lettersMatch.

function squashString(str: string) {
  let resultString = '';
  let nextIndex = 0;
  
  while(nextIndex < str.length) {
    const current = str.charAt(nextIndex);
    let matchCount = 0;

    for(let j = nextIndex; j < str.length; j++) {
      const nextChar = str.charAt(j);

      if(nextChar === current) {
        matchCount++;
        nextIndex++;
      } else {
        break;
      }
    }

    resultString += `${current}${matchCount}`;
  }

  return resultString;
}

// function compressStringOptimal(s: string): string {
//     if (s.length === 0) {
//         return "";
//     }

//     let compressed = "";
//     let i = 0; // Указатель на начало текущей группы символов

//     while (i < s.length) {
//         let j = i; // Указатель для поиска конца текущей группы
//         const char = s[i]; // Символ текущей группы

//         // Продвигаем j, пока символы совпадают
//         while (j < s.length && s[j] === char) {
//             j++;
//         }

//         const count = j - i; // Количество последовательных вхождений
        
//         compressed += char; // Добавляем символ
//         compressed += count; // Добавляем счетчик

//         i = j; // Перемещаем основной указатель на начало следующей группы
//     }

//     return compressed;
// }

// console.log(squashString('aaabbbbbccccdaa')); // a3b5c4d1a2

// const prices = [1, 2, 3, 4, 5, 6];

function buyMostProfitStocksOptimal(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    const potentialProfit = price - minPrice;
    maxProfit = Math.max(maxProfit, potentialProfit);
  }

  return maxProfit;
}

function buySellStocksTwoTransactions2(prices: number[]): number {
  if (prices.length === 0) {
    return 0;
  }

  let buy1 = -Infinity;
  let sell1 = 0;
  let buy2 = -Infinity;
  let sell2 = 0;

  for (const price of prices) {
    buy1 = Math.max(buy1, -price);
    sell1 = Math.max(sell1, buy1 + price);
    buy2 = Math.max(buy2, sell1 - price);
    sell2 = Math.max(sell2, buy2 + price);
  }

  return sell2;
}

//  Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const listToReverse = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4)))
);

// ListNode {
//   val: 1,
//   next: ListNode { val: 2, next: ListNode { val: 3, next: [ListNode] } }
// }

//  O(n)
function reverseLinkedList(head: ListNode) {
  let prev = null;
  let current: ListNode | null = head;

  while (current) {
    let next: ListNode | null = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

// O(n)
function reverseListRecursive(head: ListNode) {
  if (!head || !head.next) {
    return head;
  }
  const reversedHead: ListNode = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  return reversedHead;
}

// Tree
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function largestValues(root: TreeNode | null): number[] {
  if (!root) {
    return [];
  }

  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    let maxVal = -Infinity;

    for (let i = 0; i < levelSize; i++) {
      const currentNode = queue.shift()!;
      maxVal = Math.max(maxVal, currentNode.val);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    result.push(maxVal);
  }

  return result;
}

//      1
//    2   3
//   4      5
// 10
const tree = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4, new TreeNode(10))),
  new TreeNode(3, new TreeNode(5))
);



// ГРАФ
function depthFirstSearchRecursive(adjacencyList: { [key: number]: number[] }, startNode: number): number[] {
  const visited: Set<number> = new Set();
  const result: number[] = [];

  function dfs(node: number) {
    if (!visited.has(node)) {
      visited.add(node);
      result.push(node);
      const neighbors = adjacencyList[node] || [];
      for (const neighbor of neighbors) {
        dfs(neighbor);
      }
    }
  }

  dfs(startNode);
  return result;
}




function findMaxDepth(root: TreeNode | null): number {
  if(root === null) {
    return 0;
  }

  return Math.max(findMaxDepth(root.left), findMaxDepth(root.right)) + 1;
}

console.log(findMaxDepth(tree));