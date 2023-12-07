/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/


function isAnagram(str1, str2) {
  str1 = str1.toUpperCase();
  str2 = str2.toUpperCase();
  const arrStr1 = [];
  const arrStr2 = [];
  for(let i=0;i<str1.length;i++)
  {
      arrStr1.push(str1[i]);
  }
  for(let i=0;i<str2.length;i++)
  {
      arrStr2.push(str2[i]);
  }
  arrStr1.sort();
  arrStr2.sort();
  return arrcheck(arrStr1,arrStr2);
}
function arrcheck(arr1,arr2)
{
  if(arr1.length!=arr2.length) return false;
  for(let i=0;i<arr1.length;i++)
  {
    if(arr1[i]!=arr2[i]) return false;
  }
  return true;
}

module.exports = isAnagram;
