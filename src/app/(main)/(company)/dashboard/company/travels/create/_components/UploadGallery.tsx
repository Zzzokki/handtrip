"use client";

import { DragEvent, useState } from "react";
import { upload } from "@vercel/blob/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, CloudUpload, X, Image as ImageIcon, Loader2, CheckCircle2, Trash2, Image } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type UploadedImage = {
  file: File;
  preview: string;
  url?: string;
  isUploading: boolean;
  progress: number;
};

type UploadGalleryProps = {
  onUploadComplete: (urls: string[]) => void;
};

export const UploadGallery = ({ onUploadComplete }: UploadGalleryProps) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.split("/")[0] !== "image") {
        toast.error(`${file.name} - Зөвхөн зураг оруулах боломжтой!`);
        continue;
      }

      if (file.size / 1024 / 1024 > 50) {
        toast.error(`${file.name} - Зурагны хэмжээ 50MB-с их байж болохгүй!`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    const newImages: UploadedImage[] = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isUploading: false,
      progress: 0,
    }));

    setImages((prev) => [...prev, ...newImages]);
    toast.success(`${validFiles.length} зураг нэмэгдлээ`);
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
    handleFileChange(e.dataTransfer?.files);
  };

  const uploadImage = async (index: number) => {
    const image = images[index];
    if (!image || image.url || image.isUploading) return;

    setImages((prev) => prev.map((img, i) => (i === index ? { ...img, isUploading: true, progress: 0 } : img)));

    try {
      const blob = await upload(image.file.name, image.file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        onUploadProgress: (progressEvent) => {
          setImages((prev) => prev.map((img, i) => (i === index ? { ...img, progress: progressEvent.percentage } : img)));
        },
      });

      setImages((prev) => prev.map((img, i) => (i === index ? { ...img, url: blob.url, isUploading: false, progress: 100 } : img)));

      toast.success("Зураг амжилттай байршуулагдлаа!");
    } catch {
      toast.error("Зураг байршуулахад алдаа гарлаа");
      setImages((prev) => prev.map((img, i) => (i === index ? { ...img, isUploading: false, progress: 0 } : img)));
    }
  };

  const uploadAll = async () => {
    const pendingIndexes = images.map((img, index) => (!img.url && !img.isUploading ? index : -1)).filter((index) => index !== -1);

    if (pendingIndexes.length === 0) {
      const uploadedUrls = images.filter((img) => img.url).map((img) => img.url!);
      onUploadComplete(uploadedUrls);
      return;
    }

    for (const index of pendingIndexes) {
      await uploadImage(index);
    }

    const uploadedUrls = images.filter((img) => img.url).map((img) => img.url!);
    onUploadComplete(uploadedUrls);
  };

  const removeImage = (index: number) => {
    const image = images[index];
    if (image.preview) {
      URL.revokeObjectURL(image.preview);
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    images.forEach((img) => {
      if (img.preview) URL.revokeObjectURL(img.preview);
    });
    setImages([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const uploadedCount = images.filter((img) => img.url).length;
  const isAllUploaded = images.length > 0 && uploadedCount === images.length;
  const isUploading = images.some((img) => img.isUploading);

  return (
    <Card className="overflow-hidden shadow-sm">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Image className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-xl">Зургийн цомог байршуулах</CardTitle>
            <CardDescription>Аяллын багцын зургийн цомогт зориулж олон зураг байршуулах боломжтой</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-5">
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <Card key={index} className="overflow-hidden border-slate-200 relative group">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <img src={image.preview} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <p className="text-white text-xs font-medium truncate">{image.file.name}</p>
                        <p className="text-white/80 text-xs">{formatFileSize(image.file.size)}</p>
                      </div>
                    </div>

                    <div className="absolute top-2 right-2">
                      {image.url ? (
                        <Badge className="bg-green-500 text-white border-0 shadow-lg">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Байршуулсан
                        </Badge>
                      ) : image.isUploading ? (
                        <Badge className="bg-blue-500 text-white border-0 shadow-lg">
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          {Math.round(image.progress)}%
                        </Badge>
                      ) : null}
                    </div>

                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImage(index)}
                      disabled={image.isUploading}
                      className="absolute top-2 left-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    {image.isUploading && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200">
                        <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${image.progress}%` }} />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="overflow-hidden border-slate-200 relative group">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <label htmlFor="gallery-upload" className={`group relative flex h-full cursor-pointer flex-col items-center justify-center transition-all ${dragActive ? "bg-blue-100/50" : ""}`}>
                    <div className="absolute z-[5] h-full w-full" onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop} />

                    <div className="relative z-[3] flex flex-col items-center justify-center p-10 text-center">
                      <div className={`mb-4 rounded-full bg-blue-100 p-4 transition-transform ${dragActive ? "scale-110" : "scale-100"}`}>
                        <CloudUpload className={`h-10 w-10 text-blue-600 transition-transform group-hover:scale-110`} />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-slate-900">Зураг байршуулах</h3>
                    </div>

                    <input
                      id="gallery-upload"
                      name="gallery"
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      disabled={isUploading}
                      onChange={(event) => {
                        handleFileChange(event.currentTarget.files);
                        event.currentTarget.value = "";
                      }}
                    />
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {images.length > 0 && (
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={uploadAll}
                disabled={isUploading || isAllUploaded}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Байршуулж байна... ({uploadedCount}/{images.length})
                  </>
                ) : isAllUploaded ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Бүгдийг байршуулсан
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Бүгдийг байршуулах ({images.length})
                  </>
                )}
              </Button>

              <Button type="button" variant="outline" onClick={clearAll} disabled={isUploading} className="border-slate-300 hover:bg-slate-100">
                <X className="w-4 h-4 mr-2" />
                Бүгдийг цэвэрлэх
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
