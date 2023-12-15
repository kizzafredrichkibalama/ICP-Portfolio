export function shortenString(str) {
  if (str?.length <= 11) {
    return str
  } else {
    let firstPart = str?.substring(0, 10)
    let lastPart = str?.substring(str?.length - 4)
    return `${firstPart}...${lastPart}`
  }
}
