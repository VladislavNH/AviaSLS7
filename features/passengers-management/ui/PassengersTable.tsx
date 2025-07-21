import { useGetPassengersQuery, type Passenger } from '../../../entities/passenger';
import type { Column } from '../../../shared/model/Column.types';
import { Table } from '../../admin-table';
import { useNavigate } from 'react-router-dom';

const columns: Column<Passenger>[] = [
  { key: 'id', title: 'ID', sortable: true, width: 60 },
  { key: 'fullname', title: 'Имя, Фамилия, Отчество', sortable: true, width: 254 },
  { key: 'gender', title: 'Пол', sortable: true, width: 80 },
  { key: 'phone', title: 'Телефон', sortable: true, width: 130 },
  { key: 'birthDate', title: 'Дата рождения', sortable: true, width: 115 },
  { key: 'serialNumber', title: 'Серийный номер', sortable: true, width: 125 },
  { key: 'citizenship', title: 'Гражданство', sortable: true, width: 150 },
  { key: 'passportIssuingDate', title: 'Дата выдачи паспорта', sortable: true, width: 115 },
];

const PassengersTable = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetPassengersQuery();

  const handleRowClick = (passenger: Passenger) => {
    console.log('Selected user:', passenger);
  };

  const handleSelectionChange = (selected: Passenger[]) => {
    console.log('Selected rows:', selected);
  };

  const handleError = () => {
    navigate('/');
  };

  return (
    <>
      <Table
        title="Пассажиры"
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        rowKey="id"
        selectable
        onRowClick={handleRowClick}
        onSelectionChange={handleSelectionChange}
        onError={handleError}
      />
    </>
  );
};

export default PassengersTable;
