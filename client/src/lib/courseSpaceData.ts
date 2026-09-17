export type SpacePost = {
  id: string;
  type: 'Announcement' | 'Discussion';
  title: string;
  body: string;
  timestamp: string;
  replies: number;
};

export const spacePosts: SpacePost[] = [
  {
    id: 'post-1',
    type: 'Announcement',
    title: 'Responses to Module 4, lesson 10',
    body: 'Several students have provided feedback on the changes made, expressing appreciation for the correction and noting that it enhances their understanding of the material.',
    timestamp: '3 days ago',
    replies: 0,
  },
  {
    id: 'post-2',
    type: 'Announcement',
    title: 'Upcoming Workshop on Design Thinking',
    body: 'Join us next Wednesday for a hands-on workshop where we will explore the principles of Design Thinking. This session is ideal for both beginners and experienced designers looking to enhance their skills.',
    timestamp: '4 days ago',
    replies: 5,
  },
  {
    id: 'post-3',
    type: 'Discussion',
    title: 'Clarification on Group Project Guidelines',
    body: 'Can someone confirm if we should be working individually or in pairs for this module’s assignment?',
    timestamp: '5 days ago',
    replies: 8,
  },
  {
    id: 'post-4',
    type: 'Discussion',
    title: 'Design Tools Preference',
    body: 'What design tools are people using for wireframing and prototyping? I’m currently on Figma and would love to hear other recommendations.',
    timestamp: '1 week ago',
    replies: 12,
  },
];
