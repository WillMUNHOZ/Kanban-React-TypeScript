import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Box, Flex, Heading, Switch } from "@radix-ui/themes";
import { CreateTaskForm } from "./CreateTaskForm";
import icon from "../assets/icons/planejamento.png";

interface HeaderProps {
    theme: "light" | "dark";
    onChangeTheme: (theme: "light" | "dark") => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onChangeTheme }) => {

    return (
        <Box mb={"2"} style={{ borderBottom: "1px solid rgba(204, 204, 204, 0.3)" }} pb={"4"} maxHeight={"100%"}>
            <Flex justify={"between"} align={"center"} gap={"4"} height={"100%"}>
                <Flex align={"center"} gap={"2"}>
                    <img src={icon} alt="logo" style={{ width: "30px" }} />
                    <Heading as="h1">KANBAN</Heading>
                </Flex>
                <Flex align={"center"} gap={"8"}>
                    <Flex align={"center"} gap={"2"}>
                        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
                        <Switch
                            size={"3"}
                            style={{ cursor: "pointer" }}
                            checked={theme === "dark"}
                            onCheckedChange={(checked) => onChangeTheme(checked ? "dark" : "light")}
                        />
                    </Flex>
                    <CreateTaskForm />
                </Flex>
            </Flex>
        </Box>
    )
}