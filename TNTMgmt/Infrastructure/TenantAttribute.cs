using IdentityModel.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Net.Http;

namespace O2OCRM.Infrastructure
{
    public class TenantAttribute : ActionFilterAttribute
    {
        /// <summary>
        /// bind tenantId, apiUrl, identity server endpoint to cookies
        /// </summary>
        /// <param name="actionExecutingContext"></param>
        public override void OnActionExecuting(ActionExecutingContext actionExecutingContext)
        {
            var fullAddress = actionExecutingContext.HttpContext?.Request?
                .Headers?["Host"].ToString()?.Split('.');
            if (fullAddress.Length < 2)
            {
                actionExecutingContext.Result = new StatusCodeResult(404);
                base.OnActionExecuting(actionExecutingContext);
            }
            else
            {
                var subdomain = fullAddress[0];
                // call api
                var client = new HttpClient();

                var response = client.GetAsync($"{Environment.GetEnvironmentVariable("GATEWAY_API_URL")}/api/read/company/getIdByCode?code={subdomain}").GetAwaiter().GetResult();
                if (!response.IsSuccessStatusCode)
                {
                    actionExecutingContext.Result = new StatusCodeResult(404);
                    base.OnActionExecuting(actionExecutingContext);
                }
                else
                {

                    var tenantId = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
                    actionExecutingContext.HttpContext.Response.Cookies.Append("tenantId", tenantId);
                    actionExecutingContext.HttpContext.Response.Cookies.Append("identityServer", Environment.GetEnvironmentVariable("IS_SERVER"));
                    actionExecutingContext.HttpContext.Response.Cookies.Append("apiUrl", Environment.GetEnvironmentVariable("GATEWAY_API_URL"));

                    base.OnActionExecuting(actionExecutingContext);
                }
            }
        }
    }
}
