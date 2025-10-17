import React from 'react'

const Home = () => {
  return (
    <>
    {/* Header */}
    <div className="min-h-screen bg-white text-black">
        <header className="w-full">
            <nav className="mx-auto max-w-full p-10 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
                <img src="/Logo/logo.svg" alt="Studio Yuki" className="h-5 w-auto select-none" />
                <span className="sr-only">Studio Yuki</span>
            </a>

            <div className="flex items-center gap-5">
                <a href="#playground" className="text-sm font-medium">Playground</a>
                <a
                href="#contact"
                className="inline-flex items-center rounded-full border border-black/10 bg-white gap-5 px-4 py-2 text-sm font-semibold shadow-sm hover:shadow transition-all"
                >
                Get in Touch
                </a>
            </div>
            </nav>
        </header>

        <main className="mx-auto max-w-xl">
            <section className="min-h-[70vh] flex flex-col items-center justify-center text-center">
            <h1 className="font-semibold text-5xl leading-[110%] mx-8">
                Transforming Ideas into Experiences
            </h1>

            <p className="mt-6 text-lg leading-[135%]">
                We are a design studio blending story, interaction, and technology to
                shape brand experiences that move users.
            </p>

            <div className="mt-8">
                <a
                href="#start"
                className="inline-flex items-center justify-center w-64 h-14 rounded-md bg-black text-sm font-semibold text-white gap-2"
                >
                Let’s Create Together
                </a>
            </div>
            </section>
        </main>
    </div>

    {/* Projects */}
    <div className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="rounded-xl border border-black/10 bg-white shadow-sm hover:shadow transition-shadow">
                <div className="p-2">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop"
                    alt="Project cover"
                    className="h-auto w-full object-cover aspect-[16/9] rounded-lg"
                    />
                    <div className="absolute bottom-2 right-2">
                    <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-xs font-medium text-gray-900 ring-1 ring-black/10">
                        Client: Placeholder
                    </span>
                    </div>
                </div>
                <div className="mt-2 mx-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-black">3d Product Showcase</p>
                    <span className="text-sm text-black opacity-40">2025</span>
                </div>
                </div>
            </article>
            </div>
            <div className="mt-8 flex justify-center">
            <button
                type="button"
                className="inline-flex items-center justify-center w-64 h-14 rounded-md text-black border border-black bg-white text-sm font-semibold gap-2"
            >
                View More
            </button>
            </div>
        </div>
    </div>

    {/* Services */}
    <div className="bg-[#F3F3F2]">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-lg font-semibold text-black">What We do</h2>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white p-8 min-h-[480px] flex flex-col justify-between relative overflow-hidden">
            <div className="pt-6 text-center">
            <h3 className="text-3xl md:text-4xl text-black font-medium tracking-normal leading-normal">
                Brand Identity<br className="hidden sm:block" /> Design
            </h3>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
            <span className="px-3 py-2 text-xs font-normal rounded-full bg-gray-100 text-gray-800">Visual Identity</span>
            <span className="px-3 py-2 text-xs font-normal rounded-full bg-gray-100 text-gray-800">Brand Strategy</span>
            <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#a4c3bf] text-gray-900">Brand Voice</span>
            <span className="px-3 py-2 text-xs font-normal rounded-full bg-gray-100 text-gray-800">Copywriting</span>
            <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#e7e7de] text-gray-800">Iconography</span>
            <span className="px-3 py-2 text-xs font-normal rounded-full bg-gray-100 text-gray-800">Illustration</span>
            <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#cfe1ff] text-blue-800">Logo</span>
            <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#d8b4b6] text-gray-900">3D</span>
            <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#b5a6c9] text-gray-900">Animation</span>
            </div>
        </div>

        <div className="rounded-xl bg-white p-8 min-h-[480px] flex flex-col justify-between relative overflow-hidden">
            <div className="pt-6 text-center">
            <h3 className="text-3xl md:text-4xl text-black font-medium tracking-normal leading-normal">
                Experience Design &<br className="hidden sm:block" /> Development
            </h3>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
            <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#c9a3a5] text-gray-900">Website</span>
            <span className="px-3 py-2 text-xs font-normal rounded-full bg-gray-100 text-gray-800">Landing Page</span>
            <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#a79ac6] text-gray-900">E-commerce</span>
            <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#9fb7b3] text-gray-900">Microsite</span>
            <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#cfe1ff] text-blue-800">Marketing sites</span>
            <span className="px-3 py-2 text-xs font-normal rounded-full bg-[#eceae8] text-gray-800">CMS</span>
            <span className="px-3 py-2 text-xs font-normal rounded-full bg-gray-100 text-gray-800">Framer Development</span>
            </div>
        </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Home