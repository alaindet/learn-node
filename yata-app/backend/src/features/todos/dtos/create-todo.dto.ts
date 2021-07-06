export class CreateTodoDto {
  title: string;
  is_done: 1 | 0 | undefined = undefined;
}
