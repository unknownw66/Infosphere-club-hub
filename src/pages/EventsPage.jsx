import React from 'react';
import EventCalendar from '../components/events/EventCalendar';

const EventsPage = () => {
    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Club Events</h1>
            <EventCalendar />
        </div>
    );
};

export default EventsPage;
