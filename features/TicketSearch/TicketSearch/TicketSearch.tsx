import {
  useGetCategoriesQuery,
  useLazyGetDestinationsQuery,
  useSearchTicketsMutation,
} from '../model/ticketSearchApi';
import type { Destination, SearchCriteria } from '../model/types';
import styles from './TicketSearch.module.scss';
import { Select, Input, Checkbox, DatePicker, Radio, Button, Space, Spin } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

const { RangePicker } = DatePicker;
const { Group: RadioGroup } = Radio;
const DEFAULT_DEST_LIMIT = 20;

const TicketSearch: React.FC = () => {
  const { data: categories = [], isLoading: catLoading } = useGetCategoriesQuery();
  const [fetchOrig, { isFetching: origLoading }] = useLazyGetDestinationsQuery();
  const [fetchDest, { isFetching: destLoading }] = useLazyGetDestinationsQuery();
  const [origList, setOrigList] = useState<Destination[]>([]);
  const [origPage, setOrigPage] = useState(1);
  const [origSearch, setOrigSearch] = useState('');
  const [destList, setDestList] = useState<Destination[]>([]);
  const [destPage, setDestPage] = useState(1);
  const [destSearch, setDestSearch] = useState('');
  const [criteria, setCriteria] = useState<SearchCriteria>({
    currentLocation: '',
    destination: '',
    passengers: 1,
    dateFrom: undefined,
    dateTo: undefined,
    tripType: 'roundTrip',
    noTransfer: false,
    seatType: 'business',
  });

  const [searchTickets, { isLoading: searching }] = useSearchTicketsMutation();
  useEffect(() => {
    loadOrig('', 1);
    loadDest('', 1);
  }, []);
  const loadOrig = (search: string, page: number) => {
    fetchOrig({ search, page, limit: DEFAULT_DEST_LIMIT })
      .unwrap()
      .then((data) => {
        setOrigList(page === 1 ? data : [...origList, ...data]);
        setOrigPage(page);
      });
  };

  const loadDest = (search: string, page: number) => {
    fetchDest({ search, page, limit: DEFAULT_DEST_LIMIT })
      .unwrap()
      .then((data) => {
        setDestList(page === 1 ? data : [...destList, ...data]);
        setDestPage(page);
      });
  };
  const onOrigSearch = (val: string) => {
    setOrigSearch(val);
    loadOrig(val, 1);
  };
  const onOrigScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const t = e.currentTarget;
    if (t.scrollHeight - t.scrollTop === t.clientHeight && !origLoading) {
      loadOrig(origSearch, origPage + 1);
    }
  };

  const onDestSearch = (val: string) => {
    setDestSearch(val);
    loadDest(val, 1);
  };
  const onDestScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const t = e.currentTarget;
    if (t.scrollHeight - t.scrollTop === t.clientHeight && !destLoading) {
      loadDest(destSearch, destPage + 1);
    }
  };
  const updateField = <K extends keyof SearchCriteria>(field: K, value: SearchCriteria[K]) => {
    setCriteria((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tickets = await searchTickets(criteria).unwrap();
      console.log('Получили билеты:', tickets);
    } catch (err) {
      console.error('Ошибка поиска', err);
    }
  };

  return (
    <div className={styles.searchTicketsBlock}>
      <h2 className={styles.header}>Найти билеты</h2>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <Space className={styles.row} style={{ width: '100%' }}>
          <Space className={styles.column} direction="vertical">
            <div className={styles.formGroup}>
              <label>Откуда</label>
              <Select
                showSearch
                filterOption={false}
                placeholder="Город откуда"
                className={styles.input}
                value={criteria.currentLocation || undefined}
                notFoundContent={origLoading ? <Spin size="small" /> : null}
                onSearch={onOrigSearch}
                onPopupScroll={onOrigScroll}
                onChange={(v) => updateField('currentLocation', v as string)}
                options={origList.map((d) => ({ label: d.name, value: d.id }))}
                autoFocus
              />
            </div>
            <div className={styles.formGroup}>
              <label>Куда</label>
              <Select
                showSearch
                filterOption={false}
                placeholder="Город куда"
                className={styles.input}
                value={criteria.destination || undefined}
                notFoundContent={destLoading ? <Spin size="small" /> : null}
                onSearch={onDestSearch}
                onPopupScroll={onDestScroll}
                onChange={(v) => updateField('destination', v as string)}
                options={destList.map((d) => ({ label: d.name, value: d.id }))}
              />
            </div>
          </Space>
          <Space className={styles.column} direction="vertical">
            <div className={styles.formGroup}>
              <label>Количество пассажиров</label>
              <Input
                type="number"
                min={1}
                className={styles.input}
                value={criteria.passengers}
                onChange={(e) => updateField('passengers', +e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <Checkbox
                className={styles.transferCheckbox}
                checked={criteria.noTransfer}
                onChange={(e) => updateField('noTransfer', e.target.checked)}
              >
                Искать билеты без пересадок
              </Checkbox>
            </div>
          </Space>
          <Space className={styles.column} direction="vertical" align="center">
            <div className={styles.formGroup}>
              <label>Дата</label>
              <RangePicker
                className={styles.datePicker}
                value={
                  criteria.dateFrom && criteria.dateTo
                    ? ([dayjs(criteria.dateFrom), dayjs(criteria.dateTo)] as [Dayjs, Dayjs])
                    : null
                }
                onChange={(vals) => {
                  if (vals) {
                    updateField('dateFrom', vals[0].format('YYYY-MM-DD'));
                    updateField('dateTo', vals[1].format('YYYY-MM-DD'));
                  }
                }}
                placeholder={['Туда', 'Обратно']}
              />
            </div>
          </Space>
          <Space className={styles.column} direction="vertical" align="center">
            <div className={styles.formGroup}>
              <RadioGroup
                className={styles.radio}
                value={criteria.tripType}
                onChange={(e) => updateField('tripType', e.target.value)}
                style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
              >
                <Radio value="roundTrip">Туда и обратно</Radio>
                <Radio value="oneWay">В одну сторону</Radio>
              </RadioGroup>
            </div>
            <div className={styles.formGroup}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.button}
                loading={searching}
              >
                Найти
              </Button>
            </div>
          </Space>
        </Space>
      </form>
    </div>
  );
};

export default TicketSearch;
