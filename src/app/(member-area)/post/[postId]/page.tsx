"use client";

import Navbar from "@/app/(member-area)/post/[postId]/navbar";
import PostDetails from "@/app/(member-area)/post/[postId]/post-details";
import PageContainer from "@/components/page-container";
import Post from "@/components/post/post";
import { Id } from "@/convex/_generated/dataModel";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ postId: Id<"workouts"> }>;
}) {
  const { postId } = use(params);

  return (
    <Post workoutId={postId}>
      <PageContainer topNavbar={<Navbar />}>
        <PostDetails />
      </PageContainer>
    </Post>
  );
}
