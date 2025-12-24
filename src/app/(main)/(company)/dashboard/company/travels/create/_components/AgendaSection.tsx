import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Calendar } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormDataType } from "../page";
import { useEffect, useState } from "react";
import { AgendaItenaryItem } from "./AgendaItenaryItem";
import { SerializedEditorState } from "lexical";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type AgendaSectionProps = {
  form: UseFormReturn<FormDataType>;
};

export type Agenda = {
  day: number;
  name: string;
  content: SerializedEditorState;
};

const serializeEditorStateToText = (editorState: SerializedEditorState): string => {
  try {
    const textContent: string[] = [];
    const processNode = (node: any) => {
      if (node.type === "text") {
        textContent.push(node.text || "");
      } else if (node.children) {
        node.children.forEach(processNode);
      }
    };

    if (editorState.root?.children) {
      editorState.root.children.forEach(processNode);
    }

    return textContent.join(" ").trim();
  } catch (error) {
    console.error("Error serializing editor state:", error);
    return "";
  }
};

export const AgendaSection = ({ form }: AgendaSectionProps) => {
  const duration = form.watch("duration");

  const [agendas, setAgendas] = useState<Agenda[]>([]);

  useEffect(() => {
    const newAgendas: Agenda[] = [];

    for (let i = 0; i < duration; i++)
      newAgendas.push({
        day: i + 1,
        content: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
          },
        },
        name: "",
      } as unknown as Agenda);

    setAgendas(newAgendas);

    const formAgendas = newAgendas.map((agenda) => ({
      day: agenda.day,
      name: agenda.name,
      content: serializeEditorStateToText(agenda.content),
    }));

    form.setValue("agendas", formAgendas);
  }, [duration]);

  const handleChangeAgendaByDay = (day: number, content: SerializedEditorState) => {
    setAgendas((prevAgendas) => {
      const updatedAgendas = prevAgendas.map((agenda) => (agenda.day === day ? { ...agenda, content: content } : agenda));

      const formAgendas = updatedAgendas.map((agenda) => ({
        day: agenda.day,
        name: agenda.name,
        content: serializeEditorStateToText(agenda.content),
      }));

      form.setValue("agendas", formAgendas);

      return updatedAgendas;
    });
  };

  const handleChangeNameByDay = (day: number, name: string) => {
    setAgendas((prevAgendas) => {
      const updatedAgendas = prevAgendas.map((agenda) => (agenda.day === day ? { ...agenda, name: name } : agenda));

      const formAgendas = updatedAgendas.map((agenda) => ({
        day: agenda.day,
        name: agenda.name,
        content: serializeEditorStateToText(agenda.content),
      }));

      form.setValue("agendas", formAgendas);

      return updatedAgendas;
    });
  };

  return (
    <Card className="overflow-hidden shadow-sm border border-gray-200">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-gray-900">Аяллын хөтөлбөр</CardTitle>
            <CardDescription className="text-sm">Өдөр тутмын үйл ажиллагааг тодорхойлно уу</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-5 space-y-4">
        {agendas.length === 0 && <p className="text-sm text-gray-500">Аяллын хугацааг оруулснаар хөтөлбөрийн хэсэг үүснэ.</p>}

        {agendas.length > 0 && (
          <Accordion type="single" collapsible className="w-full" defaultValue="1">
            {agendas.map((agenda) => (
              <AccordionItem value={agenda.day.toString()} key={agenda.day} className="border-gray-200">
                <AccordionTrigger className="hover:no-underline hover:bg-gray-50 px-3 rounded-lg">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-sm">
                      <span className="text-white text-sm font-bold">{agenda.day}</span>
                    </div>
                    <span className="font-semibold text-gray-900">Өдөр {agenda.day}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-3 pt-3">
                  <AgendaItenaryItem key={agenda.day} agenda={agenda} handleChangeAgendaByDay={handleChangeAgendaByDay} handleChangeNameByDay={handleChangeNameByDay} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};
