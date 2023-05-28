"use client";
import { CacheProvider } from "@emotion/react";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { useServerInsertedHTML } from "next/navigation";
import { ReactNode } from "react";

const cache = createEmotionCache({
  key: "repo-graph",
  prepend: false,
});

export default function RootStyleRegistry({
  children,
}: {
  children: ReactNode;
}) {
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <MantineProvider
        theme={{
          colorScheme: "dark",
        }}
      >
        {children}
      </MantineProvider>
    </CacheProvider>
  );
}
