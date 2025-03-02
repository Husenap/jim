import { usePostContext } from "@/components/post/post-context";
import { TypographyH1, TypographyH2 } from "@/components/typography";

export default function WorkoutTitleDescription() {
  const { workout } = usePostContext();

  if (!workout) return <></>;

  return (
    <div>
      <TypographyH1>{workout.title}</TypographyH1>
      <TypographyH2>{workout.description}</TypographyH2>
    </div>
  );
}
