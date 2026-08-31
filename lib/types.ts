export type Contact = {
  id: string;
  name: string;
  email: string;
  company: string;
  stage: "lead" | "qualified" | "negotiation" | "won" | "lost";
  value: number;
  notes: string;
  createdAt: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "meeting" | "call" | "launch" | "focus";
  with?: string;
};

export type Message = {
  id: string;
  threadId: string;
  from: string;
  ciphertext: string;
  iv: string;
  createdAt: string;
  plaintextPreview?: string;
};

export type Thread = {
  id: string;
  name: string;
  last: string;
  encrypted: boolean;
};

export type Store = {
  contacts: Contact[];
  events: CalendarEvent[];
  threads: Thread[];
  messages: Message[];
};
