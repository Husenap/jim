import { Spinner } from "@nextui-org/react";

export default function FullscreenSpinner({ label }: { label?: string }) {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <Spinner color="primary" label={label ?? "Loading..."} size="lg" />
    </div>
  );
}
