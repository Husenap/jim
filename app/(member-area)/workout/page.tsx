import BottomNavbar from "@/app/(member-area)/bottom-navbar";
import PageContainer from "@/components/page-container";

export default function Page() {
  return (
    <PageContainer bottomNavbar={<BottomNavbar />}>
      <h1>Workout page</h1>
    </PageContainer>
  );
}
