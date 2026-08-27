export type TabTransitionProgress = -1 | 1;

export interface TabTransition {
  fromKey: string;
  incomingStart: TabTransitionProgress;
  outgoingEnd: TabTransitionProgress;
  toKey: string;
}

export interface TabTransitionState {
  current: TabTransition | null;
  resetTimer: ReturnType<typeof setTimeout> | null;
}
