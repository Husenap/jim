"use client";

import Navbar from "@/app/(member-area)/profile/(index)/navbar";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Avatar, Button, Link, Skeleton } from "@nextui-org/react";
import { useQuery } from "convex/react";
import { Calendar, ChartLine, Dumbbell, PersonStanding } from "lucide-react";

export default function Page() {
  const user = useQuery(api.users.current);

  return (
    <div>
      <Navbar />
      <div className="flex w-full flex-col gap-2 px-2 py-4">
        {user ? <UserData user={user} /> : <UserDataSkeleton />}
        {user?.bio && (
          <p className="my-prose">
            {user.bio.split("\n").map((text, i) => (
              <span key={i}>
                {text}
                <br />
              </span>
            ))}
          </p>
        )}
        {user?.link && (
          <Link isExternal href={`https://${user.link}`}>
            {user.link}
          </Link>
        )}
        <div className="py-2">
          <h3 className="text-default-400">Dashboard</h3>
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <Button startContent={<ChartLine />}>Statistics</Button>
            <Button
              as={Link}
              href="/profile/exercises"
              startContent={<Dumbbell />}
            >
              Exercises
            </Button>
            <Button startContent={<PersonStanding />}>Measures</Button>
            <Button startContent={<Calendar />}>Calendar</Button>
          </div>
        </div>
      </div>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio nulla
      asperiores molestias omnis aliquid. Amet non obcaecati blanditiis?
      Quaerat, accusantium reiciendis vero earum architecto vel ad consectetur
      modi harum id. Nemo dignissimos similique deleniti quae voluptates aut
      molestias debitis, illum vero repellat ullam aliquam est nihil voluptas
      reprehenderit exercitationem quam quas recusandae placeat iure. Impedit
      obcaecati doloremque error et voluptate. Provident aut, dolore eum vitae
      accusantium earum repudiandae eveniet consequuntur voluptatibus veritatis
      voluptatem enim itaque tenetur excepturi iure nesciunt veniam facilis
      dicta nam, quisquam repellendus? Quod unde quia consequuntur quis! Quo
      repellat harum deserunt labore molestias? Consequatur dignissimos, dolore
      quas fugit adipisci saepe illum quibusdam mollitia ex quasi provident?
      Nostrum magni iste nemo deserunt, quisquam ad iure culpa dolorem mollitia!
      Fugit ipsum vel blanditiis necessitatibus omnis? Placeat aspernatur,
      cupiditate molestias amet provident magnam, ullam fuga, aperiam in nisi
      exercitationem reprehenderit repudiandae tenetur inventore possimus
      consequuntur reiciendis veniam. Eum, iusto delectus. Ipsam voluptas
      dolores fugit alias sequi consectetur iste minus quibusdam, perferendis
      libero numquam itaque molestiae cum repellat aspernatur vitae. Aspernatur
      molestias amet magni minima nostrum iusto aliquid magnam similique a. Iste
      doloribus ab veritatis ipsam saepe. Magnam molestias facere quam veniam
      suscipit aperiam aliquid qui voluptatem ipsum quibusdam? Natus corrupti
      hic non? Praesentium facilis voluptas aliquam, voluptates ea minus
      distinctio! Delectus atque magni hic amet odit doloribus. Non commodi
      sapiente velit, nobis ut rerum! Alias vero unde tempora fugit aliquam.
      Omnis laudantium illo, doloremque atque magnam provident dolore cumque
      necessitatibus? Vel, perspiciatis. Eaque cupiditate nisi reiciendis
      cumque. Libero voluptatum minima odio. Vero commodi alias nulla numquam at
      eius rerum, consectetur tempore dolores, est, deserunt recusandae qui
      repellat delectus debitis odit. Incidunt, eum id optio dignissimos totam
      eveniet repellendus delectus necessitatibus fuga est rerum error ea qui
      voluptatem facere magni? Aspernatur dignissimos nobis pariatur eius minima
      modi saepe amet quaerat corporis. A mollitia aperiam doloribus, non
      possimus ipsam ad perferendis maiores temporibus minima tenetur quidem
      maxime. Similique praesentium, nobis consectetur perferendis dolores nulla
      beatae reprehenderit sequi, blanditiis unde, id cum modi. Maxime deserunt
      alias nulla tenetur nemo labore, id itaque? Cumque voluptates nisi aliquid
      soluta aspernatur eaque officiis magni? Expedita culpa nisi aperiam
      cupiditate incidunt explicabo ipsum dolor non facilis vero? Reprehenderit
      nisi saepe ipsa nobis consequuntur quas facilis nulla, praesentium quasi
      voluptatibus, quaerat fuga libero, incidunt qui cupiditate dolorum iure
      earum natus atque suscipit. Dolorum deserunt pariatur tempora doloremque
      veniam. Modi possimus, iste sint libero quaerat ab? Ipsa quam corrupti
      quisquam voluptatem quis tempora recusandae numquam illum minima id atque,
      amet odio eius saepe. Fugit iure non ex aperiam a. Nostrum saepe
      cupiditate ad tempora fuga distinctio dolore sunt veritatis delectus
      soluta rem ut magni, perferendis consequuntur, obcaecati excepturi impedit
      laudantium doloremque quidem deleniti illum? Autem sed reprehenderit minus
      quae! Optio dignissimos dicta non nulla cumque iusto itaque asperiores
      animi eius eos, quam ullam necessitatibus reiciendis officiis
      reprehenderit natus sunt sequi. Enim vel blanditiis exercitationem
      architecto eaque, ab provident. Fugiat! Assumenda accusantium velit
      explicabo omnis iusto doloribus. Nisi, id. Odit itaque repellendus eius
      autem voluptatem distinctio esse harum vero! Aliquam totam corporis eum?
      Sed deserunt cupiditate fugiat optio maiores at? Necessitatibus,
      voluptatibus repellat? Quod, nisi sit hic, excepturi odio non explicabo
      est vel laborum mollitia, quos suscipit aliquid similique. Ullam sunt quia
      harum repellendus. Dolorem odit dolor commodi error asperiores. Sit
      quibusdam quas iusto laboriosam delectus itaque omnis, veritatis
      consectetur doloribus odio tenetur ut distinctio mollitia quam quia quod
      beatae maiores iure architecto perspiciatis possimus nobis. Nam, fugiat
      unde. Exercitationem. Odit explicabo dolorum unde sit ipsam officia
      repellat voluptas corrupti pariatur a, corporis ea quam nulla reiciendis,
      vitae eaque necessitatibus ipsum, veritatis numquam placeat aliquid amet
      excepturi. Veritatis, nisi earum.
    </div>
  );
}

function UserData({ user }: { user: Doc<"users"> }) {
  return (
    <div className="flex w-full flex-row items-center gap-4">
      <Avatar src={user.imageURL} className="h-20 w-20" />
      <div className="flex flex-1 flex-col">
        <h2 className="text-lg">{user.name}</h2>
        <div className="grid w-full grid-cols-3">
          <div className="flex flex-col">
            <span className="text-sm text-default-400">Workouts</span>
            <span>81</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-default-400">Followers</span>
            <span>11</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-default-400">Following</span>
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserDataSkeleton() {
  return (
    <div className="inline-flex items-center gap-2">
      <div>
        <Skeleton className="flex h-20 w-20 rounded-full" />
      </div>
    </div>
  );
}
