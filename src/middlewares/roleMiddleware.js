export const roleMiddleware = (requiredRoles) => (req, res, next) => {
  const { role } = req.user;
  if (!requiredRoles.includes(role)) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  next();
};