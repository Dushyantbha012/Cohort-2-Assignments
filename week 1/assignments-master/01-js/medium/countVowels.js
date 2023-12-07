/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    const vowels = ['a','e','i','o','u','A','E','I','O','U'];
    let count =0;
    for(let i=0;i<str.length;i++)
    {
      if(checkinarr(str[i],vowels)) count++;
    }
    return count;
}
function checkinarr(chartocheck,arrgiven)
{
  for(let i=0;i<arrgiven.length;i++)
  {
    if(arrgiven[i]==chartocheck) return true;
  }
  return false;
}
module.exports = countVowels;