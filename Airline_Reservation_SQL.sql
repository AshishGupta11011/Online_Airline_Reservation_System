
  --Add Your SQL  Here



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



---------------------------------------------------------------------------------------------------------------------------------
--Aniket Anand
create table Cancellations
(
 Canc_Id bigint identity(1000,1) NOT NULL  PRIMARY KEY ,
 Passenger_Id BIGINT not null unique,
 BookingId int NOT NULL UNIQUE,
 CancDate DATE NOT NULL,
 RefundAmount DECIMAL(7, 2) NOT NULL,
	CONSTRAINT FK_Bkg_Canc FOREIGN KEY(BookingId) REFERENCES Bookings(BookingId),
	--foreign key with refrence to bookings table
	CONSTRAINT FK_Psn_Canc FOREIGN KEY(Passenger_Id) REFERENCES Passengers(Passenger_Id),
	--  FOREIGN KEY with reference to passenger table
	)
    GO

    --stored procedure for cancellations
    create procedure usp_GetAllCancelledTickets
as
begin
select * from Cancellations
end

GO

create procedure usp_GetCancelledTicketById
@BookingId int
as 
begin 
select * from Cancellations
where BookingId=@BookingId
end
GO
create procedure usp_DeleteCancelledTicketById
@BookingId int
as
 begin 
 delete from Cancellations
 where BookingId=@BookingId
 end


 ------------------------------
 ---ANSHIKA JINDAL
 Create Table FlightDetails
(
 FlightCode nvarchar(6) not null,
 FlightId int identity(1000,1) primary key,
 FlightName nvarchar(50)  not Null,
 [Source] nvarchar(50)  not Null,
 Destination nvarchar(50)  not Null,
 DepartureTime time  not Null,
 ArrivalTime time  not Null,
 BaggageLimit int  not Null,
 Food nchar  not Null
 )

 GO
 CREATE PROCEDURE  usp_AddFlight
  (
@FlightId nvarchar(6),
 @FlightName nvarchar(50),
 @Source nvarchar(50),
 @Destination nvarchar(50),
 @DepartureTime time,
 @ArrivalTime time,
 @BaggageLimit int,
 @Food nchar
 )
  
AS  
BEGIN  
     
    Insert into FlightDetails (FlightId,FlightName,Source,Destination,DepartureTime,ArrivalTime,BaggageLimit,Food)   
           Values (@FlightId,@FlightName, @Source,@Destination,@DepartureTime,@ArrivalTime,@BaggageLimit,@Food)  
  
END  
GO  

CREATE PROCEDURE usp_UpdateFlight(
 @FlightId nvarchar(6),
 @FlightName nvarchar(50),
 @Source nvarchar(50),
 @Destination nvarchar(50),
 @DepartureTime time,
 @ArrivalTime time,
 @BaggageLimit int,
 @Food nchar
 ) 
 as
BEGIN
    Update FlightDetails 
		set 
			FlightName=@FlightName,
			[Source]=@Source,
			Destination=@Destination,
			DepartureTime=@DepartureTime,
			ArrivalTime=@ArrivalTime,
			BaggageLimit=@BaggageLimit,
			Food=@Food
				where FlightId=@FlightId;

END


GO
Create procedure usp_DeleteFlight
(
@FlightId int
)
as
BEGIN
	Delete from FlightDetails 
	where FlightId=@FlightId;
END