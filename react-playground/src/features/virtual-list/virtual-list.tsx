import { FC, useState } from 'react';


interface VirtualListProps {  items: string[]; height?: number; };

const ITEM_HEIGHT = 30; // Height of each item in pixels

export const VirtualList: FC<VirtualListProps> = ({ items, height = 500 }) => {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * ITEM_HEIGHT;
  const visibleCount = Math.ceil(height / ITEM_HEIGHT) + 1;

  const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
  const endIndex = Math.min(items.length - 1, startIndex + visibleCount);

  const offsetY = startIndex * ITEM_HEIGHT;
  const visibleItems = items.slice(startIndex, endIndex + 1);


  console.log('totalHeight:', totalHeight);
  console.log('scrollTop:', scrollTop);
  console.log('startIndex:', startIndex, 'endIndex:', endIndex);
  console.log('visibleItems:', visibleItems);

  return (
    <div
      style={{
        height,
        overflowY: "auto",
        position: "relative",
        border: "1px solid #ccc",
      }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) =>
            <p key={index}>{item}</p>
          )}
        </div>
      </div>
    </div>
  );
}