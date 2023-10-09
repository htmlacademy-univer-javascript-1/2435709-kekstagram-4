function checkStringLength (str,len) {
  if (str.length <= len){
    return true;
  }
  return false;
}
checkStringLength('проверяемая строка', 10);

function checkPalindrome (str) {
  let string = str.replaceAll(' ','');
  string = string.toLowerCase();

  let reverseStr = '';
  for (let i = string.length - 1; i >= 0; i = i - 1) {
    reverseStr += string.at(i);
  }
  if (string === reverseStr) {
    return true;
  }
  return false;
}
checkPalindrome('Лёша на полке клопа нашёл ');

function extractNumbers (str) {
  let newString = '';
  for (let i = 0; i <= str.length - 1; i++) {
    if (Number(str[i]) || Number(str[i]=== '0')) {
      newString +=  str[i];
    }
  }
  if (newString === '') {
    return NaN;
  }
  return Number(newString);
}
extractNumbers('2023 год');
extractNumbers('ECMAScript 2022');
extractNumbers('1 кефир, 0.5 батона');
extractNumbers('агент 007');
extractNumbers('а я томат');

