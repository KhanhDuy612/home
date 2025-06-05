type Props = {
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
};
export default function CloseButton({ className, onClick }: Props) {
  return (
    <button
      className={`absolute text-4xl text-gray-500 top-6 z-20 right-6 hover:text-black cursor-pointer ${className}`}
      onClick={() => onClick?.()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
