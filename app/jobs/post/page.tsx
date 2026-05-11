"use client"
import React, { useState } from 'react'

export default function PostJobPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
   
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title"),
            company: formData.get("company"),
            location: formData.get("location"),
            type: formData.get("type"),
            description: formData.get("description"),
            salary: formData.get("salary"),
        };
       
        try {
            const response = await fetch("/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const payload = await response.json().catch(() => null);
                throw new Error(payload?.message || "Unable to post the job right now.");
            }

            window.location.href = "/jobs";

        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Unable to post the job right now.");
            }
        } finally {
            setIsSubmitting(false);
        }

    };

    return (
        <div className='mx-auto max-w-3xl'>

            <section className='rounded-3xl border border-[#e7dfcf] bg-[#fffdf8] p-6 shadow-[0_10px_28px_rgba(51,65,85,0.06)] sm:p-8'>
                <div className='mb-8'>
                    <p className='mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7280]'>Hiring workflow</p>
                    <h1 className='text-3xl font-bold tracking-tight text-[#1f2937]'>Post a New Job</h1>
                    <p className='mt-2 text-sm text-[#6b7280]'>Create a clean, clear listing to attract the right candidates.</p>
                </div>

                {errorMessage && (
                    <div className='mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700'>
                        {errorMessage}
                    </div>
                )}

                <form className='space-y-6' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title" className='block text-sm font-semibold text-[#374151]'>Job Title</label>
                    <input type="text" id="title" name="title" required
                        className='mt-2 block w-full rounded-xl border border-[#d9ccb7] bg-white px-4 py-2.5 text-sm text-[#1f2937] placeholder:text-[#9ca3af] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20' />
                </div>


                <div>
                    <label htmlFor="company" className='block text-sm font-semibold text-[#374151]'>Company</label>
                    <input type="text" id="company" name="company" required
                      className='mt-2 block w-full rounded-xl border border-[#d9ccb7] bg-white px-4 py-2.5 text-sm text-[#1f2937] placeholder:text-[#9ca3af] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20' />
                </div>


                <div>
                    <label htmlFor="location" className='block text-sm font-semibold text-[#374151]'>Location</label>
                    <input type="text" id="location" name="location" required
                        className='mt-2 block w-full rounded-xl border border-[#d9ccb7] bg-white px-4 py-2.5 text-sm text-[#1f2937] placeholder:text-[#9ca3af] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20' />

                </div>

                <div>
                    <label htmlFor="type" className='block text-sm font-semibold text-[#374151]'>Job Type</label>
                    <select id="type" name="type" required
                        className='mt-2 block w-full rounded-xl border border-[#d9ccb7] bg-white px-4 py-2.5 text-sm text-[#1f2937] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20'>
                        <option value="">Select Job Type</option>
                        <option value="full-time">Full-Time</option>
                        <option value="part-time">Part-Time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                    </select>

                </div>
                <div>
                    <label htmlFor="description" className='block text-sm font-semibold text-[#374151]'>Job Description</label>
                    <textarea id="description" name="description" rows={6} required
                        className='mt-2 block w-full rounded-xl border border-[#d9ccb7] bg-white px-4 py-2.5 text-sm text-[#1f2937] placeholder:text-[#9ca3af] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20' />
                </div>

                <div>
                    <label htmlFor="salary" className='block text-sm font-semibold text-[#374151]'>Salary (optional)</label>
                    <input type="text" id="salary" name="salary" placeholder='e.g... $60,000 - $80,000'
                        className='mt-2 block w-full rounded-xl border border-[#d9ccb7] bg-white px-4 py-2.5 text-sm text-[#1f2937] placeholder:text-[#9ca3af] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20' />

                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className='w-full rounded-xl bg-[#0f766e] px-4 py-3 text-sm font-semibold text-white hover:bg-[#115e59] disabled:cursor-not-allowed disabled:opacity-60'
                >
                    {isSubmitting ? "Posting..." : "Post Job"}
                </button>



            </form>
            </section>

        </div>
    )
}
