"use client";

import { Editor } from "@/components/blocks/editor-00/editor";
import { Agenda } from "./AgendaSection";
import { SerializedEditorState } from "lexical";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ChangeEvent } from "react";
import { Calendar, FileText } from "lucide-react";

type AgendaItenaryItem = {
  agenda: Agenda;
  handleChangeAgendaByDay: (day: number, content: SerializedEditorState) => void;
  handleChangeNameByDay: (day: number, name: string) => void;
};

export const AgendaItenaryItem = ({ agenda, handleChangeAgendaByDay, handleChangeNameByDay }: AgendaItenaryItem) => {
  const { day, name, content } = agenda;

  const handleEditorStateChange = (value: SerializedEditorState) => {
    handleChangeAgendaByDay(day, value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeNameByDay(day, e.target.value);
  };

  return (
    <Card className="border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-3.5">
        <div className="space-y-2">
          <Label htmlFor={`agenda-name-${day}`} className="flex items-center gap-2 font-semibold text-gray-700 text-sm">
            <FileText className="w-3.5 h-3.5 text-purple-600" />
            Өдрийн гарчиг
          </Label>
          <Input id={`agenda-name-${day}`} value={name} onChange={handleNameChange} placeholder="Өдрийн гарчиг оруулна уу" className="border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
        </div>

        <div className="space-y-2">
          <Label className="font-semibold text-gray-700 text-sm">Өдрийн дэлгэрэнгүй</Label>
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <Editor editorSerializedState={content} onSerializedChange={handleEditorStateChange} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
