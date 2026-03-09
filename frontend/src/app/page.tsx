import Link from 'next/link';
import FeaturedTemplates from '@/components/FeaturedTemplates';

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/30 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 py-24 sm:py-32 text-center">
          <div className="text-6xl mb-6">&#9835;</div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
              Bardic Inspiration
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Every spell deserves a song
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 transition-all shadow-lg shadow-violet-900/40 hover:shadow-violet-900/60 hover:-translate-y-0.5"
          >
            Start Composing &#9835;
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-slate-100 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '1',
              icon: '\u{1F4DC}',
              title: 'Pick a Spell',
              desc: 'Choose from the bard spell list, cantrips, or class features.',
            },
            {
              step: '2',
              icon: '\u{1F3B5}',
              title: 'Choose a Genre',
              desc: 'Select a musical style from fantasy ballads to modern genres.',
            },
            {
              step: '3',
              icon: '\u2728',
              title: 'Get Lyrics',
              desc: 'AI generates thematic song lyrics tailored to your spell and style.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="text-center bg-slate-800/40 border border-slate-700/30 rounded-xl p-8"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-600/30 text-violet-400 text-sm font-bold mb-3">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <FeaturedTemplates />
      </section>

      {/* Quick links */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/spells', label: 'Bard Spell Compendium', icon: '\u{1F4DC}' },
            { href: '/genres', label: 'Musical Genres', icon: '\u{1F3B6}' },
            { href: '/templates', label: 'Curated Templates', icon: '\u{1F3AD}' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/40 border border-slate-700/30 hover:border-violet-500/40 hover:bg-slate-800/60 transition-all group"
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="font-medium text-slate-300 group-hover:text-violet-300 transition-colors">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
