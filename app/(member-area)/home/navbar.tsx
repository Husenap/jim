import type { Selection } from "@nextui-org/react";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { Search } from "lucide-react";
import { Link } from "next-view-transitions";

export default function Navbar({
  page,
  setPage,
}: {
  page: Selection;
  setPage: (s: Selection) => void;
}) {
  return (
    <div className="grid grid-cols-3 items-center py-3">
      <Select selectedKeys={page} onSelectionChange={setPage}>
        <SelectItem key="home">Home</SelectItem>
        <SelectItem key="discovery">Discovery</SelectItem>
      </Select>
      <div className="col-start-4 text-right">
        <Button as={Link} href="/home/search" variant="light" isIconOnly>
          <Search />
        </Button>
      </div>
    </div>
  );
}
