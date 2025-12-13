"use client";

import { api } from "@/convex/_generated/api";
import { useQueryWithStatus } from "@/utils/use-query-with-status";
import {
  FreeSoloPopover,
  Listbox,
  ListboxItem,
  ScrollShadow,
  Textarea,
  TextAreaProps,
  User,
} from "@heroui/react";
import { AnimatePresence } from "framer-motion";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";

const reMentionAtEnd = /@([a-zA-Z0-9_-]*)$/;

export default function TextareaWithMentions(props: TextAreaProps) {
  const value = useMemo(() => {
    return props.value ?? "";
  }, [props.value]);

  const currentMatch = useMemo(() => {
    return value.match(reMentionAtEnd);
  }, [value]);

  const { data: rawUsers } = useQueryWithStatus(api.users.search, {
    search: currentMatch?.[1] ?? "",
  });
  const [users, setUsers] = useState<NonNullable<typeof rawUsers>>([]);
  useEffect(() => {
    if (rawUsers) {
      setUsers(rawUsers);
    }
  }, [rawUsers]);

  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [focus, setFocus] = useState(false);

  return (
    <>
      <AnimatePresence>
        {currentMatch && focus && (
          <>
            <FreeSoloPopover
              ref={popoverRef}
              triggerRef={
                inputWrapperRef.current
                  ? (inputWrapperRef as RefObject<HTMLElement>)
                  : undefined
              }
              scrollRef={
                listBoxRef.current
                  ? (listBoxRef as RefObject<HTMLElement>)
                  : undefined
              }
              triggerType="listbox"
              placement="bottom-start"
              disableDialogFocus
              isOpen={currentMatch && focus}
              shouldCloseOnBlur={false}
              shouldCloseOnScroll={false}
              classNames={{
                content: "p-1",
              }}
              style={{
                width: `${inputWrapperRef.current?.getBoundingClientRect()} px`,
              }}
            >
              <ScrollShadow className="max-h-64" orientation="vertical">
                <Listbox
                  shouldHighlightOnFocus={false}
                  ref={listBoxRef}
                  className="m-0 p-0"
                  items={[...(users ?? [])]}
                >
                  {(user) => (
                    <ListboxItem
                      key={user.username}
                      onPress={() => {
                        props.onValueChange?.(
                          value.replace(reMentionAtEnd, `@${user.username} `),
                        );
                        inputRef.current?.focus();
                      }}
                    >
                      <User
                        avatarProps={{
                          src: user.imageURL,
                          size: "sm",
                        }}
                        name={user.name}
                        description={`@${user.username}`}
                      />
                    </ListboxItem>
                  )}
                </Listbox>
              </ScrollShadow>
            </FreeSoloPopover>
          </>
        )}
      </AnimatePresence>

      <Textarea
        wrapperRef={inputWrapperRef}
        ref={inputRef}
        {...props}
        onFocusChange={setFocus}
      />
    </>
  );
}
