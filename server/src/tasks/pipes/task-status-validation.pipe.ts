import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly acceptedValues = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN
  ]
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isValid(value)) {
      throw new BadRequestException(`${value} is not an accepted task status`);
    }
    return value;
  }
  private isValid(value: any): boolean {
    return Boolean(this.acceptedValues.find(acceptedValue => acceptedValue === value));
  }
}