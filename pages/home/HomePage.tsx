import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Главная страница</h1>
    <Link to="/passengers-table">
      <button>Открыть таблицу пассажиров</button>
    </Link>
  </div>
);

export default HomePage;
