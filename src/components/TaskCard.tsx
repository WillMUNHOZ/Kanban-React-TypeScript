import { Badge, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Task, TaskPriority, TaskStatus } from "../model/Task";
import { useTasks } from "../hooks/useTasks";
import { EditTask } from "./EditTask";

interface TaskCardProps {
    task: Task
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const { deleteTask, updateTask } = useTasks();

    const getPriorityColor = (priority: TaskPriority) => {
        const priorityColors: { [key: string]: "sky" | "amber" | "tomato" } = {
            "low": "sky",
            "medium": "amber",
            "high": "tomato"
        };
        return priorityColors[priority];
    };

    const getActionText = (status: TaskStatus) => {
        const actionsTexts = {
            "todo": "Iniciar",
            "doing": "Concluir",
            "done": ""
        };
        return actionsTexts[status];
    };

    const getActionColor = (status: TaskStatus) => {
        const actionsColors: { [key: string]: "indigo" | "green" | "bronze" } = {
            "todo": "indigo",
            "doing": "green",
            "done": "bronze"
        };
        return actionsColors[status];
    };

    const handleDelete = (id: number) => {
        const confirmation = confirm("Tem certeza que deseja excluir essa tarefa?");

        if (confirmation) {
            deleteTask(id)
        }
    };

    const handleUpdate = () => {
        if (task.status === "todo") {
            updateTask(task.id, { status: "doing" })
        } else if (task.status === "doing") {
            updateTask(task.id, { status: "done" })
        }
    };

    return (
        <Card style={{ boxShadow: "5px 5px 10px  rgba(0, 0, 0, 0.1)" }}>
            <Flex align={"center"} justify={"between"} gap={"4"}>
                <Flex align={"center"} gap={"4"}>
                    <Heading as="h3" size={"3"}>{task.title}</Heading>
                    <Badge color={getPriorityColor(task.priority)}>{task.priority}</Badge>
                </Flex>
                <Flex justify={"end"}>
                    <EditTask task={task} />
                </Flex>
            </Flex>
            <Text as="p" my={"4"}>{task.description}</Text>
            <Flex gap={"2"} justify={"end"}>
                {task.status !== "done" &&
                    <Button color={getActionColor(task.status)} onClick={handleUpdate} style={{ cursor: "pointer" }}>
                        {getActionText(task.status)}
                    </Button>
                }

                <Button color="red" variant="outline" onClick={() => handleDelete(task.id)} style={{ cursor: "pointer" }}>Excluir</Button>
            </Flex>
        </Card >
    )
}