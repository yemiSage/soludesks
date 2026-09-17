export type ChatMessage = { id: string; from: 'them' | 'me'; text: string; time: string };

export type Conversation = {
  id: string;
  name: string;
  email: string;
  preview: string;
  timestamp: string;
  unread: number;
  day: string;
  messages: ChatMessage[];
};

export const conversations: Conversation[] = [
  {
    id: 'alex-johnson',
    name: 'Alex Johnson',
    email: 'Alexj@gmail.com',
    preview: 'Hi Manson You havae not submitted your assignment yet, are you encountering any issue',
    timestamp: '1h ago',
    unread: 3,
    day: 'Wednesday',
    messages: [
      { id: 'm1', from: 'them', text: 'Hi Manson You have not submitted your assignment yet, are you encountering any issue', time: '10:04 AM' },
      { id: 'm2', from: 'me', text: 'Yes, we offer monthly installments.', time: '10:15 AM' },
    ],
  },
  {
    id: 'sarah-lee',
    name: 'Sarah Lee',
    email: 'sarahlee@gmail.com',
    preview: 'Can you tell me more about the...',
    timestamp: '2h ago',
    unread: 0,
    day: 'Wednesday',
    messages: [{ id: 'm1', from: 'them', text: 'Can you tell me more about the scholarship application process?', time: '9:40 AM' }],
  },
  {
    id: 'emily-chen',
    name: 'Emily Chen',
    email: 'emilychen@gmail.com',
    preview: 'I have a question about the assign...',
    timestamp: 'Yesterday',
    unread: 0,
    day: 'Tuesday',
    messages: [{ id: 'm1', from: 'them', text: 'I have a question about the assignment deadline.', time: '4:12 PM' }],
  },
  {
    id: 'chris-adams',
    name: 'Chris Adams',
    email: 'chrisadams@gmail.com',
    preview: 'Thanks for the feedback!',
    timestamp: '3/15',
    unread: 0,
    day: 'March 15',
    messages: [{ id: 'm1', from: 'them', text: 'Thanks for the feedback!', time: '11:02 AM' }],
  },
];
