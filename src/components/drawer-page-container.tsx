import React from "react";

export default function DrawerPageContainer({
  children,
  topNavbar,
  bottomNavbar,
}: {
  children?: React.ReactNode;
  topNavbar?: React.ReactNode;
  bottomNavbar?: React.ReactNode;
}) {
  return (
    <div className="flex h-full max-h-full min-h-full flex-1 flex-col items-center">
      {topNavbar && (
        <nav className="flex w-full justify-center bg-content2 px-2">
          <div className="w-full max-w-5xl">{topNavbar}</div>
        </nav>
      )}

      <main className="flex w-full flex-1 justify-center overflow-y-auto overflow-x-hidden overscroll-x-none px-2 py-4">
        <div className="flex w-full max-w-5xl flex-col gap-2">{children}</div>
      </main>

      {bottomNavbar ? (
        <nav className="iphone-safe-inset flex w-full justify-center bg-content2 px-2">
          <div className="w-full max-w-5xl">{bottomNavbar}</div>
        </nav>
      ) : (
        <div className="iphone-safe-inset w-full"></div>
      )}
    </div>
  );
}
