import { useRoutineContext } from "@/components/routine/routine-context";
import { Form, Input } from "@heroui/react";

export default function RoutineTitle() {
  const { title, setTitle, errors } = useRoutineContext();

  return (
    <Form validationErrors={errors}>
      <Input
        name="title"
        placeholder="Routine title"
        size="lg"
        value={title}
        onValueChange={setTitle}
      />
    </Form>
  );
}
