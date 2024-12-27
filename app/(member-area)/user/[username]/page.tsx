"use server";

import User from "@/components/user";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <div>
      <User username={username} />
    </div>
  );
}
