import { useSession } from "next-auth/react";
import type { Topic } from "@prisma/client";
import { type FC } from "react";
import { api } from "@/utils/api";

export interface TopicContentProps {
  selectedTopic: Topic | null;
  setSelectedTopic: (topic: Topic | null) => void;
}

export const TopicContent: FC<TopicContentProps> = ({
  setSelectedTopic,
  selectedTopic,
}) => {
  const { data: sessionData } = useSession();

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined,
    {
      enabled: !!sessionData?.user,
      onSuccess: (data) =>
        void setSelectedTopic(selectedTopic ?? data[0] ?? null),
    }
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => void refetchTopics(),
  });

  return (
    <div className="px-2">
      <ul className="menu rounded-box w-56 bg-base-100 p-2">
        {topics?.map((topic) => (
          <li key={topic.id}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setSelectedTopic(topic);
              }}
            >
              {topic.title}
            </a>
          </li>
        ))}
      </ul>
      <div className="divider" />
      <input
        type="text"
        placeholder="New Topic"
        className="input-bordered input input-sm w-full"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createTopic.mutate({ title: e.currentTarget.value });
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
};
