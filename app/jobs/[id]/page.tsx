

import { prisma } from '@/lib/prisma';
import { promises } from 'dns';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
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
        <div className='max-w-4xl mx-auto '>
            <div className='bg-white p-8 rounded-lg shadow-sm'>
                <div className=' mb-8'>
                    <Link href="/jobs" className='text-indigo-600 hover:text-indigo-500 mb-4 inline-block font-medium'>&larr; Back to Jobs</Link>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>{job.title}</h1>
                    <p className='text-gray-700 text-lg mb-4'>{job.company} </p>
                    <div className='flex items-center gap-4 text-gray-500 mb-6'>
                        <span>{job.location}</span>
                        <span>.</span>
                        <span>{job.type}</span>
                        {job.salary && (
                            <>
                                <span>.</span>
                                <span className='text-gray-900 font-medium'> {job.salary}</span>
                            </>
                        )}
                    </div>

                    <div className='flex items-center text-sm text-gray-500 '>
                        <span>Posted by {job.postedBy.name}</span>
                        <span className='mx-2'>.</span>
                        <span>{formatDistance(new Date(job.postedAt), new Date(), { addSuffix: true })}</span>

                    </div>

                    <div className='prose max-w-none'>  
                        <h2 className='text-xl font-semibold text-gray-900 mb-4'>Job Description</h2>
                        <div className='text-gray-600 whitespace-pre-wrap' >{job.description}</div>

                    </div>

                    <div className='mt-8 pt-8 border-t border-gray-200'>
                        <ApplyButton jobId={job.id} />
                    </div>
                </div>
            </div>

        </div>


    );


}
