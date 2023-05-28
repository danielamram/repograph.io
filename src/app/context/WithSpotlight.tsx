import { Button, Group } from "@mantine/core";
import { SpotlightProvider, spotlight } from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useEntities } from "../hooks";

function SpotlightControl() {
  return (
    <Group position="center">
      <Button onClick={spotlight.open}>Open spotlight</Button>
    </Group>
  );
}

const WithSpotlight = () => {
  const { fetchRepoUsers, fetchUserRepos, reset } = useEntities();
  const [query, setQuery] = useState("");

  return (
    <SpotlightProvider
      actions={
        query
          ? [
              {
                title: query.includes("/")
                  ? `Search ${query} repository`
                  : `Search ${query} user`,
                description: `Click to search ${
                  query.includes("/") ? "repository" : "user"
                } on GitHub`,
                onTrigger: () => {
                  reset();
                  if (query.includes("/")) fetchRepoUsers(query);
                  else fetchUserRepos(query);
                },
              },
            ]
          : []
      }
      query={query}
      onQueryChange={setQuery}
      searchIcon={<IconSearch size="1.2rem" />}
      searchPlaceholder="Search repository or user"
      shortcut="/"
    />
  );
};

export default WithSpotlight;
