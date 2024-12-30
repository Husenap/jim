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
    <div className="flex min-h-full flex-1 flex-col">
      {topNavbar && (
        <nav className="sticky top-0 z-50 bg-content2/70 backdrop-blur-lg">
          {topNavbar}
        </nav>
      )}
      <main className="flex flex-1 flex-col gap-2 px-2 py-4">{children}</main>
      {bottomNavbar && (
        <nav className="sticky bottom-0 z-50 rounded-t-xl bg-content2/70 backdrop-blur-lg">
          {bottomNavbar}
        </nav>
      )}
    </div>
  );
}
