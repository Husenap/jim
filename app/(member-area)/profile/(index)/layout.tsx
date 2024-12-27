import Navbar from "@/app/(member-area)/profile/(index)/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className="px-2 py-4">{children}</div>
    </div>
  );
}
