/**
 * Shared shape for the contact form. It lives outside the "use server" module
 * because those files may only export async functions.
 */
export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level messages, keyed by input name. */
  fieldErrors: Record<string, string>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};
