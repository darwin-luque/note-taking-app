import type { Topic } from "@prisma/client";
import { type FC } from "react";
import { NoteEditor } from "@/components/note/editor";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { NoteCard } from "../card/card";

export interface NoteContentProps {
  topic: Topic | null;
}

export const NoteContent: FC<NoteContentProps> = ({ topic }) => {
  const { data: sessionData } = useSession();
  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    {
      topicId: topic?.id ?? "",
    },
    {
      enabled: !!sessionData?.user && !!topic,
    }
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => void refetchNotes(),
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => void refetchNotes(),
  });

  return (
    <div className="col-span-3">
      <div>
        {notes?.map((note) => (
          <div key={note.id} className="mt-5">
            <NoteCard
              note={note}
              onDelete={() => void deleteNote.mutate({ id: note.id })}
            />
          </div>
        ))}
      </div>
      <NoteEditor
        onSave={({ title, content }) =>
          createNote.mutate({
            title,
            content,
            topicId: topic?.id ?? "",
          })
        }
      />
    </div>
  );
};
