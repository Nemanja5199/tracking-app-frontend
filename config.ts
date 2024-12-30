const config = {
    apiUrl: process.env.NODE_ENV === 'production' 
      ? 'http://backend:8080' 
      : 'http://localhost:8080'
  };
  
  export default config;