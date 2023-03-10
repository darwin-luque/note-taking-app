import { useState, type FC } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

export interface NoteEditorProps {
  onSave: (note: { title: string; content: string }) => void;
}

export const NoteEditor: FC<NoteEditorProps> = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Note title"
            className="input-primary input input-lg w-full font-bold"
            value={title}
            onChange={(e) => void setTitle(e.target.value)}
          />
        </h2>
        <CodeMirror
          value={content}
          onChange={(value) => void setContent(value)}
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          width="500px"
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          className="border border-gray-300"
        />
      </div>
      <div className="card-actions justify-end">
        <button
          className="btn-primary btn"
          disabled={title.trim().length === 0 || content.trim().length === 0}
          onClick={() => {
            onSave({ title, content });
            setTitle("");
            setContent("");
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};
