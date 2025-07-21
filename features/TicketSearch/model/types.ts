export interface Category {
  id: string;
  name: string;
}

export interface Destination {
  id: string;
  name: string;
}

export interface SearchCriteria {
  currentLocation: string;
  destination: string;
  passengers: number;
  dateFrom?: string;
  dateTo?: string;
  tripType: 'roundTrip' | 'oneWay';
  noTransfer: boolean;
  seatType: string;
}
