"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND, UNDO_COMMAND, REDO_COMMAND } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode, HeadingTagType } from "@lexical/rich-text";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from "@lexical/list";
import { $createParagraphNode } from "lexical";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bold, Italic, Underline, Strikethrough, Code, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Quote, Heading1, Heading2, Heading3, Undo, Redo, Type } from "lucide-react";

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsCode(selection.hasFormat("code"));
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-200 bg-slate-50/50">
      {/* Undo/Redo */}
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} className="h-8 w-8 p-0 hover:bg-slate-200" title="Буцаах">
        <Undo className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)} className="h-8 w-8 p-0 hover:bg-slate-200" title="Давтах">
        <Redo className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Block Types */}
      <Button type="button" variant="ghost" size="sm" onClick={formatParagraph} className="h-8 w-8 p-0 hover:bg-slate-200" title="Энгийн текст">
        <Type className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => formatHeading("h1")} className="h-8 w-8 p-0 hover:bg-slate-200" title="Гарчиг 1">
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => formatHeading("h2")} className="h-8 w-8 p-0 hover:bg-slate-200" title="Гарчиг 2">
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => formatHeading("h3")} className="h-8 w-8 p-0 hover:bg-slate-200" title="Гарчиг 3">
        <Heading3 className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Text Formatting */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={`h-8 w-8 p-0 hover:bg-slate-200 ${isBold ? "bg-slate-200" : ""}`}
        title="Тод"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={`h-8 w-8 p-0 hover:bg-slate-200 ${isItalic ? "bg-slate-200" : ""}`}
        title="Налуу"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={`h-8 w-8 p-0 hover:bg-slate-200 ${isUnderline ? "bg-slate-200" : ""}`}
        title="Доогуур зураас"
      >
        <Underline className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}
        className={`h-8 w-8 p-0 hover:bg-slate-200 ${isStrikethrough ? "bg-slate-200" : ""}`}
        title="Дундуур зураас"
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
        className={`h-8 w-8 p-0 hover:bg-slate-200 ${isCode ? "bg-slate-200" : ""}`}
        title="Код"
      >
        <Code className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Lists */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        className="h-8 w-8 p-0 hover:bg-slate-200"
        title="Цэгтэй жагсаалт"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
        className="h-8 w-8 p-0 hover:bg-slate-200"
        title="Дугаартай жагсаалт"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Quote */}
      <Button type="button" variant="ghost" size="sm" onClick={formatQuote} className="h-8 w-8 p-0 hover:bg-slate-200" title="Ишлэл">
        <Quote className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Alignment */}
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")} className="h-8 w-8 p-0 hover:bg-slate-200" title="Зүүн тийш">
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")} className="h-8 w-8 p-0 hover:bg-slate-200" title="Төвд">
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")} className="h-8 w-8 p-0 hover:bg-slate-200" title="Баруун тийш">
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="sm" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")} className="h-8 w-8 p-0 hover:bg-slate-200" title="Тэгшлэх">
        <AlignJustify className="h-4 w-4" />
      </Button>
    </div>
  );
}
