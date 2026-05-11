import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function JobsPage({ searchParams }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {

    const { q, type, location } = await searchParams;
    const query = q as string | undefined;
    const searchType = type as string | undefined;
    const searchLocation = location as string | undefined;


    const jobs = await prisma.job.findMany({

        where: {
            AND: [
                query ? {
                    OR: [
                        { title: { contains: query, mode: "insensitive" } },
                        { company: { contains: query, mode: "insensitive" } },
                        { description: { contains: query, mode: "insensitive" } },
                    ],
                } : {},
                searchType ? { type: searchType } : {},
                searchLocation ? { location: { contains: searchLocation, mode: "insensitive" } } : {},
            ],
        },

        orderBy: { postedAt: "desc" },
        include: { postedBy: true }
    });

    return (
        <div className='space-y-8'>
            <section className='rounded-3xl border border-[#e7dfcf] bg-[#fffdf8] p-6 shadow-[0_8px_26px_rgba(51,65,85,0.06)] sm:p-8'>
                <h1 className='mb-2 text-3xl font-bold tracking-tight text-[#1f2937]'>Find Jobs</h1>
                <p className='mb-6 text-sm text-[#6b7280]'>Search by role, company, type, or location.</p>
                <form className='grid gap-3 md:grid-cols-3'>
                    <input
                        type="text"
                        name='q'
                        defaultValue={query ?? ""}
                        placeholder='Search jobs, companies, skills'
                        className='w-full rounded-xl border border-[#d9ccb7] bg-white px-4 py-2.5 text-sm text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20'
                    />
                    <select
                        name='type'
                        defaultValue={searchType ?? ""}
                        className='w-full rounded-xl border border-[#d9ccb7] bg-white px-4 py-2.5 text-sm text-[#1f2937] outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20'
                    >
                        <option value=''>All Types</option>
                        <option value='full-time'>Full-Time</option>
                        <option value='part-time'>Part-Time</option>
                        <option value='contract'>Contract</option>
                        <option value='internship'>Internship</option>
                    </select>
                    <input
                        type="text"
                        name='location'
                        defaultValue={searchLocation ?? ""}
                        placeholder='Location'
                        className='w-full rounded-xl border border-[#d9ccb7] bg-white px-4 py-2.5 text-sm text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20'
                    />
                    <button type='submit' className='md:col-span-3 rounded-xl bg-[#0f766e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#115e59]'>
                        Search Jobs
                    </button>
                </form>
            </section>

            <section className='grid gap-5'>
                {jobs.length === 0 && (
                    <div className='rounded-2xl border border-dashed border-[#d7cbba] bg-[#fffdf8] p-10 text-center'>
                        <h2 className='text-lg font-semibold text-[#1f2937]'>No jobs found</h2>
                        <p className='mt-2 text-sm text-[#6b7280]'>Try changing your search terms or filters.</p>
                    </div>
                )}
                {jobs.map((job) => (
                    <article key={job.id} className='rounded-2xl border border-[#e7dfcf] bg-[#fffdf8] p-6 shadow-[0_6px_18px_rgba(51,65,85,0.04)]'>

                        <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-start'>
                            <div>
                                <h2 className='mb-2 text-xl font-semibold text-[#1f2937]'>{job.title}</h2>
                                <p className='mb-3 text-sm font-medium text-[#4b5563]'>{job.company}</p>
                                <div className='mb-4 flex flex-wrap items-center gap-2 text-xs font-medium text-[#4b5563]'>
                                    <span className='rounded-full bg-[#efe7d8] px-2.5 py-1'>{job.location}</span>
                                    <span className='rounded-full bg-[#e6f4f1] px-2.5 py-1'>{job.type}</span>
                                </div>
                                <p className='mb-4 line-clamp-2 text-sm text-[#6b7280]'>{job.description}</p>
                            </div>

                            {job.salary && (
                                <span className='rounded-full bg-[#f4ede0] px-3 py-1.5 text-sm font-semibold text-[#1f2937]'>{job.salary}</span>
                            )}
                        </div>

                        <div className='flex items-center justify-between gap-3 border-t border-[#ede4d4] pt-4'>
                            <span className='text-xs text-[#6b7280]'>
                                Posted by {job.postedBy.name ?? "Unknown"}
                            </span>
                            <Link href={`/jobs/${job.id}`} className='text-sm font-semibold text-[#0f766e] hover:text-[#115e59]'>
                                View details &rarr;
                            </Link>
                        </div>
                    </article>

                ))}

            </section>
        </div>



    )
}
