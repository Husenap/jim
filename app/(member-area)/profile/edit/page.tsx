"use client";

import Navbar from "@/app/(member-area)/profile/edit/navbar";
import PageContainer from "@/components/page-container";
import { TypographyH2 } from "@/components/typography";
import { api } from "@/convex/_generated/api";
import { UserProfile } from "@clerk/nextjs";
import { Button, Form, Input, Textarea } from "@heroui/react";
import { useMutation, useQuery } from "convex/react";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const user = useQuery(api.users.current);

  const [bio, setBio] = useState(user?.bio ?? "");
  const [link, setLink] = useState(user?.link ?? "");
  const [bodyweight, setBodyweight] = useState(user?.bodyweight ?? "");
  const updateProfile = useMutation(api.users.updateProfile);

  useEffect(() => {
    setBio(user?.bio ?? "");
    setLink(user?.link ?? "");
    setBodyweight(user?.bodyweight ?? "");
  }, [user]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const link = data.link === "" ? undefined : data.link.toString();
    const bio = data.bio === "" ? undefined : data.bio.toString();
    const bodyweight =
      data.bodyweight === ""
        ? undefined
        : parseFloat(data.bodyweight.toString());
    updateProfile({ link, bio, bodyweight });
  };

  return (
    <PageContainer topNavbar={<Navbar />}>
      <div className="flex w-full flex-col gap-2">
        <TypographyH2>Profile details</TypographyH2>

        <Form className="w-full" validationBehavior="aria" onSubmit={onSubmit}>
          <Textarea
            label="Bio"
            labelPlacement="outside"
            name="bio"
            placeholder="Describe yourself"
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            isDisabled={!user}
          />
          <Input
            label="Link"
            labelPlacement="outside"
            name="link"
            placeholder="example.com"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">https://</span>
              </div>
            }
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            isDisabled={!user}
          />
          <Input
            label="Bodyweight (hidden)"
            labelPlacement="outside"
            name="bodyweight"
            placeholder="Your bodyweight"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">kg</span>
              </div>
            }
            type="number"
            min={0}
            step={0.1}
            value={bodyweight.toString()}
            onChange={(e) => setBodyweight(e.target.value)}
            isDisabled={!user}
          />
          <Button
            isDisabled={
              (user?.link ?? "") === link &&
              (user?.bio ?? "") === bio &&
              (user?.bodyweight ?? "") === bodyweight
            }
            color="primary"
            type="submit"
          >
            Save
          </Button>
        </Form>

        <TypographyH2>Account details</TypographyH2>

        <UserProfile
          appearance={{
            elements: {
              rootBox: "w-full",
              cardBox: "max-w-none w-full h-auto",
            },
          }}
          routing="hash"
        />
      </div>
    </PageContainer>
  );
}
