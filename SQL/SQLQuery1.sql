select * from Employees

delete from Employees
where DATEDIFF(YEAR,DateOfBirth,GETDATE()) >= 70;

update Employees
set Salary = 15000
where Salary < 15000;