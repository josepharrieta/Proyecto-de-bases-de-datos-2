


# 📘 Sistema de Gestión para Restaurantes — Documentación Técnica

Este repositorio contiene la documentación técnica completa del sistema distribuido de gestión para restaurantes. El sistema está diseñado para ser escalable, tolerante a fallos y altamente disponible, integrando una arquitectura basada en microservicios con un enfoque híbrido en almacenamiento de datos.


## 🧱 Estructura del Proyecto

esta es la estructura actual, dime todos los archivos que necesitas ver para poder ayuudarme a asegurar los requerimientos contra la rubrica , y te los brindare, recuerda, no debes producir codigo...



├── PROYECTO-DE-BASES-DE-DATOS-2
│   ├── .github
│   │   └── workflows
│   │			└── ci.yml
│   ├── .vscode
│   │		└── settings.json
│   └── docker
├── docker
│   ├── elastic-search
│   │   └── elasticSearch.
│   └── mongo-config
│   │    └── init-config.js
│   └── mongoDB
│   │    ├── replica-set
│   │    │   ├── primary
│   │    │   │   ├── Dockerfile
│   │    │   │   └── init.js
│   │    │   ├── secondary1
│   │    │   │   ├── Dockerfile
│   │    │   │   └── init.js
│   │    │   └── secondary2
│   │    │       ├── Dockerfile
│   │    │       └── init.js
│   │    └── mongo-keyfile
│   └── nginx
│       └── nginnx.conf
├── search-service
│   ├── src
│   │   ├── controllers
│   │   │   └── searchController.js
│   │   ├── routes
│   │   │   └── searchRoutes.js
│   │   └── services
│   │       ├── elasticClient.js
│   │       ├── elasticSearchService.js
│   │       └── indexer.js
│   ├── Dockerfile
│   ├── server.js
│   └── package.json
├── src
│   ├── config
│   │   └── dbConfig.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── menuController.js
│   │   ├── menuItemController.js
│   │   ├── orderController.js
│   │   ├── orderItemController.js
│   │   ├── productCategoryController.js
│   │   ├── productController.js
│   │   ├── reservationController.js
│   │   ├── restaurantAvailabilityControl.js
│   │   ├── restaurantController.js
│   │   ├── roleController.js
│   │   ├── userController.js
│   ├── middleware
│   │   │   ├── authMiddleware.js
│   │   │   └── roleMiddleware.js
│   ├── models
│   │   ├── mongoModels
│   │   │   ├── Menu.js
│   │   │   ├── MenuItem.js
│   │   │   ├── Order.js
│   │   │   ├── OrderItem.js
│   │   │   ├── Product.js
│   │   │   ├── ProductCategory.js
│   │   │   ├── Reservation.js
│   │   │   ├── Restaurant.js
│   │   │   ├── RestaurantAvailability.js
│   │   │   ├── Role.js
│   │   │   └── User.js
│   │   └── postgresModels
│   │       ├── menu.js
│   │       ├── menuItem.js
│   │       ├── order.js
│   │       ├── orderItem.js
│   │       ├── product.js
│   │       ├── productCategory.js
│   │       ├── reservation.js
│   │       ├── restaurant.js
│   │       ├── restaurantAvailability.js
│   │       ├── role.js
│   │       └── user.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── mainRoutes.js
│   │   ├── menuItemRoutes.js
│   │   ├── menuRoutes.js
│   │   ├── orderItemRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productCategoryRoutes.js
│   │   ├── productRoutes.js
│   │   ├── reservationRoutes.js
│   │   ├── restaurantAvailabilityRoutes.js
│   │   ├── restaurantRoutes.js
│   │   ├── roleRoutes.js
│   │   └── userRoutes.js
│   ├── services
│   │   ├── cache
│   │   │   └── redisService.js
│   │   ├── database
│   │   │   ├── daos
│   │   │   │   ├── menuDAO.js
│   │   │   │   ├── menuItemDAO.js
│   │   │   │   ├── orderItemDAO.js
│   │   │   │   ├── productCategoryDAO.js
│   │   │   │   ├── restaurantAvailableInpDAO.js
│   │   │   │   └── roleDAO.js
│   │   │   ├── mongo
│   │   │   │   ├── menuDAOMongo.js
│   │   │   │   ├── menuItemDAOMongo.js
│   │   │   │   ├── orderItemDAOMongo.js
│   │   │   │   ├── orderRepositoryMongo.js
│   │   │   │   ├── productCategoryDAOMongo.js
│   │   │   │   ├── productRepositoryMongo.js
│   │   │   │   ├── reservationRepositoryMongo.js
│   │   │   │   ├── restaurantAvailableInpDAOMongo.js
│   │   │   │   ├── restaurantRepositoryMongo.js
│   │   │   │   └── roleDAOMongo.js
│   │   │   │   └── userRepositoryMongo.js
│   │   │   ├── postgres
│   │   │   │   ├── menuDAOPostgres.js
│   │   │   │   ├── menuItemDAOPostgres.js
│   │   │   │   ├── orderRepositoryPostgres.js
│   │   │   │   ├── orderItemDAOPostgres.js
│   │   │   │   ├── OrderRepositoryPostgres.js
│   │   │   │   ├── productCategoryDAOPostgres.js
│   │   │   │   ├── productRepositoryPostgres.js
│   │   │   │   ├── reservationRepositoryPostgres.js
│   │   │   │   ├── restaurantAvailableInpDAOPostgres.js
│   │   │   │   ├── restaurantRepositoryPostgres.js
│   │   │   │   ├── roleDAOPostgres.js
│   │   │   │   └── userRepositoryPostgres.js
│   │   │   ├── repositories
│   │   │   │   ├── orderRepository.js
│   │   │   │   ├── reservationRepository.js
│   │   │   │   ├── restaurantRepository.js
│   │   │   │   └── userRepository.js
│   │   │   └── index.js
│   │   ├── elasticSearchService
│   │   │   └── elasticSearchProxy.js
│   │   ├── jwt
│   │   │   └── jwtService.js
│   │   └── utils
│   │   │    ├── helpers.js
│       └── index.js
├── test
│   ├── unit
│   │   ├── authController.test.js
│   │   ├── menuController.test.js
│   │   ├── menuItemController.test.js
│   │   ├── orderController.test.js
│   │   ├── orderItemController.test.js
│   │   ├── productCategoryController.test.js
│   │   ├── productController.test.js
│   │   ├── reservationController.test.js
│   │   ├── restaurantAvailabilityControl.test.js
│   │   ├── restaurantController.test.js
│   │   ├── roleController.test.js
│   │   ├── userController.test.js
│   └── integration
├── env
├── .gitignore
├── babel.config.js
├── babel.config.test.js
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── package-lock.json
├── package.json
└── README.md




## 🚀 Cómo Iniciar Localmente

### Requisitos Previos

* Docker `v24+`
* Docker Compose `v2.22+`
* Node.js `v18.x`
* MongoDB CLI `v6.x` (opcional para administración)

### Instrucciones

1. Clonar el repositorio:


git clone https://github.com/tu-org/gestion-restaurantes.git
cd gestion-restaurantes


2. Crear archivo `.env` con las siguientes variables mínimas:


JWT_SECRET=clave-secreta
REDIS_HOST=redis
POSTGRES_PASSWORD=admin


3. Generar keyfile para MongoDB (replica set + auth):


openssl rand -base64 756 > infra/mongodb-keyfile
chmod 600 infra/mongodb-keyfile


4. Levantar los servicios:


docker-compose up -d --build


5. Verificar estado:


docker ps


---

## 🔍 Pruebas Rápidas

### Autenticación:


curl -X POST http://localhost/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "1234"}'


### Búsqueda:


curl "http://localhost/search?q=pizza"


## 📄 Documentación Completa

Encuentra el PDF en `/docs/documentacion_tecnica.pdf` 
