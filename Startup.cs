using LABAPP3.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace LABAPP3;

public class Startup
{
    public static string SqlConnectionIntegratedSecurity
    {
        get
        {
            var sb = new SqlConnectionStringBuilder
            {
                DataSource = "HUMALUKA",
                // Подключение будет с проверкой подлинности пользователя Windows
                IntegratedSecurity = true,
                // Название целевой базы данных.
                InitialCatalog = "PPBank"
            };
            return sb.ConnectionString;
        }
    }

    public void ConfigureServices(IServiceCollection services)
    {
        // устанавливаем контекст данных
        services.AddDbContext<BanksContext>(options =>
            options.UseSqlServer(SqlConnectionIntegratedSecurity));
        services.AddControllers(); // используем контроллеры без представлений
    }

    public void Configure(IApplicationBuilder app)
    {
        app.UseDefaultFiles();
        app.UseStaticFiles();
        app.UseDeveloperExceptionPage();
        app.UseRouting();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers(); // подключаем маршрутизацию на контроллеры
        });
    }
}