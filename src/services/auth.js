
class AuthService{
     getCurrentUser() {
    return localStorage.getItem('id');
  }
  restPassword() {
    return localStorage.getItem('password');
  }
 
 
}
export default new AuthService();
