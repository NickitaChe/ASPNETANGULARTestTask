using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace BackendWebApi
{
    public class Program
    {
        /// <summary>
        /// Входная точка
        /// </summary>
        /// <param name="args">Аргументы</param>
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
