interface Props {
  progress: number; // percentage value (0-100)
}

export default function ProgressBar({ progress }: Props) {
  return (
    <div className="relative pt-1">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="font-semibold">Progress</span>
        </div>
      </div>
      <div className="flex mb-2">
        <div className="w-full bg-gray-300 rounded-full">
          <div
            className="bg-blue-600 text-xs font-semibold text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
