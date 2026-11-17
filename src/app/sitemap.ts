import type { MetadataRoute } from 'next';
import { caseStudies, site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/sobre/', ...caseStudies.map((c) => `/cases/${c.slug}/`)].map((path) => ({
    url: `${site.url}${path}`,
  }));
}
