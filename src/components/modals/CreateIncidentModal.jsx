import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../store/AppContext';
import { X } from 'lucide-react';
import './modals.css';

function CreateIncidentModal({ onClose }) {
  const { createIncident } = useAppContext();
  const [type, setType] = useState('Building Fire');
  const [customType, setCustomType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [peopleAffected, setPeopleAffected] = useState(0);
  const [priority, setPriority] = useState('Critical');

  // Auto-recommend priority
  useEffect(() => {
    if (type === 'Building Fire' || type === 'Medical Emergency') setPriority('Critical');
    else if (type === 'Traffic Collision') setPriority('High');
    else if (type === 'Flooded Road') setPriority('Medium');
    else if (type === 'Custom / Other') setPriority('Medium');
    else setPriority('Low');
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location) {
      alert('⚠ Location is required.');
      return;
    }

    const finalType = type === 'Custom / Other' && customType.trim() !== '' ? customType : type;
    
    // Calculate a mock priority score based on priority string
    let baseScore = 20;
    if (priority === 'Critical') baseScore = 90;
    else if (priority === 'High') baseScore = 70;
    else if (priority === 'Medium') baseScore = 40;
    
    createIncident({
      type: finalType,
      location,
      description,
      peopleAffected: parseInt(peopleAffected),
      priority,
      priorityScore: baseScore + Math.floor(Math.random() * 10)
    });
    
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content create-incident">
        <div className="modal-header">
          <h2>Create Incident</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label>Incident Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Building Fire">Building Fire</option>
              <option value="Medical Emergency">Medical Emergency</option>
              <option value="Traffic Collision">Traffic Collision</option>
              <option value="Flooded Road">Flooded Road</option>
              <option value="Road Obstruction">Road Obstruction</option>
              <option value="Custom / Other">Custom / Other</option>
            </select>
          </div>

          {type === 'Custom / Other' && (
            <div className="form-group">
              <label>Custom Incident Type</label>
              <input 
                type="text" 
                value={customType} 
                onChange={(e) => setCustomType(e.target.value)} 
                placeholder="e.g. Hazardous Spill"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Location</label>
            <input 
              type="text" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              placeholder="e.g. Dhanmondi 27"
              required
            />
          </div>

          <div className="form-group">
            <label>People Affected</label>
            <input 
              type="number" 
              value={peopleAffected} 
              onChange={(e) => setPeopleAffected(e.target.value)} 
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label>Override Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          
          <div className="recommended-priority">
            <strong>Current Priority: <span className={`badge ${priority.toLowerCase()}`}>{priority}</span></strong>
            <p className="text-sm text-secondary" style={{marginTop: '0.25rem'}}>Auto-recommended based on incident type. You can override it above.</p>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Create Incident</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateIncidentModal;
