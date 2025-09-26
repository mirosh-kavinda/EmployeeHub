//employer utilities
export function calculateAgeFromDOB(dobIso) {
    if (!dobIso) return "";
    const dob = new Date(dobIso);
    if (isNaN(dob)) return "";
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  export function isEmailValid(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  
  
 