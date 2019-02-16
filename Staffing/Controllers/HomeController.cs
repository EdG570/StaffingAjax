using BOL;
using DAL;
using System.Web.Mvc;


namespace Staffing.Controllers
{
    public class HomeController : Controller
    {
        private readonly StaffingRepository _db;

        public HomeController()
        {
            _db = new StaffingRepository();
        }

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(_db.GetAll(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Employee record)
        {
            return Json(_db.Create(record), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOne(int id)
        {
            return Json(_db.FindOne(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int id)
        {
            return Json(_db.Delete(id), JsonRequestBehavior.AllowGet);
        }
    }
}