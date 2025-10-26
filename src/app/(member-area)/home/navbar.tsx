import type { Selection } from "@heroui/react";
import { Button, Select, SelectItem } from "@heroui/react";
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
      <Select
        selectedKeys={page}
        onSelectionChange={(s) => Array.from(s).length !== 0 && setPage(s)}
        aria-label="Feed selection"
        defaultSelectedKeys={["home"]}
      >
        <SelectItem key="home">Home</SelectItem>
        <SelectItem key="discovery">Discover</SelectItem>
      </Select>
      <div className="col-start-4 text-right">
        <Button as={Link} href="/home/search" variant="light" isIconOnly>
          <Search />
        </Button>
      </div>
    </div>
  );
}
