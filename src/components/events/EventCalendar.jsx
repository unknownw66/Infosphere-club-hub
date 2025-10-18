// import React from 'react';
// import  useGoogleSheet  from '../../hooks/useGoogleSheet';
// import Spinner from '../ui/Spinner';
// import EventCard from './EventCard';

// const EventCalendar = () => {
//     const { events, clubs, isLoading, isError, error } = useGoogleSheet();

//     if (isLoading) return <Spinner />;
//     if (isError) return <div>Error: {error.message}</div>;
    
//     // Simple list view for now, can be replaced with a calendar library later
//     return (
//         <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
//             {events.map(event => {
//                 const club = clubs.find(c => c.ID === event.ClubID);
//                 return <EventCard key={event.ID} event={event} clubName={club ? club.Name : 'Department'} />;
//             })}
//         </div>
//     );
// };

// export default EventCalendar;

import EventCard from './EventCard';
import styles from './EventCalendar.module.css';

// This component is now "dumb". It just receives props and displays them.
// The default `events = []` and `clubs = []` prevents crashes.
const EventCalendar = ({ events = [], clubs = [] }) => {
  if (events.length === 0) {
    return (
      <div className={styles.noEvents}>
        <p>There are no events scheduled at this time. Please check back later.</p>
      </div>
    );
  }

  // Find club names once for efficiency
  const clubNameMap = clubs.reduce((acc, club) => {
    acc[club.ID] = club.Name;
    return acc;
  }, {});

  return (
    <div className={styles.eventList}>
      {events.map((event) => (
        <EventCard 
          key={event.ID} 
          event={event} 
          clubName={clubNameMap[event.ClubID] || 'Department Event'} 
        />
      ))}
    </div>
  );
};

export default EventCalendar;

