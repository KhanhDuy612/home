export function getWorksUrl(work: any): string {
  if (!work || !work?.slug) {
    return '';
  }

  switch (work?.type) {
    case 'painting':
      return `/paintings/${work.slug}`;
    case 'print':
      return `/prints/${work.slug}`;
    case 'drawing':
      return `/drawings/${work.slug}`;
    case 'embroidery painting':
      return `/embroidery/${work.slug}`;
    default:
      return `/works/${work.slug}`;
  }
}
