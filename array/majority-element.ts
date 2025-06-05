function majorityElement(nums: number[]): number {
  if(nums.length === 1) return nums[0];

  const majority = nums.length / 2;
  const manyTimesAppeard = new Map();

  for(let i = 0; i < nums.length; i++) {
      const value = nums[i];

      if(!manyTimesAppeard.has(value)) {
          manyTimesAppeard.set(value, 1);
      } else {
          const timesAppeared = manyTimesAppeard.get(value) + 1;

          if(timesAppeared > majority) return value;

          manyTimesAppeard.set(value, timesAppeared);
      }
  }

  return 0;
};

console.log(majorityElement([3,2]))