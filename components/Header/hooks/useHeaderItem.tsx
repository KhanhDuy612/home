import { HeaderItem } from '../header.interface';

export const useHeaderItem = () => {
  const renderItem = (item: HeaderItem) => {
    const { isActive } = item;
    return (
      <li className="mr-[25px]">
        <a href="/artists" className={isActive ? 'active-link' : 'hover-underline-animation'}>
          {item.name}
        </a>
      </li>
    );
  };

  return { renderItem };
};
