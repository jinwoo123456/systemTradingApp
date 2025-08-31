import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  // App 레이아웃: 네비와 greet 데모만 유지

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>
      <nav style={{ display: 'flex', gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/auth">로그인/회원가입</Link>
      </nav>

      
     

  <hr />
  <Outlet />
    </main>
  );
}

export default App;
