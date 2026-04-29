import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Event, Ticket } from '../types';
import { events as seedEvents } from './events';

const seedTickets: Ticket[] = [
  {
    id: 'tkt_demo_used',
    eventId: 'evt_backtoschool',
    title: '飲料買一送一',
    benefit: '飲料買一送一',
    acquiredAt: '2026-04-21T14:32:00+08:00',
    expiresAt: '2026-09-15T23:59:59+08:00',
    status: 'used',
    code: 'FJBTS-7H8K-9X2L',
  },
];

type TicketContextValue = {
  tickets: Ticket[];
  claimTicket: (event: Event) => Ticket;
  markUsed: (ticketId: string) => void;
};

const TicketContext = createContext<TicketContextValue | null>(null);

const randomCode = () => {
  const part = () =>
    Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, 'X');
  return `FJ-${part()}-${part()}-${part()}`;
};

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(seedTickets);

  const claimTicket = useCallback((event: Event) => {
    const now = new Date();
    const expires = new Date(event.endDate + 'T23:59:59+08:00');
    const ticket: Ticket = {
      id: `tkt_${now.getTime()}`,
      eventId: event.id,
      title: event.title,
      benefit: event.benefit,
      acquiredAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      status: 'unused',
      code: randomCode(),
    };
    setTickets((prev) => [ticket, ...prev]);
    return ticket;
  }, []);

  const markUsed = useCallback((ticketId: string) => {
    setTickets((prev) => prev.map((t) => (t.id === ticketId ? { ...t, status: 'used' as const } : t)));
  }, []);

  const value = useMemo<TicketContextValue>(
    () => ({ tickets, claimTicket, markUsed }),
    [tickets, claimTicket, markUsed]
  );

  return React.createElement(TicketContext.Provider, { value }, children);
};

export const useTickets = () => {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error('useTickets must be used inside TicketProvider');
  return ctx;
};

export const allEvents = (): Event[] => seedEvents;
