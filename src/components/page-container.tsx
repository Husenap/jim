import React from "react";

export default function PageContainer({
  children,
  topNavbar,
  bottomNavbar,
  disableViewTransitions,
}: {
  children?: React.ReactNode;
  topNavbar?: React.ReactNode;
  bottomNavbar?: React.ReactNode;
  disableViewTransitions?: boolean;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center">
      {topNavbar && (
        <nav className="invisible w-full">
          <div className="flex w-full justify-center px-2">
            <div className="w-full max-w-5xl">{topNavbar}</div>
          </div>
        </nav>
      )}
      {topNavbar && (
        <nav
          className="bg-content2/70 fixed top-0 right-0 left-0 z-50 backdrop-blur-lg"
          style={
            disableViewTransitions
              ? undefined
              : {
                  viewTransitionName: "jim-top-navbar",
                }
          }
        >
          <div
            className="from-content2 flex w-full justify-center bg-linear-to-b to-transparent px-2"
            style={
              disableViewTransitions
                ? undefined
                : {
                    viewTransitionName: "jim-top-navbar-gradient",
                  }
            }
          >
            <div
              className="w-full max-w-5xl"
              style={
                disableViewTransitions
                  ? undefined
                  : {
                      viewTransitionName: "jim-top-navbar-wrapper",
                    }
              }
            >
              {topNavbar}
            </div>
          </div>
        </nav>
      )}

      <main
        className="flex w-full flex-1 justify-center overflow-x-hidden overscroll-x-none px-2 py-4"
        style={
          disableViewTransitions
            ? undefined
            : {
                viewTransitionName: "jim-main-content",
              }
        }
      >
        <div className="flex w-full max-w-5xl flex-col gap-2">{children}</div>
      </main>

      <div className="iphone-safe-inset w-full">
        {bottomNavbar && (
          <nav className="invisible w-full">
            <div className="flex w-full justify-center">
              <div className="w-full max-w-5xl">{bottomNavbar}</div>
            </div>
          </nav>
        )}
      </div>
      {bottomNavbar && (
        <nav
          className="bg-content2/70 fixed right-0 bottom-0 left-0 z-50 w-full rounded-t-xl backdrop-blur-lg"
          style={
            disableViewTransitions
              ? undefined
              : {
                  viewTransitionName: "jim-bottom-navbar",
                }
          }
        >
          <div className="iphone-safe-inset from-content2 flex w-full justify-center bg-linear-to-t to-transparent">
            <div className="w-full max-w-5xl">{bottomNavbar}</div>
          </div>
        </nav>
      )}
    </div>
  );
}
