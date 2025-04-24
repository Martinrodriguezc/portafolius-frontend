import Card from '../../../components/common/Card/Card';

export interface FeedbackTabProps {
  recentFeedback: {
    id: number;
    date: string;
    protocol: string;
    score: number;
    comment: string;
  }[];
}

export function FeedbackTab({ recentFeedback }: FeedbackTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-[16px] font-medium text-[#333333]">
        Retroalimentación Reciente
      </h3>
      {recentFeedback.map(feedback => (
        <Card key={feedback.id} className="rounded-[16px] p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="text-[16px] font-medium text-[#333333]">
                Protocolo {feedback.protocol}
              </h4>
              <p className="text-[13px] text-[#A0A0A0]">{feedback.date}</p>
            </div>
            <div className="bg-[#4E81BD]/10 px-3 py-1 rounded-full text-[14px] font-medium text-[#4E81BD]">
              {feedback.score}/10
            </div>
          </div>
          <p className="text-[14px] text-[#333333] mt-2">{feedback.comment}</p>
        </Card>
      ))}
    </div>
  );
}