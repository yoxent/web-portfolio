import { describe, expect, it } from "vitest";
import { filterByTag } from "./filter-by-tag";
import type { Tag } from "@/content/types";

type Item = { id: string; tags: Tag[] };

const items: Item[] = [
  { id: "a", tags: ["Games"] },
  { id: "b", tags: ["Web", "AI"] },
  { id: "c", tags: ["Mobile"] },
];

describe("filterByTag", () => {
  it("returns all items when active is All", () => {
    expect(filterByTag(items, "All")).toHaveLength(3);
  });

  it("filters to items containing the tag", () => {
    expect(filterByTag(items, "Web").map((i) => i.id)).toEqual(["b"]);
    expect(filterByTag(items, "Games").map((i) => i.id)).toEqual(["a"]);
  });
});
