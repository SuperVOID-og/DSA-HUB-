import { useBookmarkStore } from '../store/useBookmarkStore';
import type { Bookmark } from '../store/useBookmarkStore';
import { Bookmark as BookmarkIcon, BookmarkCheck } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface BookmarkButtonProps {
  bookmark: Bookmark;
  className?: string;
  size?: number;
}

export default function BookmarkButton({ bookmark, className, size = 18 }: BookmarkButtonProps) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarkStore();
  const saved = isBookmarked(bookmark.id);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeBookmark(bookmark.id);
    } else {
      addBookmark(bookmark);
    }
  };

  return (
    <button
      onClick={toggle}
      className={twMerge(
        "transition-colors p-1 rounded hover:bg-ink/5 flex items-center justify-center",
        saved ? "text-burnt-orange" : "text-muted hover:text-ink",
        className
      )}
      aria-label={saved ? `Remove bookmark for ${bookmark.type}` : `Bookmark ${bookmark.type}`}
      title={saved ? "Remove bookmark" : "Save bookmark"}
    >
      {saved ? <BookmarkCheck size={size} /> : <BookmarkIcon size={size} />}
    </button>
  );
}
