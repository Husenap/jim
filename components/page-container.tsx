import React from "react";

export default function PageContainer({
  children,
  topNavbar,
  bottomNavbar,
}: {
  children?: React.ReactNode;
  topNavbar?: React.ReactNode;
  bottomNavbar?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center">
      {topNavbar && (
        <nav className="sticky top-0 z-50 flex justify-center bg-content2/70 backdrop-blur-lg">
          <div className="w-full bg-gradient-to-b from-content2 to-transparent px-2">
            <div className="w-full max-w-5xl">{topNavbar}</div>
          </div>
        </nav>
      )}
      <main className="flex w-full flex-1 justify-center px-2 py-4">
        <div className="flex w-full max-w-5xl flex-col gap-2">{children}</div>
      </main>
      {bottomNavbar && (
        <nav className="sticky bottom-0 z-50 flex justify-center rounded-t-xl bg-content2/70 backdrop-blur-lg">
          <div className="w-full bg-gradient-to-t from-content2 to-transparent">
            <div className="w-full max-w-5xl">{bottomNavbar}</div>
          </div>
        </nav>
      )}
    </div>
  );
}
