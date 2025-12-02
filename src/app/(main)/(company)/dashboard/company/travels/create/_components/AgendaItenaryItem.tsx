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
    <Card className="border-slate-200 hover:shadow-lg transition-shadow">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Өдөр {day}</h3>
            <p className="text-sm text-slate-500">Өдрийн хөтөлбөр</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`agenda-name-${day}`} className="flex items-center gap-2 font-semibold text-slate-700">
            <FileText className="w-4 h-4 text-blue-600" />
            Өдрийн гарчиг
          </Label>
          <Input id={`agenda-name-${day}`} value={name} onChange={handleNameChange} placeholder="Өдрийн гарчиг оруулна уу" className="border-slate-300 focus:border-blue-500 focus:ring-blue-500" />
        </div>

        <div className="space-y-2">
          <Label className="font-semibold text-slate-700">Өдрийн дэлгэрэнгүй</Label>
          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <Editor editorSerializedState={content} onSerializedChange={handleEditorStateChange} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
