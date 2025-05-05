using Software.Models.Entity;

namespace Software.Repository.Interface
{
    public interface IUserRepository
    {
        Task<User?> GetUserWithRoleByEmailAsync(string email);
    }
}
