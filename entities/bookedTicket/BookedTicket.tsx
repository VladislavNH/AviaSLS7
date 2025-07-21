import styles from './BookedTicket.module.scss';
import type { BookedTicketProps } from './BookedTicketTypes';
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { FaSuitcaseRolling, FaSuitcase, FaExchangeAlt, FaChair, FaPen } from 'react-icons/fa';
import { SiS7Airlines } from 'react-icons/si';

interface Props {
  bookedTicket: BookedTicketProps;
}

const getIcon = (value: boolean, IconComponent: React.ElementType) => (
  <IconComponent className={`${styles.icon} ${value ? styles.active : ''}`} />
);

const BookedTicket: React.FC<Props> = ({ bookedTicket }) => {
  return (
    <div className={styles.flightCard}>
      <div className={styles.dateContainer}>
        <div className={styles.dayOfWeek}>{bookedTicket.dayOfWeek}</div>
        <div className={styles.date}>{bookedTicket.date}</div>
        <div className={styles.month}>{bookedTicket.month}</div>
      </div>
      <div className={styles.infoTable}>
        <Space className={styles.flightInfoHeader} direction="horizontal">
          <div className={styles.airline}>
            <SiS7Airlines style={{ color: '#BED603', fontSize: '20px' }} />
            {bookedTicket.airline}
          </div>
          <button className={styles.directFlight}>
            Прямой рейс <DownOutlined />
          </button>
        </Space>
        <Space direction="horizontal" className={styles.routeInfo}>
          <div className={styles.departureTime}>{bookedTicket.departureTime}</div>
          <div className={styles.route}>
            <div className={styles.routePoints}>{bookedTicket.departureReduction}</div>
            <div className={styles.routePoints}>{bookedTicket.arrivalReduction}</div>
          </div>
          <div className={styles.arrivalTime}>{bookedTicket.arrivalTime}</div>
        </Space>
        <Space direction="horizontal" className={styles.routeDuration}>
          <div className={styles.departureCity}>Томск</div>
          <div className={styles.flightDuration}>{bookedTicket.flightDuration}</div>
          <div className={styles.departureCity}>Москва</div>
        </Space>
      </div>
      <div className={styles.priceContainer}>
        <div className={styles.flightClass}>
          <div className={styles.tariffName}>{bookedTicket.flightClass}</div>
          <div className={styles.tariffIcons}>
            {getIcon(bookedTicket.features.handLuggage, FaSuitcaseRolling)}
            {getIcon(bookedTicket.features.luggage, FaSuitcase)}
            {getIcon(bookedTicket.features.exchange, FaExchangeAlt)}
            {getIcon(bookedTicket.features.refund ?? false, FaChair)}
          </div>
        </div>
        <div className={styles.priceWrapper}>
          <div className={styles.price}>{bookedTicket.price.toLocaleString()} ₽</div>
          {bookedTicket.remainingSeats && (
            <div className={styles.remainingSeats}>
              <ExclamationCircleOutlined style={{ marginRight: '5px' }} /> Осталось{' '}
              {bookedTicket.remainingSeats}
            </div>
          )}
        </div>
      </div>
      <button className={styles.buttonEdit}>
        <FaPen />
      </button>
    </div>
  );
};

export default BookedTicket;
