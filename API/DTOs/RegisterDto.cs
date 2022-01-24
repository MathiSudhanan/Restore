namespace API.DTOs
{
    public class RegisterDto : LoginDto
    {
        public string  Email { get; set; }
        public string ConfirmPassword { get; set; }
    }
}