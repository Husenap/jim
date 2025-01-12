import BackButton from "@/components/back-button";

export default function CreateExerciseNavbar({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <>
      <div className="grid grid-cols-4 items-center py-3">
        <BackButton onPress={onClose} />
        <span className="col-span-2 text-center text-sm">
          {"Create Exercise"}
        </span>
      </div>
    </>
  );
}
