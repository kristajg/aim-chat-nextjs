export const randomizedMessageBack = function (buddyMessages: Array<string>) {
  const randomizedIndex = Math.floor(Math.random() * buddyMessages.length) + 0;
  return buddyMessages[randomizedIndex];
}

export const randomizeSleepTime = () => {
  const min = Math.ceil(1000); 
  const max = Math.floor(2000); 
  return Math.floor(Math.random() * (max - min + 1)) + min;
}