import { Message } from '@/types';
import { formatMessageTime } from '@/lib/utils';
import clsx from 'clsx';

interface MessageProps {
  message: Message;
  isOwnMessage: boolean;
}

export default function Message({ message, isOwnMessage }: MessageProps) {
  return (
    <div className={clsx('flex', isOwnMessage ? 'justify-end' : 'justify-start')}>
      <div
        className={clsx(
          'max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg shadow-sm',
          isOwnMessage
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        )}
      >
        {!isOwnMessage && (
          <p className="text-xs font-semibold mb-1">{message.userEmail}</p>
        )}
        <p className="text-sm">{message.text}</p>
        <p
          className={clsx(
            'text-xs mt-1 text-right',
            isOwnMessage ? 'text-blue-100' : 'text-gray-500'
          )}
        >
          {formatMessageTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
}