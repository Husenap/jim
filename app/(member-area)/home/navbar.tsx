import { Button } from "@nextui-org/react";
import { Search } from "lucide-react";
import { Link } from "next-view-transitions";

export default function Navbar() {
  return (
    <div className="grid grid-cols-3 items-center py-3">
      <span className="col-start-2 text-center">Home</span>
      <div className="text-right">
        <Button as={Link} href="/home/search" variant="light" isIconOnly>
          <Search />
        </Button>
      </div>
    </div>
  );
}
