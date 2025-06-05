function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0;


  let j = 0;

  for(let i = 1; i < nums.length; i++) {
    if(nums[i] !== nums[j]) {
      j++;
      nums[j] = nums[i];
    }
  }

  return j + 1;
}

removeDuplicates([0]); // [0,1,2,3,4]