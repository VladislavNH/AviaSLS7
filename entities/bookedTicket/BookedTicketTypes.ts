export interface BookedTicketProps {
  date: string;
  dayOfWeek: string;
  month: string;
  departureTime: string;
  arrivalTime: string;
  departureReduction: string;
  arrivalReduction: string;
  from: string;
  to: string;
  airline: string;
  flightDuration: string;
  price: number;
  isDirectFlight: boolean;
  flightClass: string;
  features: {
    luggage: boolean;
    handLuggage: boolean;
    exchange: boolean;
    refund: boolean;
  };
  remainingSeats?: number;
}
