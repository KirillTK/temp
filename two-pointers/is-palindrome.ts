function isPalindrome(s: string): boolean {
  const normilizedStr = s.toLowerCase().split('').filter((item) => item.match(/[a-z]/) || item.match(/[0-9]/)).join('');

  return normilizedStr === normilizedStr.split('').reverse().join('');
};