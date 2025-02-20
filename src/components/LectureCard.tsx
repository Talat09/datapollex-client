import Link from "next/link";

interface LectureCardProps {
  lecture: {
    _id: string;
    title: string;
    videoUrl: string;
    pdfs: string[];
  };
}

const LectureCard = ({ lecture }: LectureCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-lg font-semibold">{lecture.title}</h2>
      <div className="mt-2">
        <Link href={lecture.videoUrl} passHref>
          <button className="text-blue-500">Watch Video</button>
        </Link>
      </div>
      <div className="mt-2">
        {lecture.pdfs.map((pdf, index) => (
          <Link href={pdf} key={index} passHref>
            <button className="text-blue-500">{`Download PDF ${index + 1}`}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LectureCard;
