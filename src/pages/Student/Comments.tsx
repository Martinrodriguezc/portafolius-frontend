import React from 'react';
import { authService } from '../../hooks/auth/authServices';
import { useRecentComments } from '../../hooks/student/RecentComments/useRecentComments';
import CommentsHeader from '../../components/student/comments/CommentsHeader';
import CommentsLoading from '../../components/student/comments/CommentsLoading';
import CommentsError from '../../components/student/comments/CommentsError';
import CommentsEmpty from '../../components/student/comments/CommentsEmpty';
import CommentsList from '../../components/student/comments/CommentCard';
import CommentsSuggestions from '../../components/student/comments/CommentsSuggestions';

export default function CommentsPage() {
  const userId = Number(authService.getCurrentUser()?.id ?? '');
  const { comments, loading, error } = useRecentComments(userId);

  if (loading) return <CommentsLoading />;
  if (error)   return <CommentsError message={error.toString()} />;
  if (comments.length === 0) return <CommentsEmpty />;

  const normalizedComments = comments.map((c) => ({
    ...c,
    studyId: Number(c.studyId),
    videoId: Number(c.videoId),
  }));

  return (
    <div className="p-8 md:p-10 max-w-7xl mx-auto">
      <CommentsHeader />
      <CommentsList comments={normalizedComments} />
      {normalizedComments.length <= 3 && <CommentsSuggestions />}
    </div>
  );
}

