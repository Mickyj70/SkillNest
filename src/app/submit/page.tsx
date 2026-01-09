"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Link as LinkIcon,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SubmitResourcePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form State
  const [url, setUrl] = useState("");
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    type: "Article",
    level: "Beginner",
    skill: "React",
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  async function handleFetchMetadata() {
    if (!url) {
      toast.error("Please enter a valid URL");
      return;
    }
    setLoading(true);
    // Simulate API call for metadata extraction
    setTimeout(() => {
      setMetadata({
        ...metadata,
        title: "Extracted Title from Website",
        description:
          "This is a placeholder description that would normally be fetched from the OG tags of the provided URL.",
      });
      setLoading(false);
      nextStep();
      toast.success("Metadata extracted successfully!");
    }, 1500);
  }

  async function handleSubmit() {
    setLoading(true);
    setTimeout(() => {
      toast.success("Resource submitted for review!");
      router.push("/skills");
    }, 1500);
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 flex justify-between items-center">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                step >= s
                  ? "border-primary bg-primary text-white"
                  : "border-surface text-text-secondary"
              }`}
            >
              {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
            </div>
            {s < 3 && (
              <div
                className={`h-[2px] w-12 sm:w-24 bg-surface ${
                  step > s ? "bg-primary" : ""
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="border-surface bg-background">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Share a Resource
              </CardTitle>
              <CardDescription>
                Enter the URL of the learning resource you want to share.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Resource URL</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
                  <Input
                    id="url"
                    placeholder="https://example.com/learn-react"
                    className="bg-surface border-surface pl-10"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-primary hover:bg-primary-dark"
                onClick={handleFetchMetadata}
                disabled={loading}
              >
                {loading ? "Fetching Metadata..." : "Next Step"}{" "}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">
                Verify Details
              </CardTitle>
              <CardDescription>
                We&apos;ve extracted these details. Feel free to refine them.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={metadata.title}
                  onChange={(e) =>
                    setMetadata({ ...metadata, title: e.target.value })
                  }
                  className="bg-surface border-surface"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <textarea
                  id="desc"
                  rows={4}
                  className="w-full rounded-lg border border-surface bg-surface px-4 py-2 text-sm focus:border-primary focus:outline-none"
                  value={metadata.description}
                  onChange={(e) =>
                    setMetadata({ ...metadata, description: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Resource Type</Label>
                  <select
                    className="w-full rounded-lg border border-surface bg-surface px-4 py-2 text-sm"
                    value={metadata.type}
                    onChange={(e) =>
                      setMetadata({ ...metadata, type: e.target.value })
                    }
                  >
                    <option>Article</option>
                    <option>Video</option>
                    <option>Course</option>
                    <option>Tool</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Difficulty Level</Label>
                  <select
                    className="w-full rounded-lg border border-surface bg-surface px-4 py-2 text-sm"
                    value={metadata.level}
                    onChange={(e) =>
                      setMetadata({ ...metadata, level: e.target.value })
                    }
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                className="bg-primary hover:bg-primary-dark"
                onClick={nextStep}
              >
                Next Step <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in bg-linear-to-b from-primary/5 to-transparent duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-success" /> Final Review
              </CardTitle>
              <CardDescription>
                Confirm your submission to help others learn.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-xl border border-surface bg-surface/20 p-6 space-y-4">
                <div className="flex gap-2">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {metadata.type}
                  </Badge>
                  <Badge variant="outline" className="border-surface">
                    {metadata.level}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold">{metadata.title}</h3>
                <p className="text-sm text-text-secondary line-clamp-2">
                  {metadata.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-text-secondary">
                  <LinkIcon className="h-3 w-3" />
                  <span className="truncate">{url}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg bg-surface/40 p-4 text-xs text-text-secondary border border-surface">
                <Info className="h-4 w-4 text-primary shrink-0" />
                <p>
                  Your submission will be reviewed by our moderators before
                  being published to the platform.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pb-8">
              <Button variant="ghost" onClick={prevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                className="bg-primary hover:bg-primary-dark px-8"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Resource"}
              </Button>
            </CardFooter>
          </div>
        )}
      </Card>
    </div>
  );
}
