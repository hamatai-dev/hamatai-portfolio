import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Badge } from '@/components/ui/Badge';
import { works } from '@/data/work';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'works' });
  return { title: t('title') };
}

function WorkCard({
  work,
  t,
}: {
  work: (typeof works)[number];
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="group bg-surface-card rounded-2xl border border-white/5 overflow-hidden hover:border-accent/20 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative h-52 bg-surface-raised overflow-hidden">
        <Image
          src={work.image}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-primary font-bold text-lg mb-2">{work.title}</h2>
        <p className="text-secondary text-sm leading-relaxed mb-4">
          {work.description}
        </p>

        {/* Tech */}
        <div className="flex flex-wrap gap-2 mb-5">
          {work.technologies.map((tech) => (
            <Badge key={tech} variant="blue">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-5 pt-4 border-t border-white/5">
          {work.liveUrl && (
            <a
              href={work.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-accent hover:text-accent-light text-sm font-semibold transition-colors"
            >
              {t('viewSite')} ↗
            </a>
          )}
          {work.githubUrl && (
            <a
              href={work.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-secondary hover:text-primary text-sm font-semibold transition-colors"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WorksPage() {
  const t = useTranslations('works');

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
      <SectionTitle
        subtitle={t('subtitle')}
        title={t('title')}
        description={t('description')}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {works.map((work) => (
          <WorkCard key={work.id} work={work} t={t} />
        ))}
      </div>
    </div>
  );
}
