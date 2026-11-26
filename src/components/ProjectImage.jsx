export default function ProjectImage({ project, sizes = '(max-width: 640px) 94vw, 420px' }) {
  if (!project.photo) {
    return <span className="flex h-full items-center justify-center px-4 text-lg font-semibold text-white">{project.platform}</span>;
  }
  const base = '/images/proof/' + project.photo;
  return <img src={base + '.webp'} srcSet={base + '-small.webp 320w, ' + base + '.webp ' + project.width + 'w'}
    sizes={sizes} width={project.width} height={project.height} alt={project.alt}
    loading="lazy" className="h-full w-full object-contain" />;
}
