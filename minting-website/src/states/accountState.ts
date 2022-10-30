import { atom } from 'recoil';

export const addressState = atom<string | null>({
    key: 'address',
    default: null,
  });

  export const balanceState = atom<number | null>({
    key: 'balance',
    default: 0,
  });

  export const networkState = atom<string | null>({
    key: 'network',
    default: 'disconnected',
  });

  export const connectionState = atom<boolean>({
    key: 'isConnected',
    default: false,
  });
  
  export const ddExpansionState = atom<boolean>({
    key: 'isDropdownExpanded',
    default: false,
  });