import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";

export default function Users() {
  const [backendUrl, setBackendUrl] = useState("http://127.0.0.1:1421");
  const [name, setName] = useState("");
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const unlistenPromise = listen<string>("backend:ready", (e) => {
      if (e.payload) setBackendUrl(e.payload);
    });
    return () => {
      unlistenPromise.then((f) => f());
    };
  }, []);

  async function fetchUsers() {
    const res = await fetch(`${backendUrl}/api/users`);
    const data = await res.json();
    setUsers(data);
  }

  return (
    <section>
      <h2>Users</h2>
      <div className="row">
        <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={fetchUsers}>Load</button>
        <button onClick={async () => {
          const who = name || `user-${Math.random().toString(36).slice(2,6)}`;
          await fetch(`${backendUrl}/api/users`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: who }) });
          await fetchUsers();
        }}>Create</button>
      </div>
      <ul>
        {users.map(u => (<li key={u.id}>{u.id}: {u.name}</li>))}
      </ul>
    </section>
  );
}
