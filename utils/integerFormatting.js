export function formatNumberWithPeriods(number) {
  // Convert the number to a string
  if (!number) {
    return '';
  }
  const numString = number.toString();
  
  // Use a regular expression to insert a period every three digits from the end
  const formattedString = numString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return formattedString;
}