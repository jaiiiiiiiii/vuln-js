import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  
  // 🚨 SECURITY: Hardcoded API key
  const API_KEY = 'sk_live_1234567890abcdefghijklmnop';
  const BASE_URL = 'http://insecure-api.com/api';

  // 🚨 PERFORMANCE: Unoptimized API calls in useEffect
  useEffect(() => {
    fetchUserData();
  }, []);

  // 🚨 SECURITY: SQL injection vulnerability
  const fetchUserData = async () => {
    setLoading(true);
    try {
      // 🚨 SECURITY: No input validation + SQL injection
      const query = `SELECT * FROM users WHERE id = ${userId}`;
      
      const response = await axios.get(`${BASE_URL}/users`, {
        params: { query: query },
        headers: { 
          'Authorization': `Bearer ${API_KEY}`,
          // 🚨 SECURITY: Missing Content-Type
        }
      });
      
      setUserData(response.data);
      
      // 🚨 PERFORMANCE: Inefficient data processing
      processUserData(response.data);
      
    } catch (error) {
      // 🚨 QUALITY: Empty catch block
    } finally {
      setLoading(false);
    }
  };

  // 🚨 PERFORMANCE: Inefficient data processing
  const processUserData = (data) => {
    let processed = {};
    
    // 🚨 PERFORMANCE: Nested loops with large datasets
    Object.keys(data).forEach(key => {
      Object.keys(data).forEach(innerKey => {
        if (key !== innerKey) {
          processed[key] = data[innerKey];
        }
      });
    });
    
    // 🚨 PERFORMANCE: Unnecessary deep clone
    const deepClone = JSON.parse(JSON.stringify(processed));
    return deepClone;
  };

  // 🚨 SECURITY: XSS vulnerability
  const renderUserContent = () => {
    return (
      <div>
        <h1>User Profile</h1>
        {/* 🚨 SECURITY: Directly injecting user data without sanitization */}
        <div dangerouslySetInnerHTML={{ __html: userData.bio }} />
        
        {/* 🚨 SECURITY: Potential XSS via href */}
        <a href={userData.website}>Visit Website</a>
      </div>
    );
  };

  // 🚨 PERFORMANCE: Inline function in render
  const handleSearch = () => {
    // 🚨 QUALITY: Unused variable
    const unusedVar = 'this is never used';
    
    // 🚨 PERFORMANCE: Inefficient filtering
    const filtered = Object.keys(userData).filter(key => 
      key.includes(search) || userData[key].toString().includes(search)
    );
    
    return filtered;
  };

  // 🚨 QUALITY: Unused function
  const unusedFunction = () => {
    console.log('This function is never called');
    return 'unused';
  };

  // 🚨 PERFORMANCE: Unnecessary re-renders
  const expensiveCalculation = () => {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random();
    }
    return result;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      {/* 🚨 QUALITY: Missing alt text */}
      <img src={userData.avatar} />
      
      {/* 🚨 SECURITY: Insecure form handling */}
      <input 
        type="text" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)}
        // 🚨 QUALITY: Missing proper attributes
      />
      
      {/* 🚨 PERFORMANCE: Expensive calculation on every render */}
      <div>Expensive: {expensiveCalculation()}</div>
      
      {/* 🚨 PERFORMANCE: Inline style object creation */}
      <div style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
        {renderUserContent()}
      </div>
      
      {/* 🚨 PERFORMANCE: Inline function in onClick */}
      <button onClick={() => handleSearch()}>
        Search
      </button>
      
      {/* 🚨 SECURITY: Insecure redirect */}
      <button onClick={() => window.location.href = userData.redirectUrl}>
        Go to Profile
      </button>
    </div>
  );
};

// 🚨 QUALITY: Missing prop validation
// 🚨 QUALITY: Missing default props

export default UserProfile;