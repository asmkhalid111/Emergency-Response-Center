# Emergency Services Dispatch & Crisis Queue
## AI Frontend & Wireframe Specification

## 1. Project Overview

Build a desktop-first web application called **Emergency Response Command Center**.

The product is an emergency operations and dispatch console for city emergency operators. It belongs to the category:

**Logistics, Smart Cities & Spatial Environments**

The application must allow an operator to:

> Detect → Prioritize → Locate → Dispatch → Track → Resolve

The interface should feel like a professional emergency operations/control-room system, not a generic admin dashboard or a marketing website.

### Primary user
Emergency dispatch operator / city emergency coordinator.

### Primary use case
The operator continuously monitors incoming incidents, determines urgency, locates incidents on a city map, assigns emergency resources, tracks their response, and resolves incidents.

### Design priority
1. Speed
2. Situational awareness
3. Clear priority hierarchy
4. Spatial awareness
5. Minimal cognitive load
6. Strong operational feedback
7. Consistent state changes

---

# 2. Platform & Visual Direction

## Platform

Desktop-first web application.

Target design:
- 1440 × 900 px primary viewport
- Responsive down to tablet
- Mobile is secondary

## Visual style

Use a professional dark command-center aesthetic.

### Suggested palette

- Background: very dark navy/charcoal
- Surface/cards: slightly lighter navy/charcoal
- Primary accent: blue/cyan
- Critical: red
- High: orange
- Medium: yellow/amber
- Available/success: green
- Text: high-contrast white/light gray
- Secondary text: muted gray

Do not make the entire interface red. Emergency colors should communicate operational states.

## Typography

Use a highly readable UI font such as:
- Inter
- Roboto

Avoid decorative fonts.

## Design characteristics

- Clean
- Dense but organized
- Professional
- High information hierarchy
- Large clickable targets
- Clear status badges
- Subtle animations
- Strong contrast
- Minimal unnecessary decoration

---

# 3. Global Application Layout

Use a persistent left sidebar.

## Sidebar

Brand:

**🚨 RESPONSE COMMAND**

Navigation:

- Dashboard
- Crisis Queue
- Live Map
- Response Units
- Hospitals
- Activity Log
- Analytics

Bottom:
- Settings
- Operator Profile

The active page must be visually highlighted.

## Global top bar

Every major page should have:

- Page title
- Breadcrumb where appropriate
- Global search
- Notification icon
- System status
- Current time
- Operator profile

Example:

`Crisis Queue    [Search incidents, units, locations...]    🟢 SYSTEM OPERATIONAL    🔔    Operator`

---

# 4. Global Search

Search should support:

- Incident ID
- Incident type
- Unit ID
- Unit type
- Location
- Hospital

Examples:

`INC-2048`
`Ambulance 12`
`Dhanmondi`

Search results should be grouped logically and clicking a result should navigate to the relevant detail page.

---

# 5. Dashboard

The Dashboard is the primary command-center screen.

## Required components

### Statistics cards

1. Active Incidents
2. Critical Incidents
3. Units Responding
4. Pending Dispatch

Each card should be clickable.

Examples:

- Clicking Active Incidents → Crisis Queue filtered to active incidents
- Clicking Critical → Crisis Queue filtered to critical incidents
- Clicking Units Responding → Response Units filtered to En Route
- Clicking Pending Dispatch → Crisis Queue filtered to Awaiting Dispatch

## Main dashboard layout

Use a large Live Map on the left and Crisis Queue on the right.

Below them show Active Response and Recent Activity.

### Dashboard structure

```text
Dashboard

[Active Incidents] [Critical] [Units Responding] [Pending Dispatch]

┌──────────────────────────────┐ ┌─────────────────────────────┐
│                              │ │ CRISIS QUEUE                │
│                              │ │                             │
│          LIVE MAP            │ │ 🔴 Building Fire            │
│                              │ │ 🔴 Medical Emergency        │
│          incidents           │ │ 🟠 Traffic Collision        │
│          emergency units     │ │ 🟡 Flooding                 │
│          hospitals           │ │                             │
└──────────────────────────────┘ └─────────────────────────────┘

ACTIVE RESPONSE
Unit → Incident → Status → ETA

RECENT ACTIVITY
```

---

# 6. Real-Time Incident Feed

The frontend should simulate incoming incidents using local/mock state.

When a new incident appears:

1. Add it to the Crisis Queue.
2. Add its marker to the map.
3. Update relevant statistics.
4. Increase notification count.
5. Show a subtle toast notification.
6. If critical, update the Critical counter.

Do not use aggressive flashing.

Example toast:

**🚨 New Critical Incident**
Building Fire — Dhanmondi 27

[View Incident]

---

# 7. Crisis Queue

This is one of the most important screens.

The queue must prioritize incidents by urgency.

## Filters

- All
- Critical
- High
- Medium
- Low

Additional filters:

- Incident Type
- Location
- Status

Search should filter immediately.

## Sorting

Allow:

- Priority
- Newest
- Oldest
- Response Time
- Distance

Default sorting:

**Priority — Highest First**

## Incident information

Each incident should show:

- Priority
- Incident type
- Incident ID
- Location
- Time since reported
- People affected
- Status
- Priority score
- Assigned unit if applicable
- View action

Example:

```text
🔴 CRITICAL

Building Fire
INC-2048

📍 Dhanmondi 27
👥 4 people affected
⏱ 2 min ago

🚒 Awaiting Dispatch

Priority: 94

[VIEW]
```

## Queue interaction

Clicking an incident opens Incident Details.

---

# 8. Create Incident

Provide a prominent:

**+ Create Incident**

button.

Open a modal or dedicated form.

## Form fields

- Incident Type
- Priority
- Location
- Description
- People Affected
- Additional Information

Priority should initially be automatically recommended.

Example:

Selecting `Building Fire`:

**Recommended Priority: 🔴 Critical**

Display a short explanation:

`Recommended based on incident type and reported casualties.`

Allow the operator to override the recommendation.

## Create behavior

When Create Incident is clicked:

1. Validate required fields.
2. Generate a unique incident ID.
3. Add the incident to application state.
4. Add it to Crisis Queue.
5. Add a map marker.
6. Update dashboard counters.
7. Add an Activity Log entry.
8. Show success toast.
9. Optionally open Incident Details.

Example:

**✓ Incident INC-2051 created successfully.**

---

# 9. Incident Details

This is a core screen.

Use a split layout.

## Left

Incident map/location.

## Right

Incident information:

- Incident ID
- Priority
- Incident type
- Location
- Time reported
- People affected
- Description
- Additional information

## Response section

Show assigned resources.

Example:

```text
🚒 Fire Unit 07
EN ROUTE
ETA 03:12

🚑 Medical Unit 12
ASSIGNED
ETA 06:40
```

## Actions

- Dispatch Unit
- Escalate
- Resolve

---

# 10. Incident Lifecycle

Every incident should have a visible lifecycle:

```text
REPORTED
   ↓
TRIAGED
   ↓
AWAITING DISPATCH
   ↓
DISPATCHED
   ↓
EN ROUTE
   ↓
ON SCENE
   ↓
RESOLVED
```

Use a horizontal or vertical progress timeline.

Completed states use checkmarks.

Current state is emphasized.

Future states are muted.

---

# 11. Dispatch Unit

Clicking **Dispatch Unit** opens a drawer/modal.

Show recommended available resources.

Each resource should include:

- Unit ID
- Type
- Distance
- Status
- Estimated arrival time

Example:

```text
RECOMMENDED RESOURCES

🚒 Fire Unit 07
1.2 km
AVAILABLE
ETA 03:12

🚒 Fire Unit 03
3.8 km
AVAILABLE
ETA 07:21

🚑 Medical Unit 12
2.1 km
AVAILABLE
ETA 05:40
```

The operator selects a resource and clicks:

**Confirm Dispatch**

Confirmation modal:

```text
CONFIRM DISPATCH

Incident: Building Fire
Resource: Fire Unit 07
Estimated Arrival: 03:12

[Cancel] [Confirm Dispatch]
```

## After dispatch

The frontend must actually update state:

- Incident → DISPATCHED
- Unit → EN ROUTE
- Map → show route
- ETA → displayed
- Dashboard → update
- Activity Log → add dispatch event
- Notification → show confirmation

Toast:

**✓ Fire Unit 07 dispatched.**

---

# 12. Live Map

Dedicated full-screen map page.

The map is central to the Smart City / Spatial Environment requirement.

## Map should show

- Incident markers
- Emergency units
- Hospitals
- Road closures
- Traffic where useful
- Response routes

## Marker categories

- 🔴 Critical Incident
- 🟠 High Priority
- 🟡 Medium Priority
- 🟢 Low Priority
- 🚑 Ambulance
- 🚒 Fire
- 🚓 Police
- 🏥 Hospital

## Map controls

- Zoom In
- Zoom Out
- Center City
- Toggle Incidents
- Toggle Units
- Toggle Hospitals
- Toggle Traffic

## Marker interaction

Clicking an incident marker opens:

```text
🔴 BUILDING FIRE
Dhanmondi 27
Critical
4 people affected
ETA: 03:12

[VIEW INCIDENT]
```

Clicking View Incident opens Incident Details.

Clicking a unit marker opens Unit Details.

---

# 13. Response Units

Show all emergency resources.

Tabs:

- All
- Available
- En Route
- On Scene
- Offline

Table/card fields:

- Unit ID
- Type
- Status
- Current Location
- Assigned Incident
- ETA

Example:

```text
UNIT     TYPE       STATUS       LOCATION       ETA

F-07     Fire       En Route     Dhanmondi      03:12
M-12     Medical    Available    Gulshan        —
P-21     Police     On Scene     Banani         —
```

---

# 14. Unit Details

Clicking a unit opens details.

Show:

- Unit ID
- Type
- Current status
- Current location
- Assigned incident
- ETA
- Crew size

Actions:

- View Incident
- Mark On Scene
- Mark Available

## Unit lifecycle

```text
AVAILABLE
   ↓
DISPATCHED
   ↓
EN ROUTE
   ↓
ON SCENE
   ↓
AVAILABLE
```

State changes must update related UI everywhere.

---

# 15. Hospitals

Hospitals are city emergency resources.

Show:

- Hospital name
- Distance
- Emergency status
- Capacity
- Available beds
- ICU availability
- Trauma availability
- Ambulance receiving status

Example:

```text
CITY GENERAL HOSPITAL

Emergency Department
🟢 Operational

Capacity
72%

Available Beds
18

ICU
4 available

Trauma
🟢 Available

Ambulance Receiving
🟢 Open
```

---

# 16. Activity Log

Record every important system action.

Examples:

```text
13:24
🚒 Fire Unit 07 dispatched
Incident INC-2048

13:21
🚨 New critical incident created
Building Fire — Dhanmondi

13:18
🚑 Medical Unit 12 marked available

13:12
✓ Incident INC-2042 resolved
```

Filters:

- All
- Incidents
- Dispatch
- Units
- System

---

# 17. Analytics

Keep analytics focused.

Statistics:

- Incidents Today
- Average Response Time
- Critical Incidents
- Resolution Rate

Charts:

- Incidents by Type
- Incidents by Priority
- Average Response Time
- Incidents by Area

Do not make analytics more important than the live operational screens.

---

# 18. Notifications

Global notification panel.

Examples:

```text
🔴 Critical Incident
Building Fire reported in Dhanmondi

🚑 Unit Available
Medical Unit 12 is now available

⚠ Response Delay
Fire Unit 03 delayed by traffic
```

Clicking a notification navigates to the relevant incident/unit.

---

# 19. Escalation

Critical incidents should have:

**Escalate**

button.

Modal:

```text
ESCALATE INCIDENT

Reason

○ More resources required
○ Situation worsening
○ Multiple casualties
○ Response delay
○ Other

Additional Note
[________________________]

[Cancel] [Escalate]
```

After escalation:

- Priority becomes Critical
- Notification is created
- Activity Log updates
- Dashboard counters update

---

# 20. Resolve Incident

Resolve button opens:

```text
RESOLVE INCIDENT

Resolution Type
[ Emergency Resolved ▼ ]

Notes
[________________________]

Resources will become available after resolution.

[Cancel] [Resolve Incident]
```

After resolution:

1. Incident → RESOLVED
2. Assigned units → AVAILABLE
3. Map marker becomes resolved/removed
4. Incident leaves active queue
5. Dashboard counters update
6. Activity Log records resolution
7. Resolution time is calculated

---

# 21. Error, Loading and Empty States

Implement polished states.

## Error

`⚠ Unable to dispatch unit. Please try again.`

## Missing field

`⚠ Location is required.`

## No resources

```text
NO AVAILABLE RESOURCES

There are currently no available
resources of this type.

[View Nearby Units]
```

## Empty queue

`✓ All clear — No active incidents require attention.`

## Empty notifications

`You're all caught up.`

Use skeleton loaders for major data sections.

---

# 22. Mock Data

Use realistic local/mock data.

Example incidents:

- INC-2048 — Building Fire — Dhanmondi 27 — Critical
- INC-2049 — Medical Emergency — Gulshan Avenue — Critical
- INC-2050 — Traffic Collision — Mirpur Road — High
- INC-2051 — Flooded Road — Uttara — Medium
- INC-2052 — Road Obstruction — Banani — Low

Example units:

- F-07
- F-03
- M-12
- M-08
- P-21
- P-15

The frontend must use shared application state so actions actually affect the interface.

---

# 23. Critical State Synchronization

The most important implementation requirement:

**Do not make interactions cosmetic.**

Example:

When Fire Unit F-07 is dispatched:

Before:

```text
Incident: AWAITING DISPATCH
Unit F-07: AVAILABLE
```

After:

```text
Incident: DISPATCHED
Unit F-07: EN ROUTE
```

And simultaneously:

- Route appears on map
- ETA appears
- Queue updates
- Dashboard updates
- Activity Log records it
- Notification appears

Likewise, when the unit becomes ON SCENE, all related views should update.

---

# 24. Primary Demo Flow

The most important end-to-end interaction should be:

```text
Create Incident
      ↓
Incident appears in Crisis Queue
      ↓
Priority automatically determined
      ↓
Incident appears on map
      ↓
Operator opens Incident Details
      ↓
Recommended resources displayed
      ↓
Operator selects Fire Unit 07
      ↓
Confirm Dispatch
      ↓
Unit becomes EN ROUTE
      ↓
Route + ETA appear
      ↓
Operator marks unit ON SCENE
      ↓
Incident status updates
      ↓
Operator resolves incident
      ↓
Unit becomes AVAILABLE
      ↓
Incident leaves active queue
      ↓
Activity Log records entire workflow
```

This flow must work smoothly in the frontend.

---

# 25. What NOT to build

Do not unnecessarily add:

- Social features
- Chat
- Billing
- Complex authentication
- Large admin management systems
- Excessive settings
- Unnecessary AI chatbot
- Huge analytics dashboards
- Unrelated smart-city features

Keep the product focused on:

**Detect → Prioritize → Locate → Dispatch → Track → Resolve**

---

# 26. Recommended Page List

Build these pages/screens:

1. Dashboard
2. Crisis Queue
3. Create Incident Modal
4. Incident Details
5. Live Map
6. Response Units
7. Unit Details
8. Hospitals
9. Hospital Details
10. Activity Log
11. Analytics
12. Notifications Panel
13. Escalation Modal
14. Resolve Incident Modal
15. Dispatch Resource Modal/Drawer

The actual navigation should remain simple; modals/drawers should handle contextual actions.

---

# 27. UX Principles

The interface should follow these principles:

### Priority first
Critical incidents must immediately stand out.

### Map + queue together
Operators need both what is happening and where it is happening.

### Minimal cognitive load
Do not make operators navigate through many screens to perform common actions.

### Clear state
Every incident and unit should always have an obvious current status.

### Immediate feedback
Every important action should provide visual confirmation.

### Consistency
Changing state in one place must update every relevant component.

### Safety through confirmation
Destructive/important actions such as dispatch, escalation, and resolution should use confirmation when appropriate.

### Accessibility
Do not communicate status through color alone. Combine color with text, icons, labels, and shape.

---

# 28. Success Criteria

The frontend is successful if a user can immediately answer:

1. What emergencies are happening?
2. Which ones are most urgent?
3. Where are they?
4. What resources are available?
5. Which units are responding?
6. What is the ETA?
7. What incidents still need dispatch?
8. What has been resolved?
9. What happened recently?

The operator should be able to create, dispatch, track, and resolve an incident without confusion.
