// middleware/userMiddleware.js
const attachUser = (req, res, next) => {
  res.locals.user = req.user || null;    
  const path = req.originalUrl;                     
  let parts = path.split('/').filter(Boolean); 
  parts = parts.filter(p => !/^[0-9a-fA-F]{24}$/.test(p));
  const current = parts[parts.length - 1] || '' 
  const previous = parts.slice(0, -1).join('/');

  const currentPage =  `${previous}/${current}`.toUpperCase() || 'HOME';

  res.locals.crumbs = currentPage;

  next();
};

module.exports = attachUser;
