import React, { createContext, useContext, useState } from 'react';
import { 
  initialIncidents, 
  initialUnits, 
  initialHospitals, 
  initialActivityLog,
  initialNotifications
} from '../data/mockData';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [units, setUnits] = useState(initialUnits);
  const [hospitals] = useState(initialHospitals);
  const [activityLog, setActivityLog] = useState(initialActivityLog);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [mapType, setMapType] = useState('Street (OSM)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const addActivity = (message, type) => {
    const newLog = {
      id: `AL-${Date.now()}`,
      time: new Date().toISOString(),
      message,
      type
    };
    setActivityLog(prev => [newLog, ...prev]);
  };

  const addNotification = (title, message) => {
    const newNotif = {
      id: `N-${Date.now()}`,
      title,
      message,
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const createIncident = (incidentData) => {
    const id = `INC-${Math.floor(2000 + Math.random() * 1000)}`;
    const newIncident = {
      ...incidentData,
      id,
      timeReported: new Date().toISOString(),
      status: 'AWAITING DISPATCH',
      assignedUnits: [],
      // Mock coordinates near center
      coordinates: [23.7505 + (Math.random() - 0.5) * 0.1, 90.3752 + (Math.random() - 0.5) * 0.1]
    };
    
    setIncidents(prev => [newIncident, ...prev]);
    addActivity(`🚨 New ${incidentData.priority.toLowerCase()} incident created: ${incidentData.type} — ${incidentData.location}`, 'Incident');
    addNotification(`New Incident: ${incidentData.type}`, incidentData.location);
    return id;
  };

  const dispatchUnit = (incidentId, unitId) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          status: 'DISPATCHED',
          assignedUnits: [...inc.assignedUnits, unitId]
        };
      }
      return inc;
    }));

    setUnits(prev => prev.map(unit => {
      if (unit.id === unitId) {
        return {
          ...unit,
          status: 'EN ROUTE',
          assignedIncident: incidentId,
          eta: '03:15' // Mock ETA
        };
      }
      return unit;
    }));

    const unit = units.find(u => u.id === unitId);
    addActivity(`${unit.type} Unit ${unitId} dispatched to Incident ${incidentId}`, 'Dispatch');
    addNotification('Unit Dispatched', `${unit.type} Unit ${unitId} is en route.`);
  };

  const markUnitOnScene = (unitId) => {
    setUnits(prev => prev.map(unit => {
      if (unit.id === unitId) {
        // Also update incident status
        setIncidents(incPrev => incPrev.map(inc => 
          inc.id === unit.assignedIncident ? { ...inc, status: 'ON SCENE' } : inc
        ));
        
        addActivity(`${unit.type} Unit ${unitId} marked on scene`, 'Unit');
        return { ...unit, status: 'ON SCENE', eta: null };
      }
      return unit;
    }));
  };

  const resolveIncident = (incidentId) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === incidentId ? { ...inc, status: 'RESOLVED' } : inc
    ));
    
    // Free up units
    setUnits(prev => prev.map(unit => {
      if (unit.assignedIncident === incidentId) {
        return {
          ...unit,
          status: 'AVAILABLE',
          assignedIncident: null,
          eta: null
        };
      }
      return unit;
    }));

    addActivity(`✓ Incident ${incidentId} resolved`, 'System');
  };

  return (
    <AppContext.Provider value={{
      incidents,
      units,
      hospitals,
      activityLog,
      notifications,
      mapType,
      setMapType,
      isSidebarOpen,
      setIsSidebarOpen,
      createIncident,
      dispatchUnit,
      markUnitOnScene,
      resolveIncident,
      setNotifications
    }}>
      {children}
    </AppContext.Provider>
  );
};
