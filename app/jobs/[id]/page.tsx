

import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatDistance } from 'date-fns';
import ApplyButton from './ApplyButton';

export default async function Jobpage({ params, }: { params: Promise<{ id: string }> }) {


    const jobId = (await params).id;

    const job = await prisma.job.findUnique({
        where: { id: jobId },
        include: { postedBy: true }
    });

    if (!job) {
        notFound();
    }



    return (
        <div className='mx-auto max-w-5xl'>
            <div className='mb-5'>
                <Link href="/jobs" className='text-sm font-semibold text-[#0f766e] hover:text-[#115e59]'>
                    &larr; Back to jobs
                </Link>
            </div>

            <div className='grid gap-6 lg:grid-cols-[1fr_320px]'>
                <article className='rounded-3xl border border-[#e7dfcf] bg-[#fffdf8] p-8 shadow-[0_10px_28px_rgba(51,65,85,0.06)]'>
                    <h1 className='mb-2 text-3xl font-bold tracking-tight text-[#1f2937]'>{job.title}</h1>
                    <p className='mb-4 text-lg font-medium text-[#4b5563]'>{job.company}</p>

                    <div className='mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#4b5563]'>
                        <span className='rounded-full bg-[#efe7d8] px-3 py-1.5'>{job.location}</span>
                        <span className='rounded-full bg-[#e6f4f1] px-3 py-1.5'>{job.type}</span>
                        {job.salary && <span className='rounded-full bg-[#f4ede0] px-3 py-1.5'>{job.salary}</span>}
                    </div>

                    <div className='mb-8 text-sm text-[#6b7280]'>
                        Posted by {job.postedBy.name ?? "Unknown"} · {formatDistance(new Date(job.postedAt), new Date(), { addSuffix: true })}
                    </div>

                    <div>
                        <h2 className='mb-4 text-xl font-semibold text-[#1f2937]'>Job Description</h2>
                        <div className='whitespace-pre-wrap leading-relaxed text-[#4b5563]'>{job.description}</div>
                    </div>
                </article>

                <aside className='h-fit rounded-3xl border border-[#e7dfcf] bg-[#fffdf8] p-6 shadow-[0_10px_28px_rgba(51,65,85,0.06)]'>
                    <h3 className='mb-2 text-lg font-semibold text-[#1f2937]'>Ready to apply?</h3>
                    <p className='mb-5 text-sm text-[#6b7280]'>Submit your application now and track progress from your dashboard.</p>

                    <ApplyButton jobId={job.id} />
                </aside>
            </div>
        </div>

    );
}
