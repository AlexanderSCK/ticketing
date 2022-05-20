import { Publisher,Subjects,TicketCreatedEvent } from "@ap99tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
  }