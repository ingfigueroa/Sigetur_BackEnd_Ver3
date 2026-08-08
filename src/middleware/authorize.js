import ROLES from '../constants/roles.js';
function authorize(allowedRoles = []) {

  return (req, res, next) => {

    const userRoles = req.user.roles || [req.user.rol];

   

    // ADMIN bypass
    if (userRoles.includes(ROLES.ADMIN)) {
  
      return next();
    }

    const hasRole = userRoles.some(role =>
      allowedRoles.includes(role)
    );

   

    if (!hasRole) {

      

      return res.status(403).json({
        message: 'No autorizado'
      });
    }

    next();

  };

}

export default authorize;