import { Pencil1Icon } from "@radix-ui/react-icons";
import { Badge, Box, Button, Dialog, Flex, IconButton, RadioGroup, Text, TextArea, TextField } from "@radix-ui/themes";
import { Task } from "../model/Task";
import { useTasks } from "../hooks/useTasks";
import { FormEventHandler, useState } from "react";
import { z } from "zod";

interface TaskEditProps {
    task: Task
};

const CreateTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["todo", "doing", "done"]),
    priority: z.enum(["low", "medium", "high"])
});

export const EditTask: React.FC<TaskEditProps> = ({ task }) => {
    const { updateTask } = useTasks();

    const [formData, setFormData] = useState({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority
    });

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
        ev.preventDefault();

        const confirmation = confirm("Tem certeza que deseja editar essa tarefa?");

        if (confirmation) {
            const taskEdited = CreateTaskSchema.parse(formData);
            await updateTask(task.id, taskEdited);
            alert(JSON.stringify("Tarefa editada com sucesso!"));
        }
    };

    return (
        <Dialog.Root onOpenChange={(open) => {
            if (open) {
                setFormData({
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    priority: task.priority
                });
            };
        }}>
            <Dialog.Trigger>
                <IconButton size={"1"} color="gray" style={{ cursor: "pointer" }}>
                    <Pencil1Icon />
                </IconButton>
            </Dialog.Trigger>
            <Dialog.Content>
                <Dialog.Title>Editar Tarefa</Dialog.Title>
                <Dialog.Description size={"2"} mb={"4"}>
                    Modifique a tarefa.
                </Dialog.Description>
                <form onSubmit={handleSubmit}>
                    <Flex direction={"column"} gap={"4"}>
                        <Box maxWidth={"600px"}>
                            <Box mb={"2"}>
                                <Text as="label" htmlFor="title">Título</Text>
                            </Box>
                            <TextField.Root
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Defina um título"
                                name="title"
                                id="title"
                                autoFocus
                                required
                            />
                        </Box>
                        <Box maxWidth={"600px"}>
                            <Box mb={"2"}>
                                <Text as="label" htmlFor="description">Descrição</Text>
                            </Box>
                            <TextArea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Descreva a tarefa"
                                name="description"
                                id="description"
                                required
                            />
                        </Box>
                        <Flex gap={"8"}>
                            <Box>
                                <Text as="div" mb={"2"}>Situação</Text>
                                <RadioGroup.Root
                                    value={formData.status}
                                    onValueChange={(value) => setFormData({ ...formData, status: value as Task["status"] })}
                                    name="status"
                                >
                                    <RadioGroup.Item value="todo">
                                        <Badge color="gray">
                                            Para fazer
                                        </Badge>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="doing">
                                        <Badge color="yellow">
                                            Em progresso
                                        </Badge>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="done">
                                        <Badge color="green">
                                            Concluida
                                        </Badge>
                                    </RadioGroup.Item>
                                </RadioGroup.Root>
                            </Box>
                            <Box>
                                <Text as="div" mb={"2"}>Prioridade</Text>
                                <RadioGroup.Root
                                    value={formData.priority}
                                    onValueChange={(value) => setFormData({ ...formData, priority: value as Task["priority"] })}
                                    name="priority"
                                >
                                    <RadioGroup.Item value="low">
                                        <Badge color="sky">
                                            Baixa
                                        </Badge>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="medium">
                                        <Badge color="amber">
                                            Média
                                        </Badge>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="high">
                                        <Badge color="tomato">
                                            Alta
                                        </Badge>
                                    </RadioGroup.Item>
                                </RadioGroup.Root>
                            </Box>
                        </Flex>
                        <Flex gap={"2"} justify={"end"} >
                            <Dialog.Close>
                                <Button color="gray" variant="soft" style={{ cursor: "pointer" }}>Cancelar</Button>
                            </Dialog.Close>
                            <Button type="submit" style={{ cursor: "pointer" }}>Editar Tarefa</Button>
                        </Flex>
                    </Flex>
                </form>
            </Dialog.Content>

        </Dialog.Root>
    )
}