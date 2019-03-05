using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using WebApiAngularJs.Models;

namespace WebApiAngularJs.Controllers
{
    public class ShipperController : ApiController
    {
        MyCon db = new MyCon();
        [System.Web.Http.HttpGet]
        public IHttpActionResult GetAll()
        {
            try
            {
                return Ok(new
                {
                    success = true,
                    data = db.Shippers.Select(x => new ShipperViewModel()
                    {
                        ShipperID = x.ShipperID,
                        CompanyName = x.CompanyName,
                        Phone = x.Phone
                    }).ToList()
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"Bir hata oluştu {ex.Message}");
            }
        }

        [System.Web.Http.HttpGet]
        public IHttpActionResult Get(int id = 0)
        {
            try
            {
                var shippers = db.Shippers.Find(id);
                if (shippers == null)
                {
                    return NotFound();
                }

                var data = new ShipperViewModel()
                {
                    ShipperID = shippers.ShipperID,
                    CompanyName = shippers.CompanyName,
                    Phone = shippers.Phone
                };
                return Ok(new
                {
                    success = true,
                    data = data
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"Bir hata oluştu {ex.Message}");
            }
        }

        [System.Web.Http.HttpPost]
        public IHttpActionResult Add([FromBody]ShipperViewModel model)
        {
            try
            {
                db.Shippers.Add(new Shipper()
                {
                    CompanyName = model.CompanyName,
                    Phone = model.Phone,
                });
                db.SaveChanges();
                return Ok(new
                {
                    success = true,
                    message = "Şirket ekleme işlemi başarılı"
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"Bir hata oluştu {ex.Message}");
            }
        }

        [System.Web.Http.HttpDelete]
        public IHttpActionResult Delete(int id = 0)
        {
            try
            {
                db.Shippers.Remove(db.Shippers.Find(id));
                db.SaveChanges();
                return Ok(new
                {
                    success = true,
                    message = "Şirket silme işlemi başarılı"
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"Bir hata oluştu {ex.Message}");
            }
        }

        [System.Web.Http.HttpPut]
        public IHttpActionResult PutShipper(int id, Shipper model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != model.ShipperID)
            {
                return BadRequest();
            }

            db.Entry(model).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
                return Ok(new
                {
                    success = true,
                    message = "Şirket Güncelleme işlemi başarılı"
                });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!db.Shippers.Any(x => x.ShipperID == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
    public class ShipperViewModel
    {
        public int ShipperID { get; set; }
        public string CompanyName { get; set; }
        public string Phone { get; set; }
    }
}