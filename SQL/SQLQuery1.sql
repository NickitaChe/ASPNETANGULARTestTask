select * from Employees

select * from Employees
where Salary >10000

delete from Employees
where DATEDIFF(YEAR,DateOfBirth,GETDATE()) > 70;

update Employees
set Salary = 15000
where Salary < 15000;