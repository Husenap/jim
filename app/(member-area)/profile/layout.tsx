import Navbar from "@/app/(member-area)/profile/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className="p-2">{children}</div>
    </div>
  );
}
