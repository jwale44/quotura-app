export enum SummarizeContentLength {
  VERY_SHORT = "very_short",
  SHORT = "short",
  AVERAGE = "average",
  LONG = "long",
}

export enum SummarizeContentMode {
  PARAGRAPH = "paragraph",
  BULLET_POINTS = "bullet_points",
}

export interface SummarizeContentValues {
  body: string
  length: SummarizeContentLength
  mode: SummarizeContentMode
}