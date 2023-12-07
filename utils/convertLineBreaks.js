// export a function that converts the \n and \n\r line endings to HTML breaks in a given string
export function convertLineBreaks(str) {
  return str.replace(/\r\n|\r|\n/g, "<br>");
}
