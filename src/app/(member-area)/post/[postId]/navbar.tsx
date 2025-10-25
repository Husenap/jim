import BackButton from "@/components/back-button";

export default function Navbar() {
  return (
    <div className="grid grid-cols-3 items-center gap-2 py-3">
      <BackButton />

      <span className="text-center">Workout Details</span>
    </div>
  );
}
