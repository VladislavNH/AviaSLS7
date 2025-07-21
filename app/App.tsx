import AppRoutes from './AppRoutes';
import TicketSearch from '@/features/TicketSearch/TicketSearch/TicketSearch';
import { store } from '@/features/TicketSearch/model/store';
import { ReturnFlightSelector } from '@/shared/ui/ThereBack/ReturnFlightSelector/ReturnFlightSelector';
import { TestDateOption } from '@/shared/ui/ThereBack/ReturnFlightSelector/TestDateOption';
import { ThereFlightSelector } from '@/shared/ui/ThereBack/ThereFlightSelector/ThereFlightSelector';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
          <div className="app">
            <header className="app-header" />
            <main className="app-main">
              <TicketSearch />

              <ReturnFlightSelector
                route="Москва → Томск"
                titleDate="чт, 19 июня"
                dates={TestDateOption}
                onDateChange={(opt) => console.log('Возврат:', opt)}
                onClassChange={(cls) => console.log('Класс:', cls)}
              />

              <ThereFlightSelector
                route="Москва → Томск"
                titleDate="чт, 19 июня"
                dates={TestDateOption}
                onDateChange={(opt) => console.log('Туда:', opt)}
              />
            </main>
          </div>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
}
