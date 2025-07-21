import styles from './ReturnFlightSelector.module.scss';
import type { DateOption } from './type';
import cn from 'classnames';
import { useState, useRef, useEffect } from 'react';

interface Props {
  route: string;
  titleDate: string;
  dates: DateOption[];
  onDateChange?: (opt: DateOption) => void;
  onClassChange?: (cls: 'economy' | 'business') => void;
}

export const ReturnFlightSelector: React.FC<Props> = ({
  route,
  titleDate,
  dates,
  onDateChange,
  onClassChange,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedClass, setSelectedClass] = useState<'economy' | 'business'>('economy');
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = listRef.current;
    if (node) {
      const card = node.children[selectedIdx] as HTMLElement;
      card?.scrollIntoView({ inline: 'center', behavior: 'smooth' });
    }
  }, [selectedIdx]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Выберите перелёт обратно · чт, 19 июня</h2>
          <div className={styles.sub}>
            {route} · {titleDate}
          </div>
        </div>
        <div className={styles.subsidy}>
          %<span>Субсидии и льготы</span>
        </div>
      </div>
      <div className={styles.carouselWrapper}>
        <button
          className={cn(styles.navButton, styles.prev)}
          onClick={() => setSelectedIdx((i) => Math.max(0, i - 1))}
          disabled={selectedIdx === 0}
        >
          ‹
        </button>

        <div className={styles.carousel} ref={listRef}>
          {dates.map((opt, i) => (
            <div
              key={i}
              className={cn(styles.dateCard, i === selectedIdx && styles.selected)}
              onClick={() => {
                setSelectedIdx(i);
                onDateChange?.(opt);
              }}
            >
              <div className={styles.weekday}>{opt.weekday},</div>
              <div className={styles.day}>{opt.date}</div>
              <div className={styles.price}>от {opt.price.toLocaleString()} ₽</div>
            </div>
          ))}
        </div>

        <button
          className={cn(styles.navButton, styles.next)}
          onClick={() => setSelectedIdx((i) => Math.min(dates.length - 1, i + 1))}
          disabled={selectedIdx === dates.length - 1}
        >
          ›
        </button>
      </div>
      <div className={styles.controlsRow}>
        <div className={styles.classSwitch}>
          <button
            className={cn(styles.classBtn, selectedClass === 'economy' && styles.active)}
            onClick={() => {
              setSelectedClass('economy');
              onClassChange?.('economy');
            }}
          >
            Эконом
          </button>
          <button
            className={cn(styles.classBtn, selectedClass === 'business' && styles.active)}
            onClick={() => {
              setSelectedClass('business');
              onClassChange?.('business');
            }}
          >
            Бизнес
          </button>
        </div>

        <div className={styles.filtersGroup}>
          <button className={styles.filter}>Время</button>
          <button className={styles.filter}>Пересадки</button>
        </div>

        <button className={cn(styles.filter, styles.sort)}>Сортировать по</button>
      </div>
    </div>
  );
};
