import useApiQuery from '@/hooks/useApiQuery';
import { IGlobal } from '@/types/global';
import getAssetUrl from '@/utils/asset-url';

export default function PageTitle({ title }: { title: string }) {
  const { data } = useApiQuery<IGlobal>('/items/global');
  const global = data?.data;
  return (
    <div className="flex items-center gap-4 mb-4">
      <img
        src={getAssetUrl(global?.logo_without_text || '')}
        alt={title}
        className="w-16 h-16 object-contain"
      />
      <h1 className="text-black title-section">{title}</h1>
    </div>
  );
}
