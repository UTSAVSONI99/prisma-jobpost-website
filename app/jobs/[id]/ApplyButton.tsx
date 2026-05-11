"use client"


import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ApplyButton({ jobId }: { jobId: string }) {

    const { data: session, status } = useSession();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [applicationStatus, setApplicationStatus] = useState<"idle" | "error" | "success">("idle");
    const [isApplying, setIsApplying] = useState(false);


    const handleApply = async () => {
        if (!session) {
            router.push("/auth/signin");
            return;
        }



        setErrorMessage("");
        setApplicationStatus("idle");
        setIsApplying(true);


        try {
            const response = await fetch(`/api/jobs/${jobId}/apply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }

            });

            if (!response.ok) {
                const payload = await response.json().catch(() => null);
                throw new Error(payload?.message || "Failed to apply for this job.");
            }

            setApplicationStatus("success");

        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Failed to apply for the job.");
            }
            setApplicationStatus("error");
        } finally {
            setIsApplying(false);

        }
    }




    if (status === "loading") {
        return <button disabled className="w-full rounded-xl border border-[#d9ccb7] bg-white px-6 py-3 text-sm font-medium text-[#6b7280]">Loading...</button>
    }

    if (applicationStatus === "success") {

        return (

            <div className="text-center">
                <p className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                    Application submitted successfully!
                </p>
                <Link href="/dashboard"
                    className="text-sm font-semibold text-[#0f766e] hover:text-[#115e59]">View your application</Link>
            </div>
        );
    }


    return (
        <>

            <button onClick={handleApply}
                disabled={isApplying}
                className="w-full rounded-xl bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#115e59] disabled:cursor-not-allowed disabled:opacity-60">
                {isApplying ? "Applying..." : "Apply for this position"}
            </button>
            {applicationStatus === "error" && (
                <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700">
                    {errorMessage}
                </p>
            )}
        </>
    )
}
