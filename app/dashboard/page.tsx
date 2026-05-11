
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {

    const session = await auth();

    if (!session?.user?.id) {
        redirect("/auth/signin");

    } 
    const [applications, postedJobs] = await Promise.all([
        prisma.application.findMany({
            where: { userId: session.user.id },
            include: {
                job: {
                    include: {
                        postedBy: true
                    }
                }
            },
            orderBy: { appliedAt: "desc" }
        }),

        prisma.job.findMany({
            where: { postedById: session.user.id },
            include: {
                _count: {
                    select: { applications: true }
                }
            },
            orderBy: { postedAt: "desc" }
        })
    ]);
 
    return (
        <div className="space-y-8 py-2">
            <section className="rounded-3xl border border-[#e7dfcf] bg-[#fffdf8] p-6 shadow-[0_10px_28px_rgba(51,65,85,0.06)] sm:p-8">
                <p className='mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6b7280]'>Dashboard</p>
                <h1 className="text-3xl font-bold tracking-tight text-[#1f2937]">Welcome back, {session.user.name ?? "there"}</h1>
                <p className="mt-2 text-sm text-[#6b7280]">Monitor your posted jobs and applications in one place.</p>
            </section>

            <div className="grid gap-6 lg:grid-cols-2">

                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-[#1f2937]">Posted Jobs</h2>
                        <Link href="/jobs/post" className="text-sm font-semibold text-[#0f766e] hover:text-[#115e59]">Post a New Job</Link>

                    </div>


                    <div className="rounded-2xl border border-[#e7dfcf] bg-[#fffdf8] p-6 shadow-[0_8px_20px_rgba(51,65,85,0.05)]">
                        {postedJobs.length === 0 ? (
                            <p className="rounded-xl border border-dashed border-[#d7cbba] bg-white p-6 text-center text-sm text-[#6b7280]">You have not posted any jobs yet.</p>
                        ) : (
                            postedJobs.map((job: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                                <div key={job.id} className="border-b border-[#ede4d4] py-5 last:border-0 last:pb-0 first:pt-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="mb-1 text-lg font-semibold text-[#1f2937]">{job.title}</h3>
                                            <p className="mb-2 text-sm text-[#6b7280]">{job.company}</p>
                                            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#6b7280]">
                                                <span className='rounded-full bg-[#efe7d8] px-2.5 py-1'>{job.location}</span>
                                                <span>{job.type}</span>
                                                <span>Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}</span>


                                            </div>

                                        </div>

                                        <div className="text-right">
                                            <span className="inline-flex items-center rounded-full bg-[#e6f4f1] px-2.5 py-1 text-xs font-semibold text-[#115e59]">
                                                {job._count.applications} applications
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end gap-4">
                                        <Link href={`/jobs/${job.id}`} className="text-sm font-semibold text-[#0f766e] hover:text-[#115e59]">View Job</Link>
                                        <Link href={`/dashboard/applications/${job.id}`} className="text-sm font-semibold text-[#6b7280] hover:text-[#1f2937]">View Applications</Link>

                                    </div>
                                </div>
                            ))
                        )}

                    </div>

                </div>


                <div>
                    <h2 className="mb-4 text-xl font-semibold text-[#1f2937]">Your Applications</h2>

                    <div className="rounded-2xl border border-[#e7dfcf] bg-[#fffdf8] p-6 shadow-[0_8px_20px_rgba(51,65,85,0.05)]">
                        {applications.length === 0 ? (
                            <p className="rounded-xl border border-dashed border-[#d7cbba] bg-white p-6 text-center text-sm text-[#6b7280]">You have not applied for any jobs yet.</p>
                        ) : (
                            applications.map((application: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
                                <div key={application.id} className="border-b border-[#ede4d4] py-5 last:border-0 last:pb-0 first:pt-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="mb-1 text-lg font-semibold text-[#1f2937]">{application.job.title}</h3>
                                            <p className="mb-2 text-sm text-[#6b7280]">{application.job.company}</p>
                                            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#6b7280]">
                                                <span className='rounded-full bg-[#efe7d8] px-2.5 py-1'>{application.job.location}</span>
                                                <span>{application.job.type}</span>
                                                <span>Applied {formatDistanceToNow(new Date(application.appliedAt), { addSuffix: true })}</span>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                application.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                                    application.status === "accepted" ? "bg-green-100 text-green-800" :
                                                        "bg-red-100 text-red-800"
                                            }`}>
                                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end gap-4">
                                        <Link href={`/jobs/${application.jobId}`} className="text-sm font-semibold text-[#0f766e] hover:text-[#115e59]">View Job</Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
