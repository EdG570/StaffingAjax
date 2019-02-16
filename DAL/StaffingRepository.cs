using BOL;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace DAL
{
    public class StaffingRepository
    {
        private readonly ajaxEntities _db;

        public StaffingRepository()
        {
            _db = new ajaxEntities();
        }

        public Employee FindOne(int id)
        {
            return _db.Employees.FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<Employee> GetAll()
        {
            return _db.Employees.ToList();
        }

        public Employee Create(Employee record)
        {
            _db.Employees.Add(record);
            _db.SaveChanges();
            return record;
        }

        public Employee Delete(int id)
        {
            var record = FindOne(id);
            _db.Employees.Remove(record);
            _db.SaveChanges();
            return record;
        }

        public void Update(Employee record)
        {
            _db.Entry(record).State = EntityState.Modified;
            _db.SaveChanges();
        }

        public void Save()
        {
            _db.SaveChanges();
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}
