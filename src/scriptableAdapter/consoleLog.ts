export const consoleLog = async (subtitle: string = '', body: string) => {
  const n = new Notification();
  n.title = 'Console Log';
  n.subtitle = subtitle;
  n.body = body;
  await n.schedule();
};
