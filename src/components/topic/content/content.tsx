import { useSession } from "next-auth/react";
import { type FC, useState } from "react";
import { api, type RouterOutputs } from "@/utils/api";

type Topic = RouterOutputs["topic"]["getAll"][number];

export const TopicContent: FC = () => {
  const { data: sessionData } = useSession();

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

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
    <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
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
    </div>
  );
};