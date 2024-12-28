import BackButton from "@/components/back-button";

export default function Navbar() {
  return (
    <>
      <div className="grid grid-cols-3 items-center p-3">
        <BackButton />
        <span className="text-center">Create Exercise</span>
      </div>
    </>
  );
}
