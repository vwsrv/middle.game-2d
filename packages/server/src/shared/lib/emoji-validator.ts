const ALLOWED = [
  '👍',
  '👎',
  '❤️',
  '😂',
  '😮',
  '😢',
  '😡',
  '🎉',
  '🔥',
  '💯',
  '👏',
  '🙌',
  '🤔',
  '😍',
  '😴',
  '🤯',
  '💪',
  '🎯',
  '✨',
  '🚀',
];

export const isValidEmoji = (emoji: string): boolean => {
  return ALLOWED.includes(emoji);
};

export const getAllowedEmojis = (): string[] => {
  return [...ALLOWED];
};
