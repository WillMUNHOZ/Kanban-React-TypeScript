import { Box, Heading, Theme } from "@radix-ui/themes";
import { TaskBoard } from "./components/TaskBoard";
import { TasksContextProvider } from "./contexts/TasksContext";
import { Header } from "./components/Header";
import { useState } from "react";

export default function App() {

  const [appearance, setAppearance] = useState<"light" | "dark">("dark");

  return (
    <Theme appearance={appearance}>
      <TasksContextProvider>
        <Box maxWidth="1800px" height={"auto"} mx={"auto"} m={"9"} overflow={"hidden"}>
          <Box
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              height: "auto",
              backgroundColor: "var(--color-background)",
              padding: "20px",
            }}
          >
            <Header
              theme={appearance}
              onChangeTheme={(theme) => setAppearance(theme)}
            />
            <Heading as="h2" size={"5"} weight={"medium"} mb={"0"}>Quadro de taferas</Heading>
          </Box>
          <Box mt={"9"}>
            <TaskBoard />
          </Box>
        </Box>
      </TasksContextProvider>
    </Theme >
  )
}
