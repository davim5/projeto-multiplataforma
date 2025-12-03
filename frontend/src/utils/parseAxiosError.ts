import axios from "axios";

export function parseAxiosError(err: unknown, fallback: string) {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.error || fallback;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return fallback;
}
