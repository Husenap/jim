import BackButton from "@/components/back-button";
import DrawerPageContainer from "@/components/drawer-page-container";
import { usePostContext } from "@/components/post/post-context";
import WorkoutTitleDescription from "@/components/workout/workout-title-description";
import WorkoutUser from "@/components/workout/workout-user";
import { humanReadableTimeDiff } from "@/utils/time-diff";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  DrawerContent,
  Textarea,
} from "@heroui/react";
import { useState } from "react";

function CommentsTopNavbar() {
  const { commentsDisclosure } = usePostContext();
  return (
    <div className="grid grid-cols-3 items-center py-3">
      <BackButton onPress={commentsDisclosure.onClose} />
      <span className="text-center text-sm">{"Comments"}</span>
    </div>
  );
}

function CommentsBottomNavbar() {
  const { addComment } = usePostContext();
  const [text, setText] = useState("");
  return (
    <div className="flex flex-row items-center gap-2 py-3">
      <Textarea
        isMultiline
        minRows={1}
        placeholder="Write a comment..."
        value={text}
        onValueChange={setText}
      />
      <Button
        color="primary"
        variant="light"
        onPress={() => {
          const trimmedText = text.trim();
          trimmedText.length > 0 && addComment && addComment(trimmedText);
          setText("");
        }}
      >
        Post
      </Button>
    </div>
  );
}

export default function WorkoutCommentsDrawer() {
  const { workout, commentsDisclosure } = usePostContext();
  if (!workout) return <></>;
  return (
    <Drawer
      placement="right"
      hideCloseButton
      size="full"
      isOpen={commentsDisclosure.isOpen}
      onOpenChange={commentsDisclosure.onOpenChange}
    >
      <DrawerContent>
        {(onClose) => (
          <DrawerPageContainer
            topNavbar={<CommentsTopNavbar />}
            bottomNavbar={<CommentsBottomNavbar />}
          >
            <div className="flex w-full flex-row">
              <WorkoutUser />
            </div>
            <WorkoutTitleDescription />
            <div className="-mx-2">
              <Divider />
            </div>
            <div className="flex flex-col gap-4">
              {workout.comments.map((comment) => (
                <div key={comment._id} className="flex flex-row gap-2">
                  <Avatar size="md" src={comment.author.imageURL} />
                  <div className="flex flex-1 flex-col">
                    <div className="flex w-full flex-row items-center justify-between">
                      <span className="font-semibold">
                        {comment.author.name}
                      </span>
                      <span className="text-foreground/70 text-sm">
                        {humanReadableTimeDiff({
                          startTime: comment._creationTime,
                        })}
                      </span>
                    </div>
                    <span>{comment.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </DrawerPageContainer>
        )}
      </DrawerContent>
    </Drawer>
  );
}
