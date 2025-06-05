function getUniqArrayV1(array: number[]) {
  return [...new Set(array)];
}

function reverse(str: string) {
  return str.split('').reverse().join('');
}

function isPalindrome(work: string) {
  return work === work.split('').reverse().join('');
}

function charFrequency(word: string) {
  return word.split('').reduce((accum, val) => {
    return {
      ...accum,
      [val]: (accum[val] || 0) + 1,
    }
  }, {} as Record<string, number>);
}



function flattenArray(array: (number | (number | number[])[])[]) {
  return array.reduce<number[]>((accum, item) => {
    if(Array.isArray(item)) {
      accum = accum.concat(...item);
    } else {
      accum = accum.concat(item);
    }

    return accum;
  }, []);
}

// function deepEqual(a: Record<string, unknown>, b: Record<string, unknown>): boolean {
//   if (a === b) return true;
//   if (typeof a !== 'object' || typeof b !== 'object' || a == null || b == null) return false;

//   const keysA = Object.keys(a);
//   const keysB = Object.keys(b);
//   if (keysA.length !== keysB.length) return false;

//   for (const key of keysA) {
//     if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
//   }

//   return true;
// }

function isAnagram(word: string, word2: string): boolean {
  return word.split('').sort().join('') === word2.split('').sort().join('');
}

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' }
];

function excludeNonUniqItems<T>(array: T[], trackBy: keyof T): T[] {
  const setsOfIds = new Set<T[typeof trackBy]>([]);

  return array.filter((item) => {
    const uniqProp = item[trackBy];

    if(setsOfIds.has(uniqProp)) {
      return false;
    }

    setsOfIds.add(uniqProp);

    return true;
  })
}



type AnyFunction = (...args: any[]) => any;

function once(fn: AnyFunction): AnyFunction {
  const cache = new Map<string, any>();
  return (...args: Parameters<typeof fn>) => {
    const cacheKey = args.toString();
    const resultFromCache = cache.has(cacheKey);

    if(resultFromCache) {
      return cache.get(cacheKey);
    };

    const result = fn.call(null, args);

    cache.set(cacheKey, result);

    return result;
  };
}

function once2(fn: AnyFunction): AnyFunction {
  let called = false;

  return () => {
    if(!called) {
      fn();
      called = true;
    }
  }
}


const init = once2(() => console.log('Initialized'));

function debounce<T extends (...args: any[]) => void>(fn: T, delay = 500): T {
  let timerId: any = null;


  const func = (...rest: Parameters<T>) => {
    if(timerId) {
      clearTimeout(timerId);
    };
    
    timerId = setTimeout(() => {
      fn.call(null, rest);
    }, delay)
  };
  
  return func as unknown as T;
}



async function sequentialRequests(tasks: (() => Promise<any>)[]): Promise<any[]> {
  const results: any[] = [];

  for await (const task of tasks) {
    try {
      const res = await task();
      results.push(res);  
    } catch (error) {
      console.error(error);
    }
  }

  return results;
}



const deepClone = (obj: Record<string, unknown>) => {
  return Object.entries(obj).reduce((resultObj, [key, value]) => {

    const valueType = typeof value;

    if(valueType === 'object') deepClone(value as Record<string, unknown>);


    return {
      ...resultObj,
      [key]: value,
    }
  }, {})
}

