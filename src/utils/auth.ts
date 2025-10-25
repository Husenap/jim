import { auth } from "@clerk/nextjs/server";

export async function getAuthToken() {
  const { getToken } = await auth()
  return getToken({ template: "convex" }) ?? undefined;
}