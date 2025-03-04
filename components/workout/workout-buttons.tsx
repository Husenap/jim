import { usePostContext } from "@/components/post/post-context";
import ShareButton from "@/components/share-button";
import { zap } from "@/utils/vibration";
import { Button, cn } from "@heroui/react";
import { MessageCircle, ThumbsUp } from "lucide-react";

export default function WorkoutButtons() {
  const { workout, user, toggleLike, commentsDisclosure, currentUser } =
    usePostContext();

  if (!workout) return <></>;

  return (
    <div className="grid w-full grid-cols-3 gap-2">
      <Button
        isIconOnly
        className="w-full"
        size="sm"
        variant="light"
        onPress={() => {
          zap();
          toggleLike();
        }}
      >
        <ThumbsUp
          className={cn({
            "text-primary": workout.likers.some(
              (l) => l._id === currentUser?._id,
            ),
          })}
        />
      </Button>
      <Button
        isIconOnly
        className="w-full"
        size="sm"
        variant="light"
        onPress={commentsDisclosure.onOpen}
      >
        <MessageCircle />
      </Button>
      <ShareButton
        className="w-full"
        size="sm"
        data={{
          title: `${user?.name}'s workout: ${workout.title}`,
          text: workout.description,
          url: `/post/${workout._id}`,
        }}
      />
    </div>
  );
}
