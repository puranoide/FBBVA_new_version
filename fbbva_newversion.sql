-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 18-04-2025 a las 23:55:24
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fbbva_newversion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registros`
--

CREATE TABLE `registros` (
  `id` int(11) NOT NULL,
  `seguidoresfb` int(11) DEFAULT NULL,
  `seguidoresdelmesfb` int(11) DEFAULT NULL,
  `seguidoresdelmesfbads` int(11) DEFAULT NULL,
  `postalmesfb` int(11) DEFAULT NULL,
  `visualizacionesfb` int(11) DEFAULT NULL,
  `alcancefb` int(11) DEFAULT NULL,
  `alcancefbads` int(11) DEFAULT NULL,
  `interracionesconelcontenidofb` int(11) DEFAULT NULL,
  `interracionesconelcontenidofbads` int(11) NOT NULL,
  `clicsenelalcancefb` int(11) DEFAULT NULL,
  `clicsenelalcancefbads` int(11) DEFAULT NULL,
  `inversionPublicitaria` int(11) DEFAULT NULL,
  `nPublicacionesfb` int(11) DEFAULT NULL,
  `visualizacionesxpublicacionesfb` int(11) DEFAULT NULL,
  `interaccionesxpublicacionesfb` int(11) DEFAULT NULL,
  `nReels` int(11) DEFAULT NULL,
  `visualizacionesxreels` int(11) DEFAULT NULL,
  `interaccionesxreels` int(11) DEFAULT NULL,
  `nHistorias` int(11) DEFAULT NULL,
  `visualizacionesxhistorias` int(11) DEFAULT NULL,
  `interaccionesxhistorias` int(11) DEFAULT NULL,
  `seguidoresTotalesIg` int(11) DEFAULT NULL,
  `seguidoresdelmesIg` int(11) DEFAULT NULL,
  `nPostsEnElMesIg` int(11) DEFAULT NULL,
  `visualizacionesBFB` int(11) DEFAULT NULL,
  `alcanceIg` int(11) DEFAULT NULL,
  `alcanceIgads` int(11) DEFAULT NULL,
  `interaccionesconelcontenidoig` int(11) DEFAULT NULL,
  `interaccionesconelcontenidoigads` int(11) DEFAULT NULL,
  `clicsenelalcanceig` int(11) DEFAULT NULL,
  `clicsenelalcanceigads` int(11) DEFAULT NULL,
  `inversionPublicitariaig` int(11) DEFAULT NULL,
  `nPublicacionesig` int(11) DEFAULT NULL,
  `visualizacionesxpublicacionesig` int(11) DEFAULT NULL,
  `interaccionesxpublicacionesig` int(11) DEFAULT NULL,
  `nReelsig` int(11) DEFAULT NULL,
  `visualizacionesxreelsig` int(11) DEFAULT NULL,
  `interaccionesxreelsig` int(11) DEFAULT NULL,
  `nHistoriasig` int(11) DEFAULT NULL,
  `alcanceHistoriasig` int(11) DEFAULT NULL,
  `interaccionesHistoriasig` int(11) DEFAULT NULL,
  `seguidorestotalesTikTok` int(11) DEFAULT NULL,
  `nSeguidoresDelMesTikTok` int(11) DEFAULT NULL,
  `nPublicacionesTikTok` int(11) DEFAULT NULL,
  `nMeGustaDelMesTikTok` int(11) DEFAULT NULL,
  `visualizacionesdevideoTikTok` int(11) DEFAULT NULL,
  `seguidorestotalesx` int(11) DEFAULT NULL,
  `nSeguidoresDelMesx` int(11) DEFAULT NULL,
  `nPublicacionesx` int(11) DEFAULT NULL,
  `inpremionesx` int(11) DEFAULT NULL,
  `fechaCreada` date DEFAULT NULL,
  `meses` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registros`
--

INSERT INTO `registros` (`id`, `seguidoresfb`, `seguidoresdelmesfb`, `seguidoresdelmesfbads`, `postalmesfb`, `visualizacionesfb`, `alcancefb`, `alcancefbads`, `interracionesconelcontenidofb`, `interracionesconelcontenidofbads`, `clicsenelalcancefb`, `clicsenelalcancefbads`, `inversionPublicitaria`, `nPublicacionesfb`, `visualizacionesxpublicacionesfb`, `interaccionesxpublicacionesfb`, `nReels`, `visualizacionesxreels`, `interaccionesxreels`, `nHistorias`, `visualizacionesxhistorias`, `interaccionesxhistorias`, `seguidoresTotalesIg`, `seguidoresdelmesIg`, `nPostsEnElMesIg`, `visualizacionesBFB`, `alcanceIg`, `alcanceIgads`, `interaccionesconelcontenidoig`, `interaccionesconelcontenidoigads`, `clicsenelalcanceig`, `clicsenelalcanceigads`, `inversionPublicitariaig`, `nPublicacionesig`, `visualizacionesxpublicacionesig`, `interaccionesxpublicacionesig`, `nReelsig`, `visualizacionesxreelsig`, `interaccionesxreelsig`, `nHistoriasig`, `alcanceHistoriasig`, `interaccionesHistoriasig`, `seguidorestotalesTikTok`, `nSeguidoresDelMesTikTok`, `nPublicacionesTikTok`, `nMeGustaDelMesTikTok`, `visualizacionesdevideoTikTok`, `seguidorestotalesx`, `nSeguidoresDelMesx`, `nPublicacionesx`, `inpremionesx`, `fechaCreada`, `meses`) VALUES
(1, 309153, 239, 102, 14, 961600, 441100, 409707, 13700, 11597, 3591, 3494, 1156, 13, 870900, 13600, 1, 20100, 83, 0, 0, 0, 29702, 261, 9, 168500, 100900, 87713, 1500, 1213, 1100, 998, 650, 5, 119008, 1222, 4, 42804, 141, 1, 473, 2, 1023, 6, 4, 119, 2400, 7261, 80, 6, 373, '2024-12-31', 0),
(2, 308933, -220, 66, 11, 62250000, 228500, 202772, 16100, 202772, 1800, 1600, 690, 13, 591600, 16100, 0, 7000, 36, 1, 487, 15, 29645, -57, 4, 74500, 39800, 37420, 2500, 2311, 180, 137, 250, 3, 74500, 2537, 1, 30497, 43, 1, 294, 1, 1028, 5, 1, 21, 45, 7263, 2, 1, 73, '2025-08-01', 8),
(3, 308706, -227, 66, 11, 532866, 239947, 235763, 15975, 21073, 3041, 3053, 666, 11, 532866, 15975, 0, 7000, 36, 2, 811, 15, 29624, -21, 3, 45832, 25516, 23896, 1765, 1782, 131, 131, 150, 3, 45832, 1765, 0, 0, 0, 2, 292, 3, 1033, 5, 1, 3, 318, 7259, 4, 2, 110, '2025-02-28', 0),
(4, 30, 239, 102, 14, 961600, 441100, 409707, 13700, 11597, 3591, 3494, 1156, 13, 870900, 13600, 1, 20100, 83, 0, 0, 0, 29702, 261, 9, 168500, 100900, 87713, 1500, 1213, 1100, 998, 650, 5, 119008, 1222, 4, 42804, 141, 1, 473, 2, 1023, 6, 4, 119, 2400, 7261, 80, 6, 373, '2025-12-01', 12),
(5, 309000000, 239, 102, 14, 96160000, 441100, 409707, 13700, 11597, 3591, 3494, 1156, 13, 870900, 13600, 1, 20100, 83, 0, 0, 0, 29702, 261, 9, 168500, 100900, 87713, 1500, 1213, 1100, 998, 650, 5, 119008, 1222, 4, 42804, 141, 1, 473, 2, 1033, 6, 4, 119, 2400, 7261, 80, 6, 373, '2025-01-01', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombreusuario` varchar(150) NOT NULL,
  `contrasena` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombreusuario`, `contrasena`) VALUES
(1, 'puranogame', 'Perogame1@');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `registros`
--
ALTER TABLE `registros`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `registros`
--
ALTER TABLE `registros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
