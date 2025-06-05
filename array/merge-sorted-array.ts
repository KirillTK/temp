/**
 Do not return anything, modify nums1 in-place instead.
 */
 function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let j = n - 1;
    // nums1.push(...nums2);

    for(let i = 0; i < nums1.length - 1; i++) {
        if(nums1[i] > nums2[j]) {
            let temp = nums1[i];
            nums1[i] = nums2[j];
            nums1[i + 1] = temp;
            j--;
        }
    }
};


const nums1 = [1,2,3,0,0,0];
const nums2 = [2,5,6];


// [1, 2, 3, 0, 0, 0],  i = 5; j = 2;
// [1, 2, 3, 0, 0, 2],  i = 5; 
// [1, 2, 3, 0, 2, 5]
// [1, 2, 3, 2, 5, 6]
// [1, 2, 2, 3, 5, 6]



// Run the example with step-by-step logging
merge(nums1, 3, nums2, 3);

console.log(nums1);