import Image from "next/image";
import Link from "next/link";
interface Lecture {
  _id: string;
  title: string;
  videoUrl: string;
}
interface Module {
  _id: string;
  title: string;
  lectures: Lecture[];
}
interface CourseCardProps {
  course: {
    _id: string;
    title: string;
    price: number;
    description: string;
    thumbnailUrl: string;
    instructor: string;
    modules: Module[];
    category: string;
    enrollmentCount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  console.log("single course:", course);
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg">
      {/* Image component added */}
      <div className="relative w-full h-48 mb-4">
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h3 className="text-xl font-semibold">{course.title}</h3>
      <p className="text-gray-700">{course.description}</p>
      <Link href={`/courses/${course._id}`} passHref>
        <button className="mt-4 bg-blue-500 text-white p-2 rounded-md">
          View Course
        </button>
      </Link>
    </div>
  );
};

export default CourseCard;
