export type MediaPlaybackListener = (activeId: string | null) => void;

export function createMediaPlaybackController() {
  let activeId: string | null = null;
  const listeners = new Set<MediaPlaybackListener>();

  function emit() {
    for (const listener of listeners) listener(activeId);
  }

  return {
    getActiveId() {
      return activeId;
    },
    requestPlay(id: string) {
      if (activeId === id) return;
      activeId = id;
      emit();
    },
    notifyPaused(id: string) {
      if (activeId !== id) return;
      activeId = null;
      emit();
    },
    subscribe(listener: MediaPlaybackListener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

export type MediaPlaybackController = ReturnType<typeof createMediaPlaybackController>;

/** Shared singleton for site-wide single playback */
export const mediaPlayback = createMediaPlaybackController();
