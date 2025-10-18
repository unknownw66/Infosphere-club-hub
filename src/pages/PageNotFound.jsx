import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const PageNotFound = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '5rem' }}>
      <h1>404 - Page Not Found</h1>
      <p style={{ margin: '1rem 0 2rem' }}>The page you are looking for does not exist.</p>
      <Button as={Link} to="/">
        Go to Homepage
      </Button>
    </div>
  );
};

export default PageNotFound;
