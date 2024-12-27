"use client";

import { api } from "@/convex/_generated/api";
import { UserProfile } from "@clerk/nextjs";
import { Button, Form, Input, Textarea } from "@nextui-org/react";
import { useMutation, useQuery } from "convex/react";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const user = useQuery(api.users.current);

  const [bio, setBio] = useState(user?.bio ?? "");
  const [link, setLink] = useState(user?.link ?? "");
  const updateProfile = useMutation(api.users.updateProfile);

  useEffect(() => {
    setBio(user?.bio ?? "");
    setLink(user?.link ?? "");
  }, [user]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.link === "") delete data.link;
    if (data.bio === "") delete data.bio;
    updateProfile(data);
  };

  return (
    <>
      <div className="prose dark:prose-invert flex w-full flex-col">
        <h2>Profile details</h2>

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
          <Button
            isDisabled={
              (user?.link ?? "") === link && (user?.bio ?? "") === bio
            }
            color="primary"
            type="submit"
          >
            Save
          </Button>
        </Form>

        <h2>Account details</h2>

        <div className="not-prose">
          <UserProfile
            appearance={{
              elements: {
                rootBox: "w-full",
                cardBox: "w-full h-auto",
              },
            }}
            routing="hash"
          />
        </div>
      </div>
    </>
  );
}
