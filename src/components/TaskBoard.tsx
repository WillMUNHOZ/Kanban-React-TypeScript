import { Badge, Flex, Grid } from "@radix-ui/themes";
import { Task } from "../model/Task";
import { TaskCard } from "./TaskCard";
import { useTasks } from "../hooks/useTasks";

export const TaskBoard: React.FC = () => {
    const { tasks } = useTasks();

    const tasksTodo: Task[] = tasks?.filter(tasks => tasks.status === "todo") ?? [];
    const tasksInProgress: Task[] = tasks?.filter(tasks => tasks.status === "doing") ?? [];
    const tasksDone: Task[] = tasks?.filter(tasks => tasks.status === "done") ?? [];

    return (
        <Grid columns={"3"} gap={"4"} minWidth={"300px"}>
            <Flex direction={"column"} gap={"4"}>
                <Badge color="gray" size={"3"}>
                    Para Fazer ({tasksTodo.length})
                </Badge>

                {tasksTodo.map((task) => <TaskCard key={task.id} task={task} />)}
            </Flex>

            <Flex direction={"column"} gap={"4"}>
                <Badge color="yellow" size={"3"}>
                    Em Progresso ({tasksInProgress.length})
                </Badge>

                {tasksInProgress.map((task) => <TaskCard key={task.id} task={task} />)}
            </Flex>

            <Flex direction={"column"} gap={"4"}>
                <Badge color="green" size={"3"}>
                    Concluidas ({tasksDone.length})
                </Badge>

                {tasksDone.map((task) => <TaskCard key={task.id} task={task} />)}
            </Flex>
        </Grid >
    )
}