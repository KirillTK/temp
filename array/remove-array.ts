function removeElement(nums: number[], val: number): number {

    let lastElementIndex = nums.length - 1;

    while(lastElementIndex >= 0) {

        if(nums[lastElementIndex] === val) {
            nums.splice(lastElementIndex, 1);
        }

        lastElementIndex--;
    }

    return nums.length;
};

console.log(removeElement([3,2,2,3], 3)); // 2 , [2,2]
