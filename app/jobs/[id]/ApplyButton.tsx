"use client"


import { set } from "date-fns";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { text } from "stream/consumers";

export default function ApplyButton({ jobId }: { jobId: string }) {

    const { data: session, status } = useSession();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>(" ");
    const [applicationStatus, setApplicationStatus] = useState<"idle" | "error" | "success">("idle");


    const handleApply = async () => {
        if (!session) {
            router.push("/auth/signin");
            return;
        }



        setErrorMessage(" ");
        setApplicationStatus("idle");


        try {
            const response = await fetch(`/api/jobs/${jobId}/apply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }

            });
            setApplicationStatus("success");

        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Failed to apply for the job.");
            }
            setApplicationStatus("error");

        }
    }




    if (status === "loading") {
        return <button disabled>Loading...</button>
    }

    if (applicationStatus === "success") {

        return (

            <div className="text-center">
                <p className="text-green-500 font-medium mb-4">
                    Application submitted successfully!
                </p>
                <Link href="/dashboard"
                    className="text-indigo-600 hover:text-indigo-700 font-medium">View Your Application</Link>
            </div>
        );
    }


    return (
        <>

            <button onClick={handleApply}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors duration-300">
                Apply for this position
            </button>
            {applicationStatus === "error" && <p style={{ color: "red", textAlign: "center", fontWeight: "medium" }}>{errorMessage}</p>}
        </>
    )
}
