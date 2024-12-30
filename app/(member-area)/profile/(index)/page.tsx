"use client";

import BottomNavbar from "@/app/(member-area)/bottom-navbar";
import Navbar from "@/app/(member-area)/profile/(index)/navbar";
import PageContainer from "@/components/page-container";
import {
  TypographyH1,
  TypographyH2,
  TypographyH4,
} from "@/components/typography";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import humanReadibleTimeDiff from "@/utils/time-diff";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Skeleton,
  User,
} from "@nextui-org/react";
import { useQuery } from "convex/react";
import {
  Calendar,
  ChartLine,
  Dumbbell,
  MessageCircle,
  PersonStanding,
  Share,
  ThumbsUp,
} from "lucide-react";

export default function Page() {
  const user = useQuery(api.users.current);

  return (
    <PageContainer topNavbar={<Navbar />} bottomNavbar={<BottomNavbar />}>
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

      <TypographyH2>Dashboard</TypographyH2>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        <Button className="under-construction" startContent={<ChartLine />}>
          Statistics
        </Button>
        <Button as={Link} href="/profile/exercises" startContent={<Dumbbell />}>
          Exercises
        </Button>
        <Button
          className="under-construction"
          startContent={<PersonStanding />}
        >
          Measures
        </Button>
        <Button className="under-construction" startContent={<Calendar />}>
          Calendar
        </Button>
      </div>

      <TypographyH2>Workouts</TypographyH2>
      <div className="-mx-2 flex flex-col gap-4">
        <Card radius="none">
          <CardHeader>
            <User
              avatarProps={{
                src: user?.imageURL,
              }}
              name={user?.name || user?.username}
              description={humanReadibleTimeDiff(user?._creationTime)}
            />
          </CardHeader>
          <Divider />
          <CardBody>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
            incidunt quod harum quia at quo ut magni recusandae necessitatibus
            quidem. Beatae nostrum delectus excepturi. Laboriosam, iusto sed.
            Corporis, beatae at.
          </CardBody>
          <Divider />
          <CardFooter className="grid grid-cols-3 gap-2">
            <Button isIconOnly className="w-full" size="sm" variant="light">
              <ThumbsUp />
            </Button>
            <Button isIconOnly className="w-full" size="sm" variant="light">
              <MessageCircle />
            </Button>
            <Button isIconOnly className="w-full" size="sm" variant="light">
              <Share />
            </Button>
          </CardFooter>
        </Card>
        <Card radius="none">
          <CardHeader>
            <User
              avatarProps={{
                src: user?.imageURL,
              }}
              name={user?.name || user?.username}
              description={humanReadibleTimeDiff(user?._creationTime)}
            />
          </CardHeader>
          <Divider />
          <CardBody>
            Modi assumenda ea cumque explicabo odio aperiam ut sit fuga
            doloremque magni fugit praesentium deserunt cum, blanditiis rem
            asperiores porro maiores. Soluta reiciendis ad quasi deleniti
            doloremque necessitatibus saepe non!
          </CardBody>
          <Divider />
          <CardFooter className="grid grid-cols-3 gap-2">
            <Button isIconOnly className="w-full" size="sm" variant="light">
              <ThumbsUp />
            </Button>
            <Button isIconOnly className="w-full" size="sm" variant="light">
              <MessageCircle />
            </Button>
            <Button isIconOnly className="w-full" size="sm" variant="light">
              <Share />
            </Button>
          </CardFooter>
        </Card>
      </div>
      <span>
        Modi assumenda ea cumque explicabo odio aperiam ut sit fuga doloremque
        magni fugit praesentium deserunt cum, blanditiis rem asperiores porro
        maiores. Soluta reiciendis ad quasi deleniti doloremque necessitatibus
        saepe non!
      </span>
      <span>
        Suscipit atque deleniti tenetur ipsa! Est saepe adipisci debitis itaque,
        vero eveniet odio sunt suscipit reiciendis accusamus dolorem explicabo
        provident eos. Laborum dolorum ab dolore doloremque minima incidunt ad
        pariatur.
      </span>
      <span>
        Obcaecati recusandae, modi rem aliquam fugiat consequuntur nisi rerum,
        officia minus eligendi vel, exercitationem earum aliquid doloribus
        deleniti sequi neque quia quas nulla voluptatibus et. Sed delectus
        aliquid voluptatem eius.
      </span>
      <span>
        Quo accusantium commodi sunt? Asperiores itaque expedita perferendis aut
        placeat officia minima autem est earum labore! Nihil ratione quis ea
        neque blanditiis cupiditate. Animi eveniet quae quia fugit, sint harum?
      </span>
      <span>
        In dignissimos officia obcaecati sint esse consequuntur ea maiores
        voluptate quo, accusantium beatae ab distinctio sapiente id error
        molestiae veniam. Velit deserunt nobis qui culpa? Id quis sunt nam
        officiis.
      </span>
      <span>
        Fuga nulla, asperiores dolorum necessitatibus expedita impedit modi
        eveniet omnis quidem consequatur sint laudantium neque commodi
        laboriosam doloribus veniam dolorem vero inventore consectetur totam
        sequi iusto distinctio cupiditate nesciunt. Voluptatem.
      </span>
      <span>
        Est nesciunt modi, ad dignissimos reprehenderit sapiente quo. Labore eos
        quia quasi perspiciatis cupiditate debitis voluptate suscipit voluptatum
        repellendus illum reprehenderit quod aliquam hic qui facere, ex
        explicabo in! Nobis?
      </span>
      <span>
        Sed molestiae minus consequatur enim dolores saepe quos, omnis laborum,
        officiis ipsa, laboriosam magnam tempore deserunt vitae quidem
        aspernatur corporis in nam doloremque possimus libero. Suscipit magni
        consequatur ratione magnam.
      </span>
      <span>
        Accusantium fugit voluptatum nostrum, odio aliquam numquam labore
        cupiditate iste doloribus perferendis corrupti obcaecati itaque libero
        natus dolorum, eligendi vero reiciendis vitae veniam culpa voluptatibus.
        Iure voluptatibus laborum enim fuga?
      </span>
      <span>
        Veniam autem iste nobis ipsam accusamus sint nesciunt quae quasi, eaque
        eveniet obcaecati laborum aperiam praesentium soluta dolor omnis ut
        beatae, quisquam debitis rerum alias harum rem. Officiis, dolores aut.
      </span>
      <span>
        Delectus aliquid unde pariatur aspernatur eaque laudantium maiores illo
        quod veritatis architecto in dignissimos repellat, eum ut error
        inventore dolor ex et, quos vitae molestiae magnam. Similique beatae
        molestias quos?
      </span>
      <span>
        Doloribus doloremque autem ullam, dignissimos animi sapiente ea
        laboriosam ipsa eum dolores, possimus deleniti tempore eaque. Ipsum
        exercitationem mollitia dolor recusandae deserunt. Impedit adipisci
        molestias laboriosam expedita, iste aut? Tempora!
      </span>
      <span>
        Quam veritatis commodi quidem praesentium, molestias enim repudiandae
        eius temporibus architecto voluptatibus et minus consequatur
        exercitationem iure eos deserunt perferendis velit dignissimos quis
        harum ex nostrum recusandae. Incidunt, vel. Natus?
      </span>
      <span>
        Maiores quia incidunt amet mollitia quaerat possimus assumenda, nobis
        fuga omnis eius quod quasi sequi animi, sint id eaque sed perferendis
        repellat odio vitae. Temporibus perspiciatis tenetur placeat ut tempore.
      </span>
      <span>
        Quo magnam molestiae vero ad temporibus. Non tenetur ut ratione eaque
        voluptates placeat, cum mollitia exercitationem culpa libero alias
        quisquam dolore dolorem pariatur eius consequuntur voluptatum vel,
        eligendi temporibus repellendus!
      </span>
      <span>
        Accusantium voluptatem aliquam, dolorum ratione, velit aliquid nostrum
        provident, quibusdam deleniti deserunt similique saepe ex illo autem!
        Laborum unde obcaecati aut dolore animi repudiandae! Totam laborum earum
        unde voluptatibus quidem.
      </span>
      <span>
        Voluptas error dolorem consectetur, in, incidunt culpa assumenda
        dignissimos praesentium saepe quod at? Magni aliquam necessitatibus
        dignissimos reiciendis rerum quaerat mollitia ab, maxime in quidem
        nesciunt sed quis quia doloremque.
      </span>
      <span>
        Dicta esse qui, cum expedita odit deserunt quisquam tempore rerum id
        voluptas itaque accusantium sapiente repudiandae soluta omnis, quis aut
        ex harum natus voluptatem accusamus alias molestiae nesciunt. Cumque,
        eos?
      </span>
      <span>
        Quam non optio reprehenderit distinctio dicta doloremque doloribus sit
        sed, quibusdam quo architecto nisi, perferendis placeat ullam eos
        incidunt assumenda? Praesentium quae sed hic dicta? Suscipit reiciendis
        excepturi expedita praesentium!
      </span>
    </PageContainer>
  );
}

function UserData({ user }: { user: Doc<"users"> }) {
  return (
    <div className="flex w-full flex-row items-center gap-4">
      <Avatar src={user.imageURL} className="h-20 w-20" />
      <div className="flex flex-1 flex-col">
        <TypographyH1>{user.name}</TypographyH1>
        <div className="under-construction grid w-full grid-cols-3">
          <div className="flex flex-col">
            <TypographyH4>Workouts</TypographyH4>
            <span>81</span>
          </div>
          <div className="flex flex-col">
            <TypographyH4>Followers</TypographyH4>
            <span>11</span>
          </div>
          <div className="flex flex-col">
            <TypographyH4>Following</TypographyH4>
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
