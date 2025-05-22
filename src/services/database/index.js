import { UserRepositoryPostgres } from './postgres/userRepositoryPostgres.js';
import { UserRepositoryMongo } from './mongo/userRepositoryMongo.js';

import { RoleDAOPostgres } from './postgres/roleDAOPostgres.js';
import { RoleDAOMongo } from './mongo/roleDAOMongo.js';

import { RestaurantRepositoryPostgres } from './postgres/restaurantRepositoryPostgres.js';
import { RestaurantRepositoryMongo } from './mongo/restaurantRepositoryMongo.js';

import { RestaurantAvailabilityDAOPostgres } from './postgres/restaurantAvailabilityDAOPostgres.js';
import { RestaurantAvailabilityDAOMongo } from './mongo/restaurantAvailabilityDAOMongo.js';

import { ProductCategoryDAOPostgres } from './postgres/productCategoryDAOPostgres.js';
import { ProductCategoryDAOMongo } from './mongo/productCategoryDAOMongo.js';

import { OrderRepositoryPostgres } from './postgres/ordeRepositoryPostgres.js';
import { OrderRepositoryMongo } from './mongo/orderRepositoryMongo.js';

import { OrderItemDAOPostgres } from './postgres/orderItemDAOPostgres.js';
import { OrderItemDAOMongo } from './mongo/orderItemDAOMongo.js';

import { MenuDAOPostgres } from './postgres/menuDAOPostgres.js';
import { MenuDAOMongo } from './mongo/menuDAOMongo.js';

import { MenuItemDAOPostgres } from './postgres/menuItemDAOPostgres.js';
import { MenuItemDAOMongo } from './mongo/menuItemDAOMongo.js';

import { ReservationRepositoryPostgres } from './postgres/reservationRepositoryPostgres.js';
import { ReservationRepositoryMongo } from './mongo/reservationRepositoryMongo.js';



const DB_TYPE = process.env.DB_TYPE;

if (!['mongo', 'postgres'].includes(DB_TYPE)) {
  throw new Error('DB_TYPE debe ser "mongo" o "postgres"');
}

export const loadRepositories = () => {
  // Repositories (Patrón Complejo)
  const userRepository = DB_TYPE === 'postgres' 
    ? new UserRepositoryPostgres() 
    : new UserRepositoryMongo();

  const restaurantRepository = DB_TYPE === 'postgres'
    ? new RestaurantRepositoryPostgres()
    : new RestaurantRepositoryMongo();

  const orderRepository = DB_TYPE === 'postgres'
    ? new OrderRepositoryPostgres()
    : new OrderRepositoryMongo();

  const reservationRepository = DB_TYPE === 'postgres'
    ? new ReservationRepositoryPostgres()
    : new ReservationRepositoryMongo();

  return {
    userRepository,
    restaurantRepository,
    orderRepository,
    reservationRepository
  };
};

export const loadDaos = () => {
  // DAOs (Patrón Simple)
  const roleDAO = DB_TYPE === 'postgres'
    ? new RoleDAOPostgres()
    : new RoleDAOMongo();

  const restaurantAvailabilityDAO = DB_TYPE === 'postgres'
    ? new RestaurantAvailabilityDAOPostgres()
    : new RestaurantAvailabilityDAOMongo();

  const productCategoryDAO = DB_TYPE === 'postgres'
    ? new ProductCategoryDAOPostgres()
    : new ProductCategoryDAOMongo();

  const orderItemDAO = DB_TYPE === 'postgres'
    ? new OrderItemDAOPostgres()
    : new OrderItemDAOMongo();

  const menuDAO = DB_TYPE === 'postgres'
    ? new MenuDAOPostgres()
    : new MenuDAOMongo();

  const menuItemDAO = DB_TYPE === 'postgres'
    ? new MenuItemDAOPostgres()
    : new MenuItemDAOMongo();

  return {
    roleDAO,
    restaurantAvailabilityDAO,
    productCategoryDAO,
    orderItemDAO,
    menuDAO,
    menuItemDAO
  };
};