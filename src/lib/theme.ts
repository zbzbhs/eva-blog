// src/lib/theme.ts
export const colors = {
  evaRed: "#FF0000",
  evaPurple: "#660099",
  evaBg: "#0a0a0a",
  evaBlack: "#000000",
  white: "#FFFFFF",
  textPrimary: "#CCCCCC",
  textSecondary: "#999999",
  textMuted: "#666666",
  unit01: "#6A0572",
  unit02: "#FF0000",
  unit00: "#0000FF",
  unit03: "#00AA00",
  unit05: "#FF6600",
} as const;

export const tagMap: Record<string, string> = {
  frontend: "初号机·界面",
  backend: "MAGI核心",
  "ai/ml": "傀儡系统",
  devops: "NERV总部",
  design: "橙色图案",
  tutorial: "训练模拟",
  rust: "圣枪·Rust",
  thoughts: "LCL之海",
  animation: "AT力场",
  performance: "暴走模式",
};

export function getEvaTag(standardTag: string): string {
  return tagMap[standardTag] ?? standardTag;
}

export const magiBranches = {
  MELCHIOR: "技术分析",
  BALTHASAR: "思想随笔",
  CASPER: "项目实践",
} as const;

export type MagiBranch = keyof typeof magiBranches;
