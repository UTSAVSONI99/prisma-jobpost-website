import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default async function Home() {
  const recentJobs = await prisma.job.findMany({
    take: 3,
    orderBy: {
      postedAt: "desc",
    },
    include: {
      postedBy: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-[#e7dfcf] bg-[#fffdf8] px-6 py-16 text-center shadow-sm sm:px-10">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Find Your Dream Job
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
          Discover thousands of job opportunities with top companies
        </p>
        <Link
          href="/jobs"
          className="inline-flex rounded-full bg-[#0f766e] px-6 py-3 text-base font-semibold text-white hover:bg-[#115e59]"
        >
          Browse Jobs
        </Link>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-gray-900">Recent Jobs</h2>
          <Link
            href="/jobs"
            className="text-sm font-semibold text-[#0f766e] hover:text-[#115e59]"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentJobs.map((job: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
            <article
              key={job.id}
              className="flex h-full flex-col rounded-2xl border border-[#e7dfcf] bg-[#fffdf8] p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {job.title}
              </h3>
              <p className="mb-3 text-sm font-medium text-gray-600">{job.company}</p>
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-600">
                <span className="rounded-full bg-[#efe7d8] px-2.5 py-1">{job.location}</span>
                <span className="rounded-full bg-[#e6f4f1] px-2.5 py-1">{job.type}</span>
              </div>
              <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">
                {job.description}
              </p>
              <p className="mb-5 text-xs text-gray-500">
                Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}
              </p>
              <Link
                href={`/jobs/${job.id}`}
                className="mt-auto text-sm font-semibold text-[#0f766e] hover:text-[#115e59]"
              >
                View details
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}