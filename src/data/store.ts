import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { AdminStats, Event, RedemptionLog, Ticket } from '../types';
import { events as seedEvents } from './events';

const seedTickets: Ticket[] = [
  {
    id: 'tkt_demo_unused',
    eventId: 'evt_midautumn',
    title: '中秋限定優惠週',
    benefit: '滿 200 折 20',
    acquiredAt: '2026-04-29T10:15:00+08:00',
    expiresAt: '2026-09-30T23:59:59+08:00',
    status: 'unused',
    code: 'FJ-MID9-AUTM-2026',
  },
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
  {
    id: 'tkt_demo_localweek',
    eventId: 'evt_localweek',
    title: '逢甲在地週',
    benefit: '小吃全面 9 折',
    acquiredAt: '2026-04-22T19:00:00+08:00',
    expiresAt: '2026-11-17T23:59:59+08:00',
    status: 'used',
    code: 'FJ-A12B-CD34-EF56',
  },
];

const seedLogs: RedemptionLog[] = [
  {
    id: 'log_seed_1',
    ticketId: 'tkt_demo_used',
    ticketCode: 'FJBTS-7H8K-9X2L',
    eventId: 'evt_backtoschool',
    eventTitle: '學生開學季',
    benefit: '飲料買一送一',
    redeemedAt: '2026-04-22T18:11:00+08:00',
    staffId: 'staff_001',
  },
  {
    id: 'log_seed_2',
    ticketId: 'tkt_demo_localweek',
    ticketCode: 'FJ-A12B-CD34-EF56',
    eventId: 'evt_localweek',
    eventTitle: '逢甲在地週',
    benefit: '小吃全面 9 折',
    redeemedAt: '2026-04-22T19:45:00+08:00',
    staffId: 'staff_001',
  },
];

type RedeemResult =
  | { ok: true; log: RedemptionLog; ticket: Ticket }
  | { ok: false; reason: 'not_found' | 'already_used' | 'expired' | 'invalid' };

type TicketContextValue = {
  tickets: Ticket[];
  logs: RedemptionLog[];
  claimTicket: (event: Event) => Ticket;
  markUsed: (ticketId: string) => void;
  redeemByPayload: (payload: string, staffId?: string) => RedeemResult;
  getStats: () => AdminStats;
};

const TicketContext = createContext<TicketContextValue | null>(null);

const randomCode = () => {
  const part = () =>
    Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, 'X');
  return `FJ-${part()}-${part()}-${part()}`;
};

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(seedTickets);
  const [logs, setLogs] = useState<RedemptionLog[]>(seedLogs);

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

  const redeemByPayload = useCallback(
    (payload: string, staffId = 'staff_001'): RedeemResult => {
      let parsed: any;
      try {
        parsed = JSON.parse(payload);
      } catch {
        return { ok: false, reason: 'invalid' };
      }
      const tid = parsed?.tid;
      if (!tid) return { ok: false, reason: 'invalid' };

      const ticket = tickets.find((t) => t.id === tid);
      if (!ticket) return { ok: false, reason: 'not_found' };
      if (ticket.status === 'used') return { ok: false, reason: 'already_used' };
      if (new Date(ticket.expiresAt) < new Date()) return { ok: false, reason: 'expired' };

      const now = new Date();
      const log: RedemptionLog = {
        id: `log_${now.getTime()}`,
        ticketId: ticket.id,
        ticketCode: ticket.code,
        eventId: ticket.eventId,
        eventTitle: ticket.title,
        benefit: ticket.benefit,
        redeemedAt: now.toISOString(),
        staffId,
      };
      setTickets((prev) =>
        prev.map((t) => (t.id === ticket.id ? { ...t, status: 'used' as const } : t))
      );
      setLogs((prev) => [log, ...prev]);
      return { ok: true, log, ticket: { ...ticket, status: 'used' } };
    },
    [tickets]
  );

  const getStats = useCallback((): AdminStats => {
    const totalClaimed = tickets.length;
    const totalRedeemed = logs.length;
    const pending = tickets.filter((t) => t.status === 'unused').length;
    const conversionRate = totalClaimed === 0 ? 0 : totalRedeemed / totalClaimed;

    const counts = new Map<string, { title: string; n: number }>();
    for (const log of logs) {
      const cur = counts.get(log.eventId) ?? { title: log.eventTitle, n: 0 };
      cur.n += 1;
      counts.set(log.eventId, cur);
    }
    let topTitle: string | null = null;
    let topCount = 0;
    counts.forEach((v) => {
      if (v.n > topCount) {
        topTitle = v.title;
        topCount = v.n;
      }
    });

    return {
      totalClaimed,
      totalRedeemed,
      pending,
      conversionRate,
      topEventTitle: topTitle,
      topEventCount: topCount,
    };
  }, [tickets, logs]);

  const value = useMemo<TicketContextValue>(
    () => ({ tickets, logs, claimTicket, markUsed, redeemByPayload, getStats }),
    [tickets, logs, claimTicket, markUsed, redeemByPayload, getStats]
  );

  return React.createElement(TicketContext.Provider, { value }, children);
};

export const useTickets = () => {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error('useTickets must be used inside TicketProvider');
  return ctx;
};

export const allEvents = (): Event[] => seedEvents;
