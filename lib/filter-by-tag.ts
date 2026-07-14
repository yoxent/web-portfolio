import type { Tag } from "@/content/types";

export type FilterValue = Tag | "All";

export function filterByTag<T extends { tags: Tag[] }>(
  items: T[],
  active: FilterValue,
): T[] {
  if (active === "All") return items;
  return items.filter((item) => item.tags.includes(active));
}
