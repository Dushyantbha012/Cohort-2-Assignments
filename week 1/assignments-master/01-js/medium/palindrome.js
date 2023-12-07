/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.toUpperCase();
  return pal(str,0,str.length-1);
}
function pal(str,i,j)
{
  if(i>j) return true;
  if(str[i]=='.'||str[i]=='?'||str[i]=='!'||str[i]==','||str[i]==' ') return pal(str,i+1,j);
  if(str[j]=='.'||str[j]=='?'||str[j]=='!'||str[j]==','||str[j]==' ') return pal(str,i,j-1);
  if(str[i]!=str[j]) return false;
  return pal(str,i+1,j-1);
}

module.exports = isPalindrome;
