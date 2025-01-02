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
        <nav className="invisible w-full">
          <div className="flex w-full justify-center px-2">
            <div className="w-full max-w-5xl">{topNavbar}</div>
          </div>
        </nav>
      )}
      {topNavbar && (
        <nav
          className="fixed top-0 z-50 w-full bg-content2/70 backdrop-blur-lg"
          style={{
            viewTransitionName: "jim-top-navbar",
          }}
        >
          <div className="flex w-full justify-center bg-gradient-to-b from-content2 to-transparent px-2">
            <div className="w-full max-w-5xl">{topNavbar}</div>
          </div>
        </nav>
      )}

      <main
        className="flex w-full flex-1 justify-center px-2 py-4"
        style={{
          viewTransitionName: "jim-main-content",
        }}
      >
        <div className="flex w-full max-w-5xl flex-col gap-2">{children}</div>
      </main>

      <div className="iphone-safe-inset">
        {bottomNavbar && (
          <nav className="invisible w-full">
            <div className="flex w-full justify-center">
              <div className="w-full max-w-5xl">{bottomNavbar}</div>
            </div>
          </nav>
        )}
        {bottomNavbar && (
          <nav
            className="fixed bottom-0 z-50 w-full rounded-t-xl bg-content2/70 backdrop-blur-lg"
            style={{
              viewTransitionName: "jim-bottom-navbar",
            }}
          >
            <div className="flex w-full justify-center bg-gradient-to-t from-content2 to-transparent">
              <div className="w-full max-w-5xl">{bottomNavbar}</div>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
