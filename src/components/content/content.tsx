import type { Topic } from "@prisma/client";
import { useState, type FC } from "react";
import { TopicContent } from "@/components/topic/content";
import { NoteContent } from "@/components/note/content";

export const Content: FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  return (
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <TopicContent
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
      />
      <NoteContent topic={selectedTopic} />
    </div>
  );
};
