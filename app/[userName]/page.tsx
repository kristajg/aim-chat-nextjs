import ChatWindow from '../ui/chatWindow';
import { fetchBuddyChats } from '../lib/data';

export default async function Home({ params: { userName } }: { params: { userName: string } }) {
  const chats = await fetchBuddyChats(userName) || [];
  return (
    <ChatWindow
      currentUser={`${process.env.CURRENT_USER_NAME}`}
      currentBuddy={userName}
      chats={chats}
    />
  );
}
