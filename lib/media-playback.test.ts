import { describe, expect, it } from "vitest";
import { createMediaPlaybackController } from "./media-playback";

describe("media-playback", () => {
  it("tracks a single active media id", () => {
    const c = createMediaPlaybackController();
    expect(c.getActiveId()).toBeNull();
    c.requestPlay("mma");
    expect(c.getActiveId()).toBe("mma");
    c.requestPlay("sprint");
    expect(c.getActiveId()).toBe("sprint");
    c.notifyPaused("sprint");
    expect(c.getActiveId()).toBeNull();
  });

  it("ignores pause notifications for non-active ids", () => {
    const c = createMediaPlaybackController();
    c.requestPlay("mma");
    c.notifyPaused("sprint");
    expect(c.getActiveId()).toBe("mma");
  });

  it("notifies subscribers when the active id changes", () => {
    const c = createMediaPlaybackController();
    const seen: Array<string | null> = [];
    const unsub = c.subscribe((id) => seen.push(id));
    c.requestPlay("mma");
    c.requestPlay("sprint");
    unsub();
    c.requestPlay("mma");
    expect(seen).toEqual(["mma", "sprint"]);
  });
});
