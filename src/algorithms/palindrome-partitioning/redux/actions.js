export type Action = { type: string, payload?: number | string };

// Underscores vs. hyphens
export const BUTTON_CLICK: string = "PALINDROME_PARTITIONING_BUTTON_CLICK";
export const OPEN_MODAL_CLICK: string =
  "PALINDROME_PARTITIONING_OPEN_MODAL_CLICK";
export const CLOSE_MODAL_CLICK: string =
  "PALINDROME_PARTITIONING_CLOSE_MODAL_CLICK";
export const REFRESH_DATA_CLICK: string =
  "PALINDROME_PARTITIONING_REFRESH_CLICK";

export const refreshData = (): Action => ({ type: REFRESH_DATA_CLICK });
export const closeModal = (): Action => ({ type: CLOSE_MODAL_CLICK });
export const openModal = (): Action => ({ type: OPEN_MODAL_CLICK });
export const buttonClick = (value: number | string): Action => ({
  type: BUTTON_CLICK,
  payload: value
});
