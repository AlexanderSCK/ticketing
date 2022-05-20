import { Publisher, Subjects, TicketUpdatedEvent } from '@ap99tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
