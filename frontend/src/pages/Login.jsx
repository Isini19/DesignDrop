const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(formData);
      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      // Save user info to context
      login({ email: response.data.email, role: response.data.role });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };