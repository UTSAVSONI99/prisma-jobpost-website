"use client"
import React from 'react'

export default function PostJobPage() {
   
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
              await fetch("/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                
            });

            window.location.href = "/jobs"; // Redirect to home page after posting job

        } catch (error) {
            console.error("Error posting job:", error);
        }

    };
    return (
        <div className='max-w-2xl mx-auto'>

            <h1 className='text-2xl font-bold text-gray-900 mb-6'>Post a Job</h1>
            <form className='space-y-8' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title" className='block text-sm font-medium text-gray-700'> Job Title </label>
                    <input type="text" id="title" name="title" required
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                </div>


                <div>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-700'> company </label>
                    <input type="text" id="company" name="company" required
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                </div>


                <div>
                    <label htmlFor="location" className='block text-sm font-medium text-gray-700'> Location </label>
                    <input type="text" id="location" name="location" required
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />

                </div>

                <div>
                    <label htmlFor="type" className='block text-sm font-medium text-gray-700'> Job Type </label>
                    <select id="type" name="type" required
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
                        <option value=""> Select Job Type </option>
                        <option value="full-time"> Full-Time </option>
                        <option value="part-time"> Part-Time </option>
                        <option value="contract"> Contract </option>
                        <option value="internship"> Internship </option>
                    </select>

                </div>
                <div>
                    <label htmlFor="description" className='block text-sm font-medium text-gray-700'> Job Description </label>
                    <textarea id="description" name="description" rows={6} required
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                </div>

                <div>
                    <label htmlFor="salary" className='block text-sm font-medium text-gray-700'> salary(optional) </label>
                    <input type="text" id="salary" name="salary" placeholder='e.g... $60,000 - $80,000'
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />

                </div>

                <button type="submit" className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'> Post Job </button>



            </form>

        </div>
    )
}
