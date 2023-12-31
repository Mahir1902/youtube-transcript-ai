export function toAscii(str:string) {
    // Replace non-ASCII characters with their closest ASCII equivalent or remove them
    return str.replace(/[^\x00-\x7F]/g, "")
}
