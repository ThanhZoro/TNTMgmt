using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using O2OCRM;
using O2OCRM.Infrastructure;
using Serilog;
using Serilog.Context;
using Serilog.Exceptions;
using Serilog.Sinks.Elasticsearch;
using System;
using System.Linq;
using System.Net;

namespace Vue2Spa
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .Enrich.WithExceptionDetails()
                .WriteTo.Console()
                .WriteTo.Elasticsearch(new ElasticsearchSinkOptions(new Uri($"http://{Environment.GetEnvironmentVariable("ES_HOST")}:{Environment.GetEnvironmentVariable("ES_PORT")}/"))
                {
                    AutoRegisterTemplate = true,
                    AutoRegisterTemplateVersion = AutoRegisterTemplateVersion.ESv6
                })
            .CreateLogger();
        }

        public IContainer ApplicationContainer { get; private set; }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddScoped(typeof(TenantAttribute));
            // Add framework services.
            services.AddMvc();

            services.AddSignalR();

            var builder = new ContainerBuilder();

            builder.Populate(services);
            ApplicationContainer = builder.Build();

            // Create the IServiceProvider based on the container.
            return new AutofacServiceProvider(ApplicationContainer);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory, IApplicationLifetime appLifetime, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                // Webpack initialization with hot-reload.
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            loggerFactory.AddSerilog();

            IPHostEntry local = Dns.GetHostEntry(Environment.GetEnvironmentVariable("LOADBALANCER"));
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.All,
                RequireHeaderSymmetry = false,
                ForwardLimit = null,
                KnownProxies = { local.AddressList[0] }
            });
            app.Use(async (ctx, next) =>
            {
                using (LogContext.PushProperty("IPAddress", ctx.Connection.RemoteIpAddress))
                using (LogContext.PushProperty("UserName", ctx.User?.Claims?.FirstOrDefault(_ => _.Type == "userName")?.Value))
                {
                    await next();
                }
            });

            app.UseStaticFiles();
            app.UseSignalR(routes =>
            {
                routes.MapHub<CommonDataHub>("/hubs/commonData");
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });

            appLifetime.ApplicationStopped.Register(() => { ApplicationContainer.Dispose(); });
        }
    }
}
