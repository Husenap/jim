import { usePostContext } from "@/components/post/post-context";
import { TypographyH1, TypographyH2 } from "@/components/typography";
import { Link } from "@heroui/react";
import { ReactNode, useMemo } from "react";

export default function WorkoutTitleDescription() {
  const { workout } = usePostContext();

  const descriptionWithMentions = useMemo<(string | ReactNode)[]>(() => {
    if (!workout || !workout.description) return [];

    const re = /@([a-zA-Z0-9_-]+)/g;

    const matches = [...workout.description.matchAll(re)];
    const result = [];

    let previousIndex = 0;
    for (const match of matches) {
      result.push(match.input.slice(previousIndex, match.index));
      result.push(
        <Link className="text-lg" href={`/user/${match[1]}`}>
          {match[0]}
        </Link>,
      );
      previousIndex = match.index + match[0].length;
    }
    if (previousIndex < workout.description.length) {
      result.push(workout.description.slice(previousIndex));
    }

    return result;
  }, [workout]);

  if (!workout) return <></>;

  return (
    <div>
      <TypographyH1>{workout.title}</TypographyH1>
      {descriptionWithMentions.length > 0 && (
        <TypographyH2>{...descriptionWithMentions}</TypographyH2>
      )}
    </div>
  );
}
