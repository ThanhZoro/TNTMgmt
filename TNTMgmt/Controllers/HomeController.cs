using Microsoft.AspNetCore.Mvc;
using O2OCRM.Infrastructure;

namespace Vue2Spa.Controllers
{
    [ServiceFilter(typeof(TenantAttribute))]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
