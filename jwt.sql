-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 05, 2024 lúc 04:36 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `jwt`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `group`
--

CREATE TABLE `group` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `group`
--

INSERT INTO `group` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'dev', 'developer', '2024-03-26 13:39:03', '2024-03-26 13:39:03'),
(2, 'leader', 'this is leader', '2024-04-01 14:43:50', '2024-04-01 14:43:50'),
(3, 'customer', 'our customer', '2024-04-01 14:43:50', '2024-04-01 14:43:50'),
(4, 'guess', 'view only', '2024-04-05 15:15:48', '2024-04-05 15:15:48');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `group_role`
--

CREATE TABLE `group_role` (
  `id` int(11) NOT NULL,
  `groupId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `group_role`
--

INSERT INTO `group_role` (`id`, `groupId`, `roleId`, `createdAt`, `updatedAt`) VALUES
(1, 3, 3, '2024-03-26 13:40:42', '2024-03-26 13:40:42'),
(2, 4, 2, '2024-03-26 13:40:42', '2024-03-26 13:40:42'),
(3, 4, 5, '2024-04-01 14:39:10', '2024-04-01 14:39:10'),
(4, 4, 6, '2024-04-04 18:35:16', '2024-04-04 18:35:16'),
(5, 4, 7, '2024-04-05 16:06:43', '2024-04-05 16:06:43'),
(6, 4, 8, '2024-04-05 16:17:05', '2024-04-05 16:17:05');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `startDate` varchar(255) DEFAULT NULL,
  `customerID` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `project_user`
--

CREATE TABLE `project_user` (
  `id` int(11) NOT NULL,
  `projectId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`id`, `url`, `description`, `createdAt`, `updatedAt`) VALUES
(1, '/user/read', 'show all users', '2024-03-26 13:39:29', '2024-03-26 13:39:29'),
(2, '/user/edit', 'edit user', '2024-03-26 13:39:29', '2024-03-26 13:39:29'),
(3, '/user/delete', 'delete user', '2024-03-26 13:40:14', '2024-03-26 13:40:14'),
(5, '/group/read', NULL, '2024-04-01 14:38:22', '2024-04-01 14:38:22'),
(6, '/role/create', 'create roles', '2024-04-04 18:34:44', '2024-04-04 18:34:44'),
(7, '/role/read', NULL, '2024-04-05 16:05:50', '2024-04-05 16:05:50'),
(14, 'test', '', '2024-04-05 14:33:00', '2024-04-05 14:33:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240207143717-create-user.js'),
('migrate-group-role.js'),
('migrate-group.js'),
('migrate-project-user.js'),
('migrate-project.js'),
('migrate-role.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `username`, `address`, `sex`, `phone`, `groupId`, `createdAt`, `updatedAt`) VALUES
(1, 'testabc@gmail.com', '$2b$10$zK3zvKbEBTaYSE0cSTgtbenom/xNUo3aX1b9izk0fSHZ5HwTv820W', 'aadaadadd', NULL, NULL, '312312312323', 4, '2024-03-19 16:03:24', '2024-03-19 16:03:24'),
(2, 'thanh@gmail.com', '$2b$10$hVv0GvuqXpNErv.H7rvNd.3F6A/d53964brFb3LpgLqBEiIjThtTG', '12313123123', NULL, NULL, '123123123123', 4, '2024-03-28 12:10:30', '2024-03-28 12:10:30'),
(3, 'thanh1@gmail.com', '$2b$10$0rrIUCz.Yx0mr4iJ.ZN0TeKJ9XNLMBM/4TKhvn22ZEkm8o.Fgb3Pe', '1321312313123131231231313', NULL, NULL, '12312312311231231231', 4, '2024-04-05 12:17:42', '2024-04-05 12:17:42');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `group_role`
--
ALTER TABLE `group_role`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `project_user`
--
ALTER TABLE `project_user`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `group`
--
ALTER TABLE `group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `group_role`
--
ALTER TABLE `group_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `project_user`
--
ALTER TABLE `project_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
