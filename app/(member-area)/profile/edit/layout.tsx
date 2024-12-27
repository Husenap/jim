import Navbar from "@/app/(member-area)/profile/edit/navbar";

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
