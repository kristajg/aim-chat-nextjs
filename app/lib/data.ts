import { kv } from '@vercel/kv';

export const fetchBuddyList = async () => {
  try {
    let buddyArray: { userName: string, isOnline: boolean }[] = [];
    let totalOnline = 0;
    const buddies = await kv.smembers('buddies');
    await Promise.all(buddies.map(async userName => {
      let data = await kv.hgetall(`buddy:${userName}`) || { isOnline: false };
      let isOnline = !!data.isOnline;
      if (isOnline) ++totalOnline;
      buddyArray.push({ userName, isOnline });
    }));
    let sortedBuddies = buddyArray.sort((x, y) => {
      return (x.isOnline === y.isOnline) ? 0 : x.isOnline ? -1 : 1;
    });
    return {
      buddies: sortedBuddies,
      totalOnline,
    };
  } catch (err) {
    console.log('Fetch buddy list KV err ', err);
    return {};
  }
}

export const fetchBuddyChats = async (userName: string) => {
  try {
    return await kv.smembers(userName);
  } catch (err) {
    console.log('Fetch chats KV err ', err);
    return [];
  }
}
