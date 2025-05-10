import { parse } from 'date-fns';
import { HttpException, HttpStatus } from '@nestjs/common';
export function checkDeadline(dtoDeadLine: string, currentDate: Date) {
  let deadline;
  try {
    // Try parsing with a fallback to multiple formats
    deadline = parse(dtoDeadLine, 'MM/dd/yyyy', new Date()); // e.g., "05/10/2025"
    if (isNaN(deadline.getTime())) {
      deadline = parse(dtoDeadLine, 'dd-MM-yyyy', new Date()); // e.g., "10-05-2025"
    }
    if (isNaN(deadline.getTime())) {
      deadline = new Date(dtoDeadLine); // Fallback to ISO or default Date parsing
    }

    // Validate the parsed date
    if (isNaN(deadline.getTime())) {
      throw new HttpException('Invalid date format', HttpStatus.BAD_REQUEST);
    }
  } catch (error) {
    throw new HttpException('Invalid date format', HttpStatus.BAD_REQUEST);
  }

  // Ensure deadline is in the future
  if (deadline <= currentDate) {
    throw new HttpException(
      'Deadline must be in the future',
      HttpStatus.BAD_REQUEST,
    );
  }
  return deadline;
}
