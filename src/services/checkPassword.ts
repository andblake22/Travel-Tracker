export const checkPassword = (password: string) => {
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
      }

      if (!/[A-Z]/.test(password)) {
        alert('Password must contain at least one uppercase letter.');
        return;
      }
    
      if (!/[a-z]/.test(password)) {
        alert('Password must contain at least one lowercase letter.');
        return;
      }
    
      if (!/[0-9]/.test(password)) {
        alert('Password must contain at least one number.');
        return;
      }
    
      if (!/[!@#$%^&*]/.test(password)) {
        alert('Password must contain at least one special character.');
        return;
      }
}