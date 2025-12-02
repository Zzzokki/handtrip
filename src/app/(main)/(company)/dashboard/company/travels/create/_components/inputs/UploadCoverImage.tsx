"use client";

import { DragEvent, useState, type FormEvent } from "react";
import { upload } from "@vercel/blob/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, CloudUpload, X, Image as ImageIcon, Loader2, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type UploadCoverImageProps = {
  onUploadComplete: (url: string) => void;
};

export const UploadCoverImage = ({ onUploadComplete }: UploadCoverImageProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const reset = () => {
    setIsUploading(false);
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setProgress(0);
    setUploadedUrl(null);
  };

  const handleSubmit = async () => {
    setIsUploading(true);

    if (!file) return;

    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        onUploadProgress: (progressEvent) => {
          setProgress(progressEvent.percentage);
        },
      });

      setUploadedUrl(blob.url);

      toast.success("Зураг амжилттай байршуулагдлаа!", {
        description: "Зургийн холбоос хуулагдлаа",
      });

      onUploadComplete(blob.url);
    } catch {
      toast.error("Зураг байршуулахад алдаа гарлаа");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (file: File) => {
    if (file.type.split("/")[0] !== "image")
      return toast.error("Зөвхөн зураг оруулах боломжтой!", {
        description: "PNG, JPG, JPEG форматын файл сонгоно уу",
      });

    if (file.size / 1024 / 1024 > 50)
      return toast.error("Зурагны хэмжээ 50MB-с их байж болохгүй!", {
        description: `Таны сонгосон файл: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
      });

    setFile(file);
    setPreview(URL.createObjectURL(file));
    setUploadedUrl(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFileChange(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden border-2 border-dashed border-slate-300 bg-slate-50/50 hover:border-blue-400 hover:bg-blue-50/30 transition-all">
        <CardContent className="p-0">
          <label htmlFor="image-upload" className={`group relative flex h-80 cursor-pointer flex-col items-center justify-center transition-all ${dragActive ? "bg-blue-100/50" : ""}`}>
            <div className="absolute z-[5] h-full w-full" onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop} />

            {!preview ? (
              <div className="relative z-[3] flex flex-col items-center justify-center p-10 text-center">
                <div className={`mb-4 rounded-full bg-blue-100 p-4 transition-transform ${dragActive ? "scale-110" : "scale-100"}`}>
                  <CloudUpload className={`h-10 w-10 text-blue-600 transition-transform group-hover:scale-110`} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">Зураг байршуулах</h3>
                <p className="mb-1 text-sm text-slate-600">
                  Энд чирж оруулах эсвэл <span className="font-semibold text-blue-600">энд дарж сонгоно уу</span>
                </p>
                <p className="text-xs text-slate-500">PNG, JPG, JPEG форматыг дэмжинэ • Хамгийн их 50MB</p>
              </div>
            ) : (
              <div className="relative h-full w-full">
                <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">{file?.name}</span>
                    </div>
                    <p className="text-xs mt-1 text-white/80">Өөр зураг сонгохын тулд дарна уу</p>
                  </div>
                </div>
                {uploadedUrl && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-500 text-white border-0 shadow-lg">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Байршуулсан
                    </Badge>
                  </div>
                )}
              </div>
            )}

            <input
              id="image-upload"
              name="image"
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={isUploading}
              onChange={(event) => {
                const file = event.currentTarget?.files?.[0];
                if (file) {
                  handleFileChange(file);
                }
              }}
            />
          </label>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isUploading || !file || !!uploadedUrl}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Байршуулж байна...
            </>
          ) : uploadedUrl ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Байршуулсан
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Байршуулах
            </>
          )}
        </Button>

        {(file || uploadedUrl) && (
          <Button type="button" variant="outline" onClick={reset} disabled={isUploading} className="border-slate-300 hover:bg-slate-100">
            <X className="w-4 h-4 mr-2" />
            Цэвэрлэх
          </Button>
        )}
      </div>
    </div>
  );
};
