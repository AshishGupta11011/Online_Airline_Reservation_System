
   --Add Your SQL  Here



 --Add Your SQL Here
 -- ASHISH GUPTA

CREATE DATABASE AirlineDB;
USE AirlineDB;

CREATE TABLE Customers
(
CustomerId int Identity(100, 1) PRIMARY KEY,
[Name] nvarchar(100) NOT NULL,
Email nvarchar(100) NOT NULL,
Pwd nvarchar(100) NOT NULL,
DOB date ,
WalletBalance bigint,
ResidingAddress nvarchar(255) ,
PhoneNo bigint not null
)
 

-----------------------------------------------------------------------------------------
-- Ashita Gaur  
create table Bookings 
(
 BookingId INT Identity(100, 1) NOT NULL PRIMARY KEY,
 FlightId int not null,
 Class NVARCHAR(1) NOT NULL CHECK(Class IN('B', 'E', 'F')), -- B(Business class), E(Economy class), F(First class)
 [Source] NVARCHAR(3) NOT NULL,
 Destination NVARCHAR(3) NOT NULL,
 DateOfBooking DATETIME NOT NULL,
 DateOfJourney DATETIME NOT NULL,
 NoOfSeats INT NOT NULL CHECK(NoOfSeats <= 5),
 TicketFare DECIMAL(6, 2) NOT NULL,
 CustomerId int not null,
CONSTRAINT FK_Flight_Id FOREIGN KEY (FlightId)
		REFERENCES Flights(FlightId),
		CONSTRAINT FK_Customer_Id FOREIGN KEY (CustomerId)
		REFERENCES Customers(CustomerId),
	CONSTRAINT FK_BookId_Psn FOREIGN KEY (BookingId)
		REFERENCES Bookings(BookingId)
)
go
-- CREATE SEQUENCE BookingIdGenerate
--	AS BIGINT
--	START WITH 1000
--	INCREMENT BY 1
--	MINVALUE 1000
--	MAXVALUE 9999
--	CYCLE
--	;
--GO
--CREATE PROCEDURE sp_GetNextBookingNo
--AS 
--BEGIN
--    SELECT NEXT VALUE FOR BookingIdGenerate;
--END



---------------------------------------------------------------------------------------------------------------------------------
--Aniket Anand
create table Cancellations
(
 CancellationId bigint identity(100,1) NOT NULL  PRIMARY KEY ,
-- PassengerId BIGINT not null unique,
 BookingId int NOT NULL UNIQUE,
 DateOfCancellation DATE NOT NULL,
 RefundAmount DECIMAL(7, 2) NOT NULL,
	CONSTRAINT FK_Bkg_Canc FOREIGN KEY(BookingId) REFERENCES Bookings(BookingId),
	--foreign key with refrence to bookings table

--	CONSTRAINT FK_Psn_Canc FOREIGN KEY(PassengerId) REFERENCES Passengers(PassengerId),
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
 Create Table Flights
(
 
 FlightId int identity(1000,1) primary key,
 FlightName nvarchar(50)  not Null,
 [Source] nvarchar(3)  not Null,
 Destination nvarchar(3)  not Null,
 DepartureTime time  not Null,
 ArrivalTime time  not Null,
 BaggageLimit int  not Null,
 AvailableSeats int not null,
 )

 GO
 CREATE PROCEDURE  usp_AddFlight
  (
@FlightId int,
 @FlightName nvarchar(50),
 @Source nvarchar(50),
 @Destination nvarchar(50),
 @DepartureTime time,
 @ArrivalTime time,
 @BaggageLimit int,
 @Food nchar,
 @AvailableSeats int
 )
  
AS  
BEGIN  
     
    Insert into FlightDetails (FlightId,FlightName,[Source],Destination,DepartureTime,ArrivalTime,BaggageLimit,AvailableSeats)   
           Values (@FlightId,@FlightName, @Source,@Destination,@DepartureTime,@ArrivalTime,@BaggageLimit,@AvailableSeats)  
  
END  
GO  

CREATE PROCEDURE usp_UpdateFlight(
 @FlightId int,
 @FlightName nvarchar(50),
 @Source nvarchar(50),
 @Destination nvarchar(50),
 @DepartureTime time,
 @ArrivalTime time,
 @BaggageLimit int,
 @AvailableSeats int
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
            AvailableSeats = @AvailableSeats
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

----------------------------------------
-----Mamta Chauhan
create table Passengers
(
 PassengerId BIGINT Identity(100, 1) PRIMARY KEY,
 BookingId int NOT NULL UNIQUE,
 EmailId NVARCHAR(100) NOT NULL,
 Gender NCHAR(1) NOT NULL CHECK(Gender IN('M', 'F')), -- M(Male), F(Female)
 [Name] NVARCHAR(100) NOT NULL,
 Age INT NOT NULL ,
 Nationality NVARCHAR(3) NOT NULL,
 	CONSTRAINT FK_Bkg_Canc1 FOREIGN KEY(BookingId) REFERENCES Bookings(BookingId),
	--foreign key with refrence to bookings table

)
go
