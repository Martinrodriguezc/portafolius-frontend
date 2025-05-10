import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';

interface Comment {
  id: number;
  text: string;
  author: string;
  date: string;
  studyId: number;
  videoId: number;
}

interface Props { comments: Comment[]; }
export default function CommentsList({ comments }: Props) {
  return (
    <div className="space-y-4">
      {comments.map((com) => (
        <Card
          key={com.id}
          className="bg-gray-100 border-none rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start gap-4"
        >
          <div className="flex-1">
            <p className="text-sm text-gray-800 mb-2">{com.text}</p>
            <div className="flex justify-between text-xs text-gray-500">
              <span className="font-medium">{com.author}</span>
              <span>{com.date}</span>
            </div>
          </div>
          <Link to={`/student/${com.studyId}/videos/${com.videoId}`}>
            <Button className="bg-blue-600 hover:bg-blue-600/90 text-white text-sm font-medium py-2 px-3 rounded-lg">
              Ver video
            </Button>
          </Link>
        </Card>
      ))}
    </div>
  );
}