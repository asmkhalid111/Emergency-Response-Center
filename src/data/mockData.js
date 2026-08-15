export const initialIncidents = [
  {
    id: 'INC-2048',
    type: 'Building Fire',
    location: 'Dhanmondi 27',
    priority: 'Critical',
    priorityScore: 94,
    peopleAffected: 4,
    timeReported: new Date(Date.now() - 2 * 60000).toISOString(), // 2 mins ago
    status: 'AWAITING DISPATCH',
    description: 'Large fire reported on the 4th floor of a commercial building.',
    assignedUnits: [],
    coordinates: [23.7505, 90.3752] // roughly Dhanmondi
  },
  {
    id: 'INC-2049',
    type: 'Medical Emergency',
    location: 'Gulshan Avenue',
    priority: 'Critical',
    priorityScore: 88,
    peopleAffected: 1,
    timeReported: new Date(Date.now() - 5 * 60000).toISOString(),
    status: 'DISPATCHED',
    description: 'Elderly patient experiencing severe chest pains.',
    assignedUnits: ['M-12'],
    coordinates: [23.7925, 90.4078] // roughly Gulshan
  },
  {
    id: 'INC-2050',
    type: 'Traffic Collision',
    location: 'Mirpur Road',
    priority: 'High',
    priorityScore: 75,
    peopleAffected: 3,
    timeReported: new Date(Date.now() - 10 * 60000).toISOString(),
    status: 'AWAITING DISPATCH',
    description: 'Two-vehicle collision blocking main intersection.',
    assignedUnits: [],
    coordinates: [23.8052, 90.3628] // roughly Mirpur
  },
  {
    id: 'INC-2051',
    type: 'Flooded Road',
    location: 'Uttara',
    priority: 'Medium',
    priorityScore: 45,
    peopleAffected: 0,
    timeReported: new Date(Date.now() - 30 * 60000).toISOString(),
    status: 'EN ROUTE',
    description: 'Heavy waterlogging blocking traffic access.',
    assignedUnits: ['P-15'],
    coordinates: [23.8759, 90.3982] // roughly Uttara
  },
  {
    id: 'INC-2052',
    type: 'Road Obstruction',
    location: 'Banani',
    priority: 'Low',
    priorityScore: 20,
    peopleAffected: 0,
    timeReported: new Date(Date.now() - 45 * 60000).toISOString(),
    status: 'AWAITING DISPATCH',
    description: 'Fallen tree blocking one lane.',
    assignedUnits: [],
    coordinates: [23.7940, 90.4000] // roughly Banani
  }
];

export const initialUnits = [
  { id: 'F-07', type: 'Fire', status: 'AVAILABLE', location: 'Dhanmondi Station', assignedIncident: null, eta: null, coordinates: [23.7485, 90.3750] },
  { id: 'F-03', type: 'Fire', status: 'AVAILABLE', location: 'Mirpur Station', assignedIncident: null, eta: null, coordinates: [23.8020, 90.3600] },
  { id: 'M-12', type: 'Medical', status: 'EN ROUTE', location: 'Moving towards Gulshan', assignedIncident: 'INC-2049', eta: '05:40', coordinates: [23.7900, 90.4000] },
  { id: 'M-08', type: 'Medical', status: 'AVAILABLE', location: 'Banani Hospital', assignedIncident: null, eta: null, coordinates: [23.7940, 90.4050] },
  { id: 'P-21', type: 'Police', status: 'ON SCENE', location: 'Motijheel', assignedIncident: 'INC-1990', eta: null, coordinates: [23.7250, 90.4150] },
  { id: 'P-15', type: 'Police', status: 'EN ROUTE', location: 'Moving towards Uttara', assignedIncident: 'INC-2051', eta: '12:20', coordinates: [23.8500, 90.3900] }
];

export const initialHospitals = [
  {
    id: 'H-01',
    name: 'City General Hospital',
    distance: '1.2 km',
    status: 'Operational',
    capacity: 72,
    availableBeds: 18,
    icu: 4,
    trauma: 'Available',
    ambulanceReceiving: 'Open',
    coordinates: [23.7550, 90.3700]
  },
  {
    id: 'H-02',
    name: 'Northside Medical Center',
    distance: '4.5 km',
    status: 'Operational',
    capacity: 90,
    availableBeds: 5,
    icu: 0,
    trauma: 'Full',
    ambulanceReceiving: 'Diverting',
    coordinates: [23.8200, 90.3800]
  },
  {
    id: 'H-03',
    name: 'East End Trauma Center',
    distance: '2.8 km',
    status: 'Operational',
    capacity: 120,
    availableBeds: 34,
    icu: 12,
    trauma: 'Available',
    ambulanceReceiving: 'Open',
    coordinates: [23.7712, 90.4132]
  },
  {
    id: 'H-04',
    name: 'South Valley Clinic',
    distance: '6.1 km',
    status: 'High Load',
    capacity: 45,
    availableBeds: 2,
    icu: 1,
    trauma: 'Limited',
    ambulanceReceiving: 'Open',
    coordinates: [23.7230, 90.3950]
  },
  {
    id: 'H-05',
    name: 'Central University Hospital',
    distance: '3.0 km',
    status: 'Operational',
    capacity: 250,
    availableBeds: 60,
    icu: 18,
    trauma: 'Available',
    ambulanceReceiving: 'Open',
    coordinates: [23.7310, 90.3965]
  },
  {
    id: 'H-06',
    name: 'Metro Heart Institute',
    distance: '5.2 km',
    status: 'Operational',
    capacity: 80,
    availableBeds: 15,
    icu: 5,
    trauma: 'N/A',
    ambulanceReceiving: 'Diverting',
    coordinates: [23.8115, 90.4215]
  }
];

export const initialActivityLog = [
  { id: 'AL-100', time: new Date(Date.now() - 5 * 60000).toISOString(), message: 'Medical Unit 12 dispatched to Incident INC-2049', type: 'Dispatch' },
  { id: 'AL-99', time: new Date(Date.now() - 6 * 60000).toISOString(), message: '🚨 New critical incident created: Medical Emergency — Gulshan Avenue', type: 'Incident' },
  { id: 'AL-98', time: new Date(Date.now() - 15 * 60000).toISOString(), message: 'Police Unit 21 marked on scene at INC-1990', type: 'Unit' },
  { id: 'AL-97', time: new Date(Date.now() - 25 * 60000).toISOString(), message: '✓ Incident INC-2042 resolved', type: 'System' }
];

export const initialNotifications = [
  { id: 'N-1', title: '🔴 Critical Incident', message: 'Building Fire reported in Dhanmondi', isRead: false },
  { id: 'N-2', title: '🚑 Unit Dispatch', message: 'Medical Unit 12 en route to Gulshan', isRead: false },
  { id: 'N-3', title: '⚠ Response Delay', message: 'Fire Unit 03 delayed by traffic', isRead: false }
];
