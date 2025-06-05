function maxProfit(prices: number[]): number {
  if(!prices.length) return 0;



  let buy = prices[0];
  let buyIndex = 0;

  let sell = prices[0];
  // let sellIndex = 0;


  for(let j = 0; j < prices.length; j++) {
    if(buy > prices[j]) {
      buy = prices[j];
      buyIndex = j;
    }
  }

  let maxProfit = 0;

  for(let j = buyIndex; j < prices.length; j++) {

    if(maxProfit < prices[j] - buy) {
      maxProfit = prices[j] - buy;
    }

  }


  console.log(buy, 'buyIndex')
  console.log(sell, 'sell')


  return maxProfit;
};

// [7,1,5,3,6,4]

// 7 > 1 yes 


console.log(maxProfit([2,4,1])); // 2