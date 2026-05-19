import clsx from 'clsx';

interface LoaderProps {
  fullScreen?: boolean;
}

export default function Loader({ fullScreen }: LoaderProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        fullScreen ? 'fixed inset-0 bg-white bg-opacity-75 z-50' : 'py-10'
      )}
    >
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
}