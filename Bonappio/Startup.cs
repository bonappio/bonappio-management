using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Bonappio.Startup))]
namespace Bonappio
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
