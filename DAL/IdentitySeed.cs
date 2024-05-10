using DomainModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class IdentitySeed
{
    public static async System.Threading.Tasks.Task CreateUserRoles(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

        if (await roleManager.FindByNameAsync("Analyst") == null)
        {
            await roleManager.CreateAsync(new IdentityRole("Analyst"));
        }
        if (await roleManager.FindByNameAsync("Coder") == null)
        {
            await roleManager.CreateAsync(new IdentityRole("Coder"));
        }
        if (await roleManager.FindByNameAsync("Tester") == null)
        {
            await roleManager.CreateAsync(new IdentityRole("Tester"));
        }

        string adminEmail = "admin@gmail.com";
        string adminPassword = "P@ssw0rd ";
        if (await userManager.FindByNameAsync(adminEmail) == null)
        {
            User admin = new User { Email = adminEmail, UserName = adminEmail };
            IdentityResult result = await userManager.CreateAsync(admin, adminPassword);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(admin, "Analyst");
            }
        }
    }
}
