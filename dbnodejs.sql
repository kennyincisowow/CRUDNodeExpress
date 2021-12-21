-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-12-2021 a las 20:12:40
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbnodejs`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE `actividades` (
  `actividad_id` int(11) NOT NULL,
  `actividad_nombre` varchar(50) NOT NULL,
  `actividad_descricpion` varchar(50) NOT NULL,
  `actividad_fecha` date NOT NULL,
  `actividades_tipo` varchar(50) NOT NULL,
  `actividad_sancion_importe` decimal(10,2) NOT NULL,
  `actividad_estado` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `actividades`
--

INSERT INTO `actividades` (`actividad_id`, `actividad_nombre`, `actividad_descricpion`, `actividad_fecha`, `actividades_tipo`, `actividad_sancion_importe`, `actividad_estado`) VALUES
(3, 'Barrer', 'asasa', '2021-12-19', 'l', '343.00', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `asistencia_id` int(11) NOT NULL,
  `asistencia_estado` varchar(1) NOT NULL,
  `asistencia_stand_id` int(11) NOT NULL,
  `asistencia_actividad_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `books`
--

INSERT INTO `books` (`id`, `name`, `author`, `created_at`, `updated_at`) VALUES
(1, 'La ciudad y los perros', 'Mario Vargas Llosa', '2021-11-08 19:15:44', '2021-11-08 19:59:46'),
(2, 'El caballero Carmeler', 'Abraham Valdelomar', '2021-11-08 19:59:34', '2021-12-16 04:33:10'),
(4, ' manuel chaprodo', 'el cabellerito', '2021-12-16 19:48:06', '2021-12-16 19:48:06'),
(5, 'marc sorcio', 'la laguna', '2021-12-16 19:48:06', '2021-12-16 19:48:06'),
(6, 'leon sercei', 'el ultimo', '2021-12-16 19:48:06', '2021-12-16 19:48:06'),
(7, 'tobias tubiel', 'el deslus', '2021-12-16 19:48:08', '2021-12-16 19:48:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `usuario` varchar(20) DEFAULT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `sexo` varchar(1) DEFAULT NULL,
  `nivel` tinyint(4) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `marca` varchar(20) DEFAULT NULL,
  `compañia` varchar(20) DEFAULT NULL,
  `saldo` float DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clients`
--

INSERT INTO `clients` (`id`, `usuario`, `nombre`, `sexo`, `nivel`, `email`, `telefono`, `marca`, `compañia`, `saldo`, `activo`) VALUES
(1, 'BRE2271', 'BRENDA', 'M', 2, 'brenda@live.com', '655-330-5736', 'SAMSUNG', 'IUSACELL', 100, 1),
(2, 'OSC4677', 'OSCAR', 'H', 3, 'oscar@gmail.com', '655-143-4181', 'LG', 'TELCEL', 0, 1),
(3, 'JOS7086', 'JOSE', 'H', 3, 'francisco@gmail.com', '655-143-3922', 'NOKIA', 'MOVISTAR', 150, 1),
(4, 'LUI6115', 'LUIS', 'H', 0, 'enrique@outlook.com', '655-137-1279', 'SAMSUNG', 'TELCEL', 50, 1),
(5, 'LUI7072', 'LUIS', 'H', 1, 'luis@hotmail.com', '655-100-8260', 'NOKIA', 'IUSACELL', 50, 0),
(6, 'DAN2832', 'DANIEL', 'H', 0, 'daniel@outlook.com', '655-145-2586', 'SONY', 'UNEFON', 100, 1),
(7, 'JAQ5351', 'JAQUELINE', 'M', 0, 'jaqueline@outlook.com', '655-330-5514', 'BLACKBERRY', 'AXEL', 0, 1),
(8, 'ROM6520', 'ROMAN', 'H', 2, 'roman@gmail.com', '655-330-3263', 'LG', 'IUSACELL', 50, 1),
(9, 'BLA9739', 'BLAS', 'H', 0, 'blas@hotmail.com', '655-330-3871', 'LG', 'UNEFON', 100, 1),
(10, 'JES4752', 'JESSICA', 'M', 1, 'jessica@hotmail.com', '655-143-6861', 'SAMSUNG', 'TELCEL', 500, 1),
(11, 'DIA6570', 'DIANA', 'M', 1, 'diana@live.com', '655-143-3952', 'SONY', 'UNEFON', 100, 0),
(12, 'RIC8283', 'RICARDO', 'H', 2, 'ricardo@hotmail.com', '655-145-6049', 'MOTOROLA', 'IUSACELL', 150, 1),
(13, 'VAL6882', 'VALENTINA', 'M', 0, 'valentina@live.com', '655-137-4253', 'BLACKBERRY', 'AT&T', 50, 0),
(14, 'BRE8106', 'BRENDA', 'M', 3, 'brenda2@gmail.com', '655-100-1351', 'MOTOROLA', 'NEXTEL', 150, 1),
(15, 'LUC4982', 'LUCIA', 'M', 3, 'lucia@gmail.com', '655-145-4992', 'BLACKBERRY', 'IUSACELL', 0, 1),
(16, 'JUA2337', 'JUAN', 'H', 0, 'juan@outlook.com', '655-100-6517', 'SAMSUNG', 'AXEL', 0, 0),
(17, 'ELP2984', 'ELPIDIO', 'H', 1, 'elpidio@outlook.com', '655-145-9938', 'MOTOROLA', 'MOVISTAR', 500, 1),
(18, 'JES9640', 'JESSICA', 'M', 3, 'jessica2@live.com', '655-330-5143', 'SONY', 'IUSACELL', 200, 1),
(19, 'LET4015', 'LETICIA', 'M', 2, 'leticia@yahoo.com', '655-143-4019', 'BLACKBERRY', 'UNEFON', 100, 1),
(20, 'LUI1076', 'LUIS', 'H', 3, 'luis2@live.com', '655-100-5085', 'SONY', 'UNEFON', 150, 1),
(21, 'HUG5441', 'HUGO', 'H', 2, 'hugo@live.com', '655-137-3935', 'MOTOROLA', 'AT&T', 500, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `depositos`
--

CREATE TABLE `depositos` (
  `depositos_id` int(11) NOT NULL,
  `depositos_importe` decimal(10,2) NOT NULL,
  `depositos_fecha` date NOT NULL,
  `registro_padron_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `junta_directiva`
--

CREATE TABLE `junta_directiva` (
  `junta_directiva_id` int(11) NOT NULL,
  `periodo_id` int(11) NOT NULL,
  `socio_id` int(11) NOT NULL,
  `junta_directiva_cargo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `multa`
--

CREATE TABLE `multa` (
  `multa_id` int(11) NOT NULL,
  `multa_asistencia_id` int(11) NOT NULL,
  `multa_importe` decimal(10,2) NOT NULL,
  `multa_importe_1` decimal(10,2) NOT NULL,
  `multa_tipo` varchar(30) NOT NULL,
  `multa_fecha_cancelacion` date DEFAULT NULL,
  `multa_estado` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `periodo`
--

CREATE TABLE `periodo` (
  `periodo_id` int(11) NOT NULL,
  `periodo_inicio` date NOT NULL,
  `periodo_fin` date NOT NULL,
  `periodo_descripcion` varchar(200) NOT NULL,
  `periodo_estado` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `persona_id` int(11) NOT NULL,
  `persona_nombres` varchar(30) NOT NULL,
  `persona_ap_materno` varchar(30) NOT NULL,
  `persona_ap_paterno` varchar(30) NOT NULL,
  `persona_estado_civil` varchar(30) NOT NULL,
  `persona_ocupacion_profesion` varchar(30) NOT NULL,
  `persona_fecha_nacimiento` date NOT NULL,
  `persona_dni` varchar(30) NOT NULL,
  `persona_direccion` varchar(60) NOT NULL,
  `persona_telefono` varchar(20) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`persona_id`, `persona_nombres`, `persona_ap_materno`, `persona_ap_paterno`, `persona_estado_civil`, `persona_ocupacion_profesion`, `persona_fecha_nacimiento`, `persona_dni`, `persona_direccion`, `persona_telefono`, `id_usuario`) VALUES
(29, 'Deyvis Ronald', 'Cercado', 'Garcia', 's', 'ingeniero', '0000-00-00', '11111', '', '333333', 26),
(30, 'Deyvis Ronald', 'Cercado', 'Garcia', 's', 'ingeniero', '0000-00-00', '48762828', '', '12345678', 27),
(31, 'kenny misael', 'inciso', 'sss', 's', 'sss', '0000-00-00', '12312313', '', '+51988789159', 28),
(32, 'kenny misael', 'inciso', 'assadasd', 'v', 'aaasdasd', '0000-00-00', '1231244123', '', '+51988789159', 29),
(33, 'marcol', 'inciso', 'qqqq', 'c', 'qqq', '0000-00-00', '12313', '', '+51988789159', 30),
(34, 'marcol', 'inciso', 'qqqq', 'c', 'qqq', '0000-00-00', '12313', '', '+51988789159', 31);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_padron`
--

CREATE TABLE `registro_padron` (
  `registro_padron_id` int(11) NOT NULL,
  `registro_padron_periodo_id` int(11) NOT NULL,
  `registro_padron_fecha` date NOT NULL,
  `registro_padron_descripcion` varchar(300) NOT NULL,
  `stand_id` int(11) NOT NULL,
  `socio_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `registro_padron`
--

INSERT INTO `registro_padron` (`registro_padron_id`, `registro_padron_periodo_id`, `registro_padron_fecha`, `registro_padron_descripcion`, `stand_id`, `socio_id`) VALUES
(1, 1, '0000-00-00', 'pueste de ventas', 1, 1),
(2, 2, '0000-00-00', 'comestibles', 2, 2),
(3, 3, '0000-00-00', 'servicios aseos', 3, 3),
(4, 4, '0000-00-00', 'verduras', 4, 4),
(5, 5, '0000-00-00', 'papas amarrillas', 5, 5),
(6, 6, '0000-00-00', 'camotes asados', 6, 6),
(7, 7, '0000-00-00', 'paltas verdes', 7, 7),
(8, 8, '0000-00-00', 'naranajas azules', 8, 8),
(9, 9, '0000-00-00', 'verduras verdes', 9, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `rol_nombre` varchar(50) NOT NULL,
  `rol_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `rol_nombre`, `rol_estado`) VALUES
(1, 'Admin', 1),
(2, 'Usuario', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `socios`
--

CREATE TABLE `socios` (
  `socio_id` int(11) NOT NULL,
  `socio_codigo` varchar(30) NOT NULL,
  `socio_persona_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `socios`
--

INSERT INTO `socios` (`socio_id`, `socio_codigo`, `socio_persona_id`) VALUES
(1, '78945', 1),
(2, '35678', 2),
(3, '78456', 3),
(4, '89564', 4),
(5, '68456', 5),
(6, '39564', 6),
(7, '48456', 7),
(8, '59564', 8),
(9, '195641', 91),
(10, 'sss', 0),
(11, 'ww', 0),
(12, '1', 0),
(13, 'kenny', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stand`
--

CREATE TABLE `stand` (
  `stand_id` int(11) NOT NULL,
  `stand_fila` varchar(10) NOT NULL,
  `stand_categoria` varchar(30) NOT NULL,
  `stand_numero` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `email`, `password`, `id_rol`) VALUES
(1, 'Angel Rosendo Condori Coaquira', 'angel.condori@gmail.com', '123', 0),
(2, 'kenny misael inciso inciso', 'kennyinciso@upeu.edu.pe', '123', 0),
(3, 'jork cardios zarse', 'cardios', '12345', 0),
(4, 'crasla incisoa incisoa', 'craslaincisoa@upeu.edu', '123456', 0),
(5, 'jorcus cersus jarcas', '@upeu.edu', '456789', 0),
(6, 'kersd melsk hesto', '@upeu.edu', '789654', 0),
(8, 'hysge palti zroso', '@upeu.edu', '987654', 0),
(17, 'jork cardios zarse', 'cardios', '12345', 0),
(18, 'crasla incisoa incisoa', 'craslaincisoa@upeu.edu', '123456', 0),
(19, 'jorcus cersus jarcas', '@upeu.edu', '456789', 0),
(20, 'kersd melsk hesto', '@upeu.edu', '789654', 0),
(21, 'hayrs most salfas', '@upeu.edu', '321654', 0),
(22, 'hysge palti zroso', '@upeu.edu', '987654', 0),
(23, 'sasasasa', 'sasas', 'sasasa', 2),
(24, 'Deyvia Ronald', 'deyvis', '12345', 1),
(25, 'jose lusi ', 'jose', '123456', 2),
(26, 'Deyvis Ronald', 'deyvis', '12345', 1),
(27, 'Deyvis Ronald', 'Roand@gmail.com', '12345', 1),
(28, 'kenny misael', 'aaas', 'sss', 1),
(29, 'kenny misael', '123123', 'sadsasdasd', 1),
(30, 'marcol', '', '', 0),
(31, 'marcol', '', '', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`actividad_id`);

--
-- Indices de la tabla `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `periodo`
--
ALTER TABLE `periodo`
  ADD PRIMARY KEY (`periodo_id`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`persona_id`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `socios`
--
ALTER TABLE `socios`
  ADD PRIMARY KEY (`socio_id`);

--
-- Indices de la tabla `stand`
--
ALTER TABLE `stand`
  ADD PRIMARY KEY (`stand_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividades`
--
ALTER TABLE `actividades`
  MODIFY `actividad_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `periodo`
--
ALTER TABLE `periodo`
  MODIFY `periodo_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `persona_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `socios`
--
ALTER TABLE `socios`
  MODIFY `socio_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `stand`
--
ALTER TABLE `stand`
  MODIFY `stand_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
