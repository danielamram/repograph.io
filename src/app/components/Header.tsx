import {
  Avatar,
  Burger,
  Button,
  Group,
  Header,
  Kbd,
  Menu,
  Text,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openSpotlight } from "@mantine/spotlight";
import { IconLogout, IconSearch } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FC, SVGProps } from "react";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const Logo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 132 121"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="56.1491"
      cy="55.696"
      r="40.4755"
      transform="rotate(-165 56.1491 55.696)"
      stroke="#5C5F66"
      strokeWidth="10"
    />
    <circle
      cx="31.1699"
      cy="27.8704"
      r="17.6034"
      transform="rotate(60 31.1699 27.8704)"
      fill="#CC5DE8"
    />
    <circle
      cx="44.9814"
      cy="91.5583"
      r="21.2708"
      transform="rotate(60 44.9814 91.5583)"
      fill="#CC5DE8"
    />
    <circle
      cx="91.2097"
      cy="43.9015"
      r="28.8391"
      transform="rotate(60 91.2097 43.9015)"
      fill="#CC5DE8"
      stroke="#CC5DE8"
    />
  </svg>
);

const AppHeader = () => {
  const { data: session } = useSession();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <Header
      bg="transparent"
      withBorder={false}
      className="absolute z-10 w-full"
      height={60}
      px="md"
    >
      <Group position="apart" sx={{ height: "100%" }}>
        <Logo width={50} />

        <Group className={classes.hiddenMobile}>
          <UnstyledButton
            sx={(theme) => ({
              borderRadius: theme.radius.md,
              padding: `6px ${theme.spacing.md}`,
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[1]
                  : theme.colors.gray[0],
              border: `${rem(1)} solid ${
                theme.colorScheme === "dark"
                  ? theme.colors.dark[5]
                  : theme.colors.gray[1]
              }`,
            })}
            onClick={() => openSpotlight()}
          >
            <Group spacing="xs">
              <IconSearch size={rem(14)} stroke={1.5} />
              <Text size="sm" color="dimmed" pr={80}>
                Search...
              </Text>
              <Text weight={700}>
                <Kbd>/</Kbd>
              </Text>
            </Group>
          </UnstyledButton>
          {session ? (
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                // className={cx(classes.user, {
                //   [classes.userActive]: userMenuOpened,
                // })}
                >
                  <Group spacing={7}>
                    <Avatar
                      src={session.user?.image}
                      alt={session.user?.name || "profile image"}
                      radius="xl"
                      size={20}
                    />
                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                      {session.user?.name}
                    </Text>
                    {/* <IconChevronDown size={rem(12)} stroke={1.5} /> */}
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                {/* <Menu.Item
                  icon={
                    <IconHeart
                      size="0.9rem"
                      color={theme.colors.red[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Liked posts
                </Menu.Item>
                <Menu.Item
                  icon={
                    <IconStar
                      size="0.9rem"
                      color={theme.colors.yellow[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Saved posts
                </Menu.Item>
                <Menu.Item
                  icon={
                    <IconMessage
                      size="0.9rem"
                      color={theme.colors.blue[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Your comments
                </Menu.Item> */}

                {/* <Menu.Label>Settings</Menu.Label> */}
                {/* <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>
                  Account settings
                </Menu.Item>
                <Menu.Item
                  icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}
                >
                  Change account
                </Menu.Item> */}
                <Menu.Item
                  onClick={() => signOut()}
                  icon={<IconLogout size="0.9rem" stroke={1.5} />}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Button onClick={() => signIn("github")} variant="default">
              Log in
            </Button>
          )}
        </Group>

        <Burger
          opened={drawerOpened}
          onClick={toggleDrawer}
          className={classes.hiddenDesktop}
        />
      </Group>
    </Header>
  );
};

export default AppHeader;
