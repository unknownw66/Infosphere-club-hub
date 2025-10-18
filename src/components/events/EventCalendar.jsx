import React from 'react';
import { useGoogleSheet } from '../../hooks/useGoogleSheet';
import Spinner from '../ui/Spinner';
import EventCard from './EventCard';

const EventCalendar = () => {
    const { events, clubs, isLoading, isError, error } = useGoogleSheet();

    if (isLoading) return <Spinner />;
    if (isError) return <div>Error: {error.message}</div>;
    
    // Simple list view for now, can be replaced with a calendar library later
    return (
        <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            {events.map(event => {
                const club = clubs.find(c => c.ID === event.ClubID);
                return <EventCard key={event.ID} event={event} clubName={club ? club.Name : 'Department'} />;
            })}
        </div>
    );
};

export default EventCalendar;
