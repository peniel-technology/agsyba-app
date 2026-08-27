import { create } from 'zustand';

import { motion } from '@/theme';

export type ToastTone = 'error' | 'info' | 'success';

export interface ToastInput {
  durationMs?: number;
  message: string;
  title: string;
  tone: ToastTone;
}

export interface ToastData extends ToastInput {
  durationMs: number;
  id: number;
}

interface ToastState {
  hideToast: () => void;
  showToast: (toast: ToastInput) => void;
  toast: ToastData | null;
}

let toastSequence = 0;

export const useToastStore = create<ToastState>((set) => ({
  hideToast: () => set({ toast: null }),
  showToast: (toast) =>
    set({
      toast: {
        ...toast,
        durationMs: toast.durationMs ?? motion.toastDurationMs,
        id: toastSequence++,
      },
    }),
  toast: null,
}));
