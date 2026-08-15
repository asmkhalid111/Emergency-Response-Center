import React from 'react';
import { useAppContext } from '../store/AppContext';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import './pages.css';

function Analytics() {
  const { incidents } = useAppContext();

  const totalIncidents = incidents.length;
  const criticalCount = incidents.filter(i => i.priority === 'Critical').length;
  const resolvedCount = incidents.filter(i => i.status === 'RESOLVED').length;
  const resolutionRate = totalIncidents === 0 ? 0 : Math.round((resolvedCount / totalIncidents) * 100);

  // Data for Priority Chart
  const priorityData = [
    { name: 'Critical', count: criticalCount, fill: '#EF4444' },
    { name: 'High', count: incidents.filter(i => i.priority === 'High').length, fill: '#F97316' },
    { name: 'Medium', count: incidents.filter(i => i.priority === 'Medium').length, fill: '#EAB308' },
    { name: 'Low', count: incidents.filter(i => i.priority === 'Low').length, fill: '#60A5FA' }
  ];

  // Data for Type Chart
  const typeCounts = incidents.reduce((acc, inc) => {
    acc[inc.type] = (acc[inc.type] || 0) + 1;
    return acc;
  }, {});
  
  const typeData = Object.keys(typeCounts).map((key, index) => ({
    name: key,
    value: typeCounts[key]
  }));

  const COLORS = ['#0EA5E9', '#22C55E', '#F97316', '#8B5CF6', '#EF4444', '#EAB308'];

  return (
    <div className="page-container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, color: 'var(--text-secondary)' }}>Total Incidents (24h)</h3>
            <BarChart3 size={20} color="var(--accent-primary)" />
          </div>
          <div className="value">{totalIncidents}</div>
        </div>
        
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, color: 'var(--text-secondary)' }}>Critical Emergencies</h3>
            <AlertTriangle size={20} color="var(--status-critical)" />
          </div>
          <div className="value" style={{ color: 'var(--status-critical)' }}>{criticalCount}</div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, color: 'var(--text-secondary)' }}>Avg Response Time</h3>
            <TrendingUp size={20} color="var(--status-high)" />
          </div>
          <div className="value">4m 12s</div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, color: 'var(--text-secondary)' }}>Resolution Rate</h3>
            <CheckCircle2 size={20} color="var(--status-success)" />
          </div>
          <div className="value">{resolutionRate}%</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="panel" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
          <div className="panel-header">Incidents by Priority</div>
          <div className="panel-content" style={{ padding: '1rem', height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} />
                <YAxis stroke="var(--text-secondary)" tick={{fill: 'var(--text-secondary)'}} allowDecimals={false} />
                <RechartsTooltip 
                  cursor={{fill: 'var(--bg-tertiary)'}}
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel" style={{ height: '350px', display: 'flex', flexDirection: 'column' }}>
          <div className="panel-header">Incidents by Type</div>
          <div className="panel-content" style={{ padding: '1rem', height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                />
                <Legend wrapperStyle={{ color: 'var(--text-primary)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
