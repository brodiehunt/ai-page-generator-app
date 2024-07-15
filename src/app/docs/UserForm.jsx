"use client";
import { useState } from "react";
export default function UserForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [response, setResponse] = useState(null);
  const handleInputChange = (e) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      setResponse(data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Submit form</button>
      </form>
      {response && <div>check console for response</div>}
    </>
  );
}
