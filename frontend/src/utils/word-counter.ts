export const wordCounter = (text: string) => {
  return text.split(" ").filter((word) => word !== "").length
}

export const characterCounter = (text: string) => {
  return text.replace(/\s/g, "").length
}
