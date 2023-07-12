export async function signUp(userData) {
    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else if (data.keyPattern && data.keyPattern.email) {
      throw new Error("email taken");
    } else {
      throw new Error("Invalid Sign Up");
    }
  }
  
  export async function login(userData) {
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Invalid Sign Up");
    }
  }