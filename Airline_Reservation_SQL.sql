

 --Add Your SQL Here
 -- ASHISH GUPTA

CREATE DATABASE AirlineDB;
USE AirlineDB;

CREATE TABLE Customers
(
CustomerId int Identity(100, 1) PRIMARY KEY,
Name nvarchar(100) NOT NULL,
Email nvarchar(100) NOT NULL,
Pwd nvarchar(100) NOT NULL,
DOB date ,
WalletBalance money,
ResidingAddress nvarchar(255) 
)
 

-----------------------------------------------------------------------------------------
-- Ashita Gaur 
create table Bookings 
(
 BookingId NVARCHAR(4) NOT NULL PRIMARY KEY,
 TicketNo NVARCHAR(5) NOT NULL ,
 Class NVARCHAR(1) NOT NULL CHECK(Class IN('B', 'E', 'F')), -- B(Business class), E(Economy class), F(First class)
 FlightCode NVARCHAR(5) NOT NULL,
 Gender NVARCHAR(1) NOT NULL CHECK(Gender IN('M', 'F')), -- M(Male), F(Female)
 Departure NVARCHAR(3) NOT NULL,
 Destination NVARCHAR(3) NOT NULL,
 DateOfBooking DATETIME NOT NULL,
 DateOfJourney DATETIME NOT NULL,
 NoOfSeats INT NOT NULL CHECK(NoOfSeats <= 5),
 TicketFare DECIMAL(6, 2) NOT NULL,
 FlightId int not null,
 CustomerId int not null,
CONSTRAINT FK_Flight_Id FOREIGN KEY (FlightId)
		REFERENCES Flights(FlightId),
		CONSTRAINT FK_Customer_Id FOREIGN KEY (CustomerId)
		REFERENCES Customers(CustomerId),
	CONSTRAINT FK_BookId_Psn FOREIGN KEY (BookingId)
		REFERENCES Bookings(BookingId)
)
go
 CREATE SEQUENCE BookingIdGenerate
	AS BIGINT
	START WITH 1000
	INCREMENT BY 1
	MINVALUE 1000
	MAXVALUE 9999
	CYCLE
	;
GO
CREATE PROCEDURE sp_GetNextBookingNo
AS 
BEGIN
    SELECT NEXT VALUE FOR BookingIdGenerate;
END



